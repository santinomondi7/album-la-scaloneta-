import { doc, getDoc, setDoc, updateDoc, onSnapshot, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { UserProfile } from '../types';

export function generateCollectorId(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let randomCode = '';
  for (let i = 0; i < 4; i++) {
    randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `SC-${randomCode}`;
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const userDocRef = doc(db, 'users', userId);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile from Firestore:', error);
    return null;
  }
}

export async function findProfileByCollectorId(collectorId: string): Promise<UserProfile | null> {
  try {
    const cleanId = collectorId.trim().toUpperCase();
    const q = query(collection(db, 'users'), where('collectorId', '==', cleanId));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs[0].data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error searching profile by collector ID:', error);
    return null;
  }
}

export async function createUserProfile(
  userId: string,
  initialData: {
    displayName: string;
    schoolCourse?: string;
    avatarEmoji?: string;
    email?: string | null;
    isAnonymous?: boolean;
    collectorId?: string;
  }
): Promise<UserProfile> {
  const newProfile: UserProfile = {
    id: userId,
    collectorId: initialData.collectorId || generateCollectorId(),
    displayName: initialData.displayName || 'Coleccionista Albiceleste',
    schoolCourse: initialData.schoolCourse || '',
    avatarEmoji: initialData.avatarEmoji || '⚽',
    email: initialData.email || null,
    isAnonymous: initialData.isAnonymous ?? true,
    points: 50, // Welcome starting points
    unlockedIds: [], // Starts at 0
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

  const userDocRef = doc(db, 'users', userId);
  await setDoc(userDocRef, {
    ...newProfile,
    serverUpdatedAt: serverTimestamp()
  });

  return newProfile;
}

export async function saveUserProfile(userId: string, data: Partial<UserProfile>): Promise<void> {
  try {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(
      userDocRef,
      {
        ...data,
        updatedAt: new Date().toISOString(),
        serverUpdatedAt: serverTimestamp()
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error saving user profile to Firestore:', error);
    throw error;
  }
}

export function subscribeToUserProfile(
  userId: string,
  onData: (data: UserProfile) => void,
  onError?: (err: Error) => void
) {
  const userDocRef = doc(db, 'users', userId);
  return onSnapshot(
    userDocRef,
    docSnap => {
      if (docSnap.exists()) {
        onData(docSnap.data() as UserProfile);
      }
    },
    error => {
      console.warn('Firestore subscription error:', error);
      if (onError) onError(error);
    }
  );
}
