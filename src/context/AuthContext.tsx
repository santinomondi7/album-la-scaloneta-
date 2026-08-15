import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase';
import { UserProfile } from '../types';
import {
  getUserProfile,
  createUserProfile,
  saveUserProfile,
  subscribeToUserProfile,
  findProfileByCollectorId
} from '../services/userService';

const LOCAL_USER_ID_KEY = 'scaloneta_device_user_id_v1';
const LOCAL_PROFILE_CACHE_KEY = 'scaloneta_cached_profile_v1';

function getOrCreateLocalUserId(): string {
  try {
    let localId = localStorage.getItem(LOCAL_USER_ID_KEY);
    if (!localId) {
      const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
      let rand = '';
      for (let i = 0; i < 8; i++) {
        rand += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      localId = `user_${Date.now()}_${rand}`;
      localStorage.setItem(LOCAL_USER_ID_KEY, localId);
    }
    return localId;
  } catch {
    return `user_${Date.now()}`;
  }
}

function getCachedProfile(): UserProfile | null {
  try {
    const raw = localStorage.getItem(LOCAL_PROFILE_CACHE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function setCachedProfile(profile: UserProfile | null) {
  try {
    if (profile) {
      localStorage.setItem(LOCAL_PROFILE_CACHE_KEY, JSON.stringify(profile));
    } else {
      localStorage.removeItem(LOCAL_PROFILE_CACHE_KEY);
    }
  } catch {}
}

interface AuthContextType {
  currentUser: User | null;
  activeUserId: string;
  userProfile: UserProfile | null;
  isLoading: boolean;
  isSaving: boolean;
  syncStatus: 'synced' | 'saving' | 'offline' | 'error';
  createProfile: (displayName: string, schoolCourse?: string, avatarEmoji?: string) => Promise<void>;
  updateProfileDetails: (displayName: string, schoolCourse?: string, avatarEmoji?: string) => Promise<void>;
  loadProfileByCollectorId: (collectorId: string) => Promise<boolean>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, displayName: string, course?: string, avatar?: string) => Promise<void>;
  logOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeUserId, setActiveUserId] = useState<string>(() => getOrCreateLocalUserId());
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => getCachedProfile());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'saving' | 'offline' | 'error'>('synced');

  // Monitor Auth State and load profile
  useEffect(() => {
    let isMounted = true;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (!isMounted) return;
      setCurrentUser(user);

      const targetUid = user ? user.uid : getOrCreateLocalUserId();
      setActiveUserId(targetUid);

      try {
        const profile = await getUserProfile(targetUid);
        if (profile && isMounted) {
          setUserProfile(profile);
          setCachedProfile(profile);
        }
      } catch (err) {
        console.warn('Error fetching profile on auth change:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
      unsubscribeAuth();
    };
  }, []);

  // Listen to Firestore real-time changes for active user
  useEffect(() => {
    if (!activeUserId) return;

    const unsubscribeDoc = subscribeToUserProfile(
      activeUserId,
      (updatedProfile) => {
        setUserProfile(updatedProfile);
        setCachedProfile(updatedProfile);
        setSyncStatus('synced');
      },
      (error) => {
        console.warn('Realtime sync status offline/fallback:', error);
        setSyncStatus('offline');
      }
    );

    return () => unsubscribeDoc();
  }, [activeUserId]);

  // Create Profile for first-time user (instant creation, 100% reliable)
  const createProfile = async (displayName: string, schoolCourse?: string, avatarEmoji?: string) => {
    setIsSaving(true);
    setSyncStatus('saving');

    try {
      const uidToUse = currentUser?.uid || activeUserId || getOrCreateLocalUserId();
      setActiveUserId(uidToUse);

      let profile: UserProfile;
      try {
        profile = await createUserProfile(uidToUse, {
          displayName: displayName.trim() || 'Coleccionista',
          schoolCourse: schoolCourse?.trim() || '',
          avatarEmoji: avatarEmoji || '⚽',
          email: currentUser?.email || null,
          isAnonymous: currentUser?.isAnonymous ?? true
        });
      } catch (dbErr) {
        console.warn('Firestore write warning, fallback to local state:', dbErr);
        profile = {
          id: uidToUse,
          collectorId: `SC-${Math.floor(1000 + Math.random() * 9000)}`,
          displayName: displayName.trim() || 'Coleccionista',
          schoolCourse: schoolCourse?.trim() || '',
          avatarEmoji: avatarEmoji || '⚽',
          email: null,
          isAnonymous: true,
          points: 50,
          unlockedIds: [],
          duplicateCounts: {},
          lastPackTime: 0,
          lastDailyBonusTime: 0,
          streakDays: 1,
          packsOpenedCount: 0,
          gamesPlayedCount: 0,
          penaltyGoalsCount: 0,
          dailyGamesRecord: {},
          unlockedAchievements: [],
          customDescriptions: {},
          packHistory: [],
          hasCelebrated: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
      }

      if (currentUser && displayName.trim()) {
        try {
          await updateProfile(currentUser, { displayName: displayName.trim() });
        } catch {}
      }

      setUserProfile(profile);
      setCachedProfile(profile);
      setSyncStatus('synced');
    } catch (error) {
      console.error('Error creating user profile:', error);
      setSyncStatus('error');
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  // Switch or load profile by Collector ID (e.g. SC-1234)
  const loadProfileByCollectorId = async (collectorId: string): Promise<boolean> => {
    setIsSaving(true);
    try {
      const found = await findProfileByCollectorId(collectorId);
      if (found) {
        setActiveUserId(found.id);
        try {
          localStorage.setItem(LOCAL_USER_ID_KEY, found.id);
        } catch {}
        setUserProfile(found);
        setCachedProfile(found);
        setSyncStatus('synced');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error loading by collector ID:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Update Profile details
  const updateProfileDetails = async (displayName: string, schoolCourse?: string, avatarEmoji?: string) => {
    if (!activeUserId) return;
    setIsSaving(true);
    setSyncStatus('saving');
    try {
      const updates: Partial<UserProfile> = {
        displayName: displayName.trim() || 'Coleccionista',
        schoolCourse: schoolCourse?.trim() || '',
        avatarEmoji: avatarEmoji || '⚽'
      };

      try {
        await saveUserProfile(activeUserId, updates);
      } catch (dbErr) {
        console.warn('Could not save profile remotely:', dbErr);
      }

      setUserProfile(prev => {
        const next = prev ? { ...prev, ...updates } : null;
        setCachedProfile(next);
        return next;
      });
      setSyncStatus('synced');
    } catch (error) {
      console.error('Error updating profile:', error);
      setSyncStatus('error');
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      setCurrentUser(cred.user);
      setActiveUserId(cred.user.uid);
      try {
        localStorage.setItem(LOCAL_USER_ID_KEY, cred.user.uid);
      } catch {}
      const profile = await getUserProfile(cred.user.uid);
      if (profile) {
        setUserProfile(profile);
        setCachedProfile(profile);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signUpWithEmail = async (
    email: string,
    pass: string,
    displayName: string,
    course?: string,
    avatar?: string
  ) => {
    setIsLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      try {
        await updateProfile(cred.user, { displayName });
      } catch {}
      setCurrentUser(cred.user);
      setActiveUserId(cred.user.uid);
      try {
        localStorage.setItem(LOCAL_USER_ID_KEY, cred.user.uid);
      } catch {}

      const profile = await createUserProfile(cred.user.uid, {
        displayName,
        schoolCourse: course || '',
        avatarEmoji: avatar || '⚽',
        email: cred.user.email,
        isAnonymous: false
      });
      setUserProfile(profile);
      setCachedProfile(profile);
    } finally {
      setIsLoading(false);
    }
  };

  const logOut = async () => {
    setIsLoading(true);
    try {
      await firebaseSignOut(auth);
    } catch {}
    const guestId = getOrCreateLocalUserId();
    setActiveUserId(guestId);
    setUserProfile(null);
    setCachedProfile(null);
    setCurrentUser(null);
    setIsLoading(false);
  };

  const refreshProfile = async () => {
    if (!activeUserId) return;
    try {
      const p = await getUserProfile(activeUserId);
      if (p) {
        setUserProfile(p);
        setCachedProfile(p);
      }
    } catch {}
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        activeUserId,
        userProfile,
        isLoading,
        isSaving,
        syncStatus,
        createProfile,
        updateProfileDetails,
        loadProfileByCollectorId,
        signInWithEmail,
        signUpWithEmail,
        logOut,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
