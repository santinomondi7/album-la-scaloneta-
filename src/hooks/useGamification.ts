import { useState, useEffect, useCallback, useRef } from 'react';
import { ALL_STICKERS } from '../data/albumData';
import { Sticker, UserLevel, ToastNotification, PackHistoryEntry, PackHistoryCard, StickerRarity, UserProfile } from '../types';
import { PACK_COOLDOWN_MS, RARITY_WEIGHTS, USER_LEVELS, STICKERS_PER_PACK, MAX_REWARDED_GAMES_PER_DAY } from '../data/packProbabilities';
import { ACHIEVEMENTS_LIST } from '../data/achievementsData';
import { soundManager } from '../utils/audio';
import { useAuth } from '../context/AuthContext';
import { saveUserProfile } from '../services/userService';

const STORAGE_KEYS = {
  UNLOCKED_IDS: 'scaloneta_unlocked_ids_v4',
  DUPLICATE_COUNTS: 'scaloneta_duplicate_counts_v4',
  POINTS: 'scaloneta_points_v4',
  LAST_PACK_TIME: 'scaloneta_last_pack_time_v4',
  LAST_DAILY_BONUS_TIME: 'scaloneta_last_daily_bonus_v4',
  STREAK_DAYS: 'scaloneta_streak_days_v4',
  PACKS_OPENED: 'scaloneta_packs_opened_v4',
  GAMES_PLAYED: 'scaloneta_games_played_v4',
  PENALTY_GOALS: 'scaloneta_penalty_goals_v4',
  DAILY_GAMES: 'scaloneta_daily_games_v4',
  ACHIEVEMENTS: 'scaloneta_unlocked_achievements_v4',
  CUSTOM_DESCRIPTIONS: 'scaloneta_custom_descriptions_v4',
  HAS_CELEBRATED: 'scaloneta_has_celebrated_v4',
  PACK_HISTORY: 'scaloneta_pack_history_v4'
};

const TOTAL_STICKERS_COUNT = ALL_STICKERS.length; // 45 stickers

export interface PackPullResult {
  sticker: Sticker;
  isDuplicate: boolean;
  duplicateCount: number;
  pointsEarned: number;
  isLegendary: boolean;
}

export function useGamification() {
  const { currentUser, activeUserId, userProfile } = useAuth();
  const isRemoteLoadedRef = useRef(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Unlocked Unique IDs (Starts from 0 for fresh collection by players)
  const [unlockedIds, setUnlockedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.UNLOCKED_IDS);
      if (saved) return JSON.parse(saved);
      return [];
    } catch {
      return [];
    }
  });

  // 2. Duplicate Counts { [stickerId: string]: number } (total copies drawn of each)
  const [duplicateCounts, setDuplicateCounts] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DUPLICATE_COUNTS);
      if (saved) return JSON.parse(saved);
      return {};
    } catch {
      return {};
    }
  });

  // 3. Points
  const [points, setPoints] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.POINTS);
      return saved ? parseInt(saved, 10) : 50; // Starting welcome bonus
    } catch {
      return 50;
    }
  });

  // 4. Pack 2-Hour Cooldown
  const [lastPackTime, setLastPackTime] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LAST_PACK_TIME);
      return saved ? parseInt(saved, 10) : 0; // 0 = first pack ready immediately
    } catch {
      return 0;
    }
  });

  // 5. Daily Streak & Bonus
  const [lastDailyBonusTime, setLastDailyBonusTime] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LAST_DAILY_BONUS_TIME);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [streakDays, setStreakDays] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STREAK_DAYS);
      return saved ? parseInt(saved, 10) : 1;
    } catch {
      return 1;
    }
  });

  // 6. Statistics
  const [packsOpenedCount, setPacksOpenedCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PACKS_OPENED);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [gamesPlayedCount, setGamesPlayedCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GAMES_PLAYED);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [penaltyGoalsCount, setPenaltyGoalsCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PENALTY_GOALS);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  // 7. Daily Mini-games record { "2026-08-14": { quiz: 1, penalty: 2, ... } }
  const [dailyGamesRecord, setDailyGamesRecord] = useState<Record<string, Record<string, number>>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DAILY_GAMES);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 8. Achievements
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 9. Pack History
  const [packHistory, setPackHistory] = useState<PackHistoryEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PACK_HISTORY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 10. Custom proposal descriptions
  const [customDescriptions, setCustomDescriptions] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_DESCRIPTIONS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 11. 100% Album celebration
  const [hasCelebrated, setHasCelebrated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.HAS_CELEBRATED) === 'true';
    } catch {
      return false;
    }
  });
  const [showCelebration, setShowCelebration] = useState(false);

  // 12. Ephemeral UI State (Toasts & Modal Celebrations)
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [legendaryPullSticker, setLegendaryPullSticker] = useState<Sticker | null>(null);

  // Cooldown timer state
  const [now, setNow] = useState(Date.now());

  // Tick every second for live countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync state from Firestore Remote Profile on initial load or change
  useEffect(() => {
    if (userProfile) {
      if (Array.isArray(userProfile.unlockedIds)) setUnlockedIds(userProfile.unlockedIds);
      if (userProfile.duplicateCounts && typeof userProfile.duplicateCounts === 'object') setDuplicateCounts(userProfile.duplicateCounts);
      if (typeof userProfile.points === 'number') setPoints(userProfile.points);
      if (typeof userProfile.lastPackTime === 'number') setLastPackTime(userProfile.lastPackTime);
      if (typeof userProfile.lastDailyBonusTime === 'number') setLastDailyBonusTime(userProfile.lastDailyBonusTime);
      if (typeof userProfile.streakDays === 'number') setStreakDays(userProfile.streakDays);
      if (typeof userProfile.packsOpenedCount === 'number') setPacksOpenedCount(userProfile.packsOpenedCount);
      if (typeof userProfile.gamesPlayedCount === 'number') setGamesPlayedCount(userProfile.gamesPlayedCount);
      if (typeof userProfile.penaltyGoalsCount === 'number') setPenaltyGoalsCount(userProfile.penaltyGoalsCount);
      if (userProfile.dailyGamesRecord && typeof userProfile.dailyGamesRecord === 'object') setDailyGamesRecord(userProfile.dailyGamesRecord);
      if (Array.isArray(userProfile.unlockedAchievements)) setUnlockedAchievements(userProfile.unlockedAchievements);
      if (Array.isArray(userProfile.packHistory)) setPackHistory(userProfile.packHistory);
      if (userProfile.customDescriptions && typeof userProfile.customDescriptions === 'object') setCustomDescriptions(userProfile.customDescriptions);
      if (typeof userProfile.hasCelebrated === 'boolean') setHasCelebrated(userProfile.hasCelebrated);
      isRemoteLoadedRef.current = true;
    }
  }, [userProfile]);

  // Debounced Remote Save Helper
  const triggerRemoteSave = useCallback((updates: Partial<UserProfile>) => {
    const uid = activeUserId || currentUser?.uid;
    if (!uid || !isRemoteLoadedRef.current) return;
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await saveUserProfile(uid, updates);
      } catch (e) {
        console.warn('Auto-save warning to Firestore:', e);
      }
    }, 500);
  }, [activeUserId, currentUser]);

  // Save changes to LocalStorage and trigger debounced Firestore auto-save
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.UNLOCKED_IDS, JSON.stringify(unlockedIds));
      localStorage.setItem(STORAGE_KEYS.DUPLICATE_COUNTS, JSON.stringify(duplicateCounts));
      localStorage.setItem(STORAGE_KEYS.POINTS, points.toString());
      localStorage.setItem(STORAGE_KEYS.LAST_PACK_TIME, lastPackTime.toString());
      localStorage.setItem(STORAGE_KEYS.LAST_DAILY_BONUS_TIME, lastDailyBonusTime.toString());
      localStorage.setItem(STORAGE_KEYS.STREAK_DAYS, streakDays.toString());
      localStorage.setItem(STORAGE_KEYS.PACKS_OPENED, packsOpenedCount.toString());
      localStorage.setItem(STORAGE_KEYS.GAMES_PLAYED, gamesPlayedCount.toString());
      localStorage.setItem(STORAGE_KEYS.PENALTY_GOALS, penaltyGoalsCount.toString());
      localStorage.setItem(STORAGE_KEYS.DAILY_GAMES, JSON.stringify(dailyGamesRecord));
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(unlockedAchievements));
      localStorage.setItem(STORAGE_KEYS.PACK_HISTORY, JSON.stringify(packHistory));
      localStorage.setItem(STORAGE_KEYS.CUSTOM_DESCRIPTIONS, JSON.stringify(customDescriptions));
    } catch {}

    triggerRemoteSave({
      unlockedIds,
      duplicateCounts,
      points,
      lastPackTime,
      lastDailyBonusTime,
      streakDays,
      packsOpenedCount,
      gamesPlayedCount,
      penaltyGoalsCount,
      dailyGamesRecord,
      unlockedAchievements,
      packHistory,
      customDescriptions,
      hasCelebrated
    });
  }, [
    unlockedIds,
    duplicateCounts,
    points,
    lastPackTime,
    lastDailyBonusTime,
    streakDays,
    packsOpenedCount,
    gamesPlayedCount,
    penaltyGoalsCount,
    dailyGamesRecord,
    unlockedAchievements,
    packHistory,
    customDescriptions,
    hasCelebrated,
    triggerRemoteSave
  ]);

  // Toast Dispatcher
  const addToast = useCallback((toast: Omit<ToastNotification, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts(prev => [...prev.slice(-3), { ...toast, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  // Add points with sound & toast
  const addPoints = useCallback((amount: number, reason: string) => {
    setPoints(prev => prev + amount);
    soundManager.playSuccess();
    addToast({
      type: 'points',
      title: `+${amount} PUNTOS`,
      subtitle: reason
    });
  }, [addToast]);

  // Check achievements automatically based on stats
  useEffect(() => {
    const newUnlocked: string[] = [];

    // Check Album Progress
    const totalUnlocked = unlockedIds.length;
    if (totalUnlocked >= 10 && !unlockedAchievements.includes('ach-first-10')) {
      newUnlocked.push('ach-first-10');
    }
    if (totalUnlocked >= 22 && !unlockedAchievements.includes('ach-half-album')) {
      newUnlocked.push('ach-half-album');
    }
    if (totalUnlocked >= TOTAL_STICKERS_COUNT && !unlockedAchievements.includes('ach-full-album')) {
      newUnlocked.push('ach-full-album');
    }

    // Check Packs Opened
    if (packsOpenedCount >= 1 && !unlockedAchievements.includes('ach-first-pack')) {
      newUnlocked.push('ach-first-pack');
    }
    if (packsOpenedCount >= 10 && !unlockedAchievements.includes('ach-pack-collector')) {
      newUnlocked.push('ach-pack-collector');
    }

    // Check Games Played
    if (gamesPlayedCount >= 1 && !unlockedAchievements.includes('ach-first-game')) {
      newUnlocked.push('ach-first-game');
    }
    if (gamesPlayedCount >= 15 && !unlockedAchievements.includes('ach-games-enthusiast')) {
      newUnlocked.push('ach-games-enthusiast');
    }

    // Check Penalty Goals
    if (penaltyGoalsCount >= 10 && !unlockedAchievements.includes('ach-penalty-scorer')) {
      newUnlocked.push('ach-penalty-scorer');
    }

    // Check Streak
    if (streakDays >= 3 && !unlockedAchievements.includes('ach-streak-3')) {
      newUnlocked.push('ach-streak-3');
    }
    if (streakDays >= 7 && !unlockedAchievements.includes('ach-streak-7')) {
      newUnlocked.push('ach-streak-7');
    }

    // Check Points Milestones
    if (points >= 500 && !unlockedAchievements.includes('ach-points-500')) {
      newUnlocked.push('ach-points-500');
    }
    if (points >= 1000 && !unlockedAchievements.includes('ach-points-1000')) {
      newUnlocked.push('ach-points-1000');
    }

    if (newUnlocked.length > 0) {
      setUnlockedAchievements(prev => [...prev, ...newUnlocked]);
      newUnlocked.forEach(achId => {
        const ach = ACHIEVEMENTS_LIST.find(a => a.id === achId);
        if (ach) {
          setPoints(p => p + ach.pointsReward);
          soundManager.playGoldFanfare();
          addToast({
            type: 'achievement',
            title: `¡LOGRO DESBLOQUEADO: ${ach.title.toUpperCase()}!`,
            subtitle: `+${ach.pointsReward} pts • ${ach.description}`
          });
        }
      });
    }
  }, [unlockedIds, packsOpenedCount, gamesPlayedCount, penaltyGoalsCount, streakDays, points, unlockedAchievements, addToast]);

  // Check 100% Album Full Celebration
  useEffect(() => {
    if (unlockedIds.length >= TOTAL_STICKERS_COUNT && !hasCelebrated) {
      setShowCelebration(true);
      setHasCelebrated(true);
      localStorage.setItem(STORAGE_KEYS.HAS_CELEBRATED, 'true');
      soundManager.playGoldFanfare();
    }
  }, [unlockedIds, hasCelebrated]);

  // 2-Hour Pack Cooldown Calculation
  const elapsedSincePack = now - lastPackTime;
  const isPackReady = lastPackTime === 0 || elapsedSincePack >= PACK_COOLDOWN_MS;
  const timeRemainingMs = Math.max(0, PACK_COOLDOWN_MS - elapsedSincePack);

  const formatCountdown = (ms: number): string => {
    if (ms <= 0) return '00:00:00';
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const formattedCountdown = formatCountdown(timeRemainingMs);

  // Daily Bonus Check (24 hours cooldown)
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  const elapsedSinceBonus = now - lastDailyBonusTime;
  const isDailyBonusReady = lastDailyBonusTime === 0 || elapsedSinceBonus >= ONE_DAY_MS;

  const claimDailyBonus = useCallback(() => {
    if (!isDailyBonusReady) return;
    const nowTime = Date.now();
    setLastDailyBonusTime(nowTime);

    // Check if consecutive day
    const twoDaysMs = 48 * 60 * 60 * 1000;
    let nextStreak = streakDays;
    if (lastDailyBonusTime === 0 || elapsedSinceBonus <= twoDaysMs) {
      nextStreak += 1;
    } else {
      nextStreak = 1;
    }
    setStreakDays(nextStreak);

    // Points calculation: base 25 + 5 * streak
    const bonusPoints = 25 + Math.min(nextStreak * 5, 50);
    addPoints(bonusPoints, `Bonus Diario (Racha de ${nextStreak} días 🔥)`);
  }, [isDailyBonusReady, lastDailyBonusTime, elapsedSinceBonus, streakDays, addPoints]);

  // User Level Calculation
  const currentLevel: UserLevel = [...USER_LEVELS].reverse().find(lvl => points >= lvl.minPoints) || USER_LEVELS[0];
  const currentLevelIndex = USER_LEVELS.findIndex(l => l.level === currentLevel.level);
  const nextLevel = USER_LEVELS[currentLevelIndex + 1];

  let levelProgressPercentage = 100;
  if (nextLevel) {
    const range = nextLevel.minPoints - currentLevel.minPoints;
    const current = points - currentLevel.minPoints;
    levelProgressPercentage = Math.min(100, Math.max(0, Math.round((current / range) * 100)));
  }

  // Pick a random sticker strictly according to drop rate weights.
  // The optional availableIds set makes sure we only pick stickers the player
  // does not already own, and also prevents two stickers in the same pack
  // from being the same.
  const pickRandomSticker = useCallback((availableIds?: Set<string>): Sticker | null => {
    const available = availableIds
      ? ALL_STICKERS.filter(s => availableIds.has(s.id))
      : ALL_STICKERS;

    if (available.length === 0) return null;

    const roll = Math.random() * 100;

    let targetRarity: StickerRarity = 'common';
    if (roll < RARITY_WEIGHTS.legendary) {
      targetRarity = 'legendary';
    } else if (roll < RARITY_WEIGHTS.legendary + RARITY_WEIGHTS.epic) {
      targetRarity = 'epic';
    } else if (roll < RARITY_WEIGHTS.legendary + RARITY_WEIGHTS.epic + RARITY_WEIGHTS.rare) {
      targetRarity = 'rare';
    }

    // Prefer the rolled rarity, but if that rarity is already complete,
    // choose randomly from every sticker still missing instead of repeating.
    const matchingPool = available.filter(s => s.rarity === targetRarity);
    const pool = matchingPool.length > 0 ? matchingPool : available;
    return pool[Math.floor(Math.random() * pool.length)];
  }, []);

  // Open a pack of up to 3 stickers, NEVER repeating a sticker already owned
  // by the current student and NEVER repeating a sticker inside the same pack.
  const openPack = useCallback((): PackPullResult[] => {
    const availableIds = new Set(
      ALL_STICKERS.filter(sticker => !unlockedIds.includes(sticker.id)).map(sticker => sticker.id)
    );

    if (availableIds.size === 0) {
      addToast({
        type: 'achievement',
        title: '¡ÁLBUM COMPLETO! 🏆',
        subtitle: 'Ya tenés las 45 figuritas. No hay repetidas para darte.'
      });
      return [];
    }

    const nowTime = Date.now();
    const currentPackNumber = packsOpenedCount + 1;
    setLastPackTime(nowTime);
    setPacksOpenedCount(currentPackNumber);

    const results: PackPullResult[] = [];
    const historyCards: PackHistoryCard[] = [];
    const newUnlocked = new Set(unlockedIds);
    const newDuplicates = { ...duplicateCounts };
    let newLegendaryFound: Sticker | null = null;
    let commonCount = 0;
    let rareCount = 0;
    let epicCount = 0;
    let legendaryCount = 0;

    const cardsToOpen = Math.min(STICKERS_PER_PACK, availableIds.size);

    for (let i = 0; i < cardsToOpen; i++) {
      const sticker = pickRandomSticker(availableIds);
      if (!sticker) break;

      // Remove immediately so another card in THIS SAME pack cannot repeat it.
      availableIds.delete(sticker.id);

      newUnlocked.add(sticker.id);
      const currentCopies = Math.max(1, newDuplicates[sticker.id] || 0);
      newDuplicates[sticker.id] = currentCopies;

      const isLegendary = sticker.rarity === 'legendary';
      if (isLegendary) {
        newLegendaryFound = sticker;
      }

      if (sticker.rarity === 'common') commonCount++;
      else if (sticker.rarity === 'rare') rareCount++;
      else if (sticker.rarity === 'epic') epicCount++;
      else if (sticker.rarity === 'legendary') legendaryCount++;

      results.push({
        sticker,
        isDuplicate: false,
        duplicateCount: currentCopies,
        pointsEarned: 0,
        isLegendary
      });

      historyCards.push({
        id: sticker.id,
        number: sticker.number,
        title: sticker.title,
        rarity: sticker.rarity,
        isDuplicate: false,
        pointsEarned: 0
      });
    }

    setUnlockedIds(Array.from(newUnlocked));
    setDuplicateCounts(newDuplicates);

    const summaryParts: string[] = [];
    if (legendaryCount > 0) summaryParts.push(`${legendaryCount} ${legendaryCount === 1 ? 'legendaria' : 'legendarias'}`);
    if (epicCount > 0) summaryParts.push(`${epicCount} ${epicCount === 1 ? 'épica' : 'épicas'}`);
    if (rareCount > 0) summaryParts.push(`${rareCount} ${rareCount === 1 ? 'rara' : 'raras'}`);
    if (commonCount > 0) summaryParts.push(`${commonCount} ${commonCount === 1 ? 'común' : 'comunes'}`);

    const date = new Date(nowTime);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const timeFormatted = `Hoy — ${hours}:${minutes}`;

    const newHistoryEntry: PackHistoryEntry = {
      id: `pack-${nowTime}-${Math.random().toString().slice(2, 6)}`,
      packNumber: currentPackNumber,
      timestamp: nowTime,
      timeFormatted,
      cards: historyCards,
      summary: summaryParts.join(', ') || `${results.length} figuritas nuevas`
    };

    setPackHistory(prev => [newHistoryEntry, ...prev.slice(0, 29)]);

    if (newLegendaryFound) {
      setLegendaryPullSticker(newLegendaryFound);
      soundManager.playGoldFanfare();
      if (!unlockedAchievements.includes('ach-legendary-pull')) {
        setUnlockedAchievements(prev => [...prev, 'ach-legendary-pull']);
        setPoints(p => p + 60);
      }
    }

    if (results.length < STICKERS_PER_PACK) {
      addToast({
        type: 'achievement',
        title: `¡${results.length} FIGURITA${results.length === 1 ? '' : 'S'} NUEVA${results.length === 1 ? '' : 'S'}!`,
        subtitle: 'Estás muy cerca de completar el álbum. 🏆'
      });
    }

    return results;
  }, [unlockedIds, duplicateCounts, pickRandomSticker, addToast, unlockedAchievements, packsOpenedCount]);

  // Record Mini-game play
  const recordGameResult = useCallback((gameType: 'quiz' | 'penalty' | 'adivina' | 'memoria' | 'rapido', pointsEarned: number, extraData?: { isPenaltyGoal?: number; quizScore?: number; perfectClue1?: boolean }) => {
    const today = new Date().toISOString().split('T')[0];
    const todayRecord = dailyGamesRecord[today] || {};
    const playsToday = todayRecord[gameType] || 0;

    setGamesPlayedCount(prev => prev + 1);

    if (extraData?.isPenaltyGoal) {
      setPenaltyGoalsCount(prev => prev + extraData.isPenaltyGoal!);
    }

    const isRewarded = playsToday < MAX_REWARDED_GAMES_PER_DAY;

    setDailyGamesRecord(prev => ({
      ...prev,
      [today]: {
        ...(prev[today] || {}),
        [gameType]: playsToday + 1
      }
    }));

    if (isRewarded && pointsEarned > 0) {
      addPoints(pointsEarned, `Minijuego (${playsToday + 1}/${MAX_REWARDED_GAMES_PER_DAY} con recompensa hoy)`);
    }

    if (gameType === 'quiz') {
      if (!unlockedAchievements.includes('ach-first-quiz')) {
        setUnlockedAchievements(prev => [...prev, 'ach-first-quiz']);
        setPoints(p => p + 20);
        addToast({ type: 'achievement', title: '¡LOGRO: Primer Quiz!', subtitle: '+20 pts' });
      }
      if (extraData?.quizScore && extraData.quizScore >= 8 && !unlockedAchievements.includes('ach-quiz-master')) {
        setUnlockedAchievements(prev => [...prev, 'ach-quiz-master']);
        setPoints(p => p + 50);
        addToast({ type: 'achievement', title: '¡LOGRO: Sabio Albiceleste!', subtitle: '+50 pts' });
      }
    } else if (gameType === 'adivina' && extraData?.perfectClue1 && !unlockedAchievements.includes('ach-sharp-eye')) {
      setUnlockedAchievements(prev => [...prev, 'ach-sharp-eye']);
      setPoints(p => p + 35);
      addToast({ type: 'achievement', title: '¡LOGRO: Ojo de Lince!', subtitle: '+35 pts' });
    } else if (gameType === 'memoria' && !unlockedAchievements.includes('ach-memory-master')) {
      setUnlockedAchievements(prev => [...prev, 'ach-memory-master']);
      setPoints(p => p + 30);
      addToast({ type: 'achievement', title: '¡LOGRO: Mente Futbolera!', subtitle: '+30 pts' });
    }

    return {
      isRewarded,
      playsToday: playsToday + 1,
      maxRewarded: MAX_REWARDED_GAMES_PER_DAY
    };
  }, [dailyGamesRecord, addPoints, unlockedAchievements, addToast]);

  const getPlaysToday = useCallback((gameType: string) => {
    const today = new Date().toISOString().split('T')[0];
    const todayRecord = dailyGamesRecord[today] || {};
    return todayRecord[gameType] || 0;
  }, [dailyGamesRecord]);

  // Read-only sticker status check
  const isUnlocked = useCallback((id: string) => unlockedIds.includes(id), [unlockedIds]);

  // Reset entire progress (for fresh start)
  const resetProgress = useCallback(async () => {
    setUnlockedIds([]);
    setDuplicateCounts({});
    setPoints(50);
    setLastPackTime(0);
    setLastDailyBonusTime(0);
    setStreakDays(1);
    setPacksOpenedCount(0);
    setGamesPlayedCount(0);
    setPenaltyGoalsCount(0);
    setDailyGamesRecord({});
    setUnlockedAchievements([]);
    setPackHistory([]);
    setHasCelebrated(false);
    setShowCelebration(false);
    try {
      Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
    } catch {}
    const uid = activeUserId || currentUser?.uid;
    if (uid) {
      try {
        await saveUserProfile(uid, {
          unlockedIds: [],
          duplicateCounts: {},
          points: 50,
          lastPackTime: 0,
          lastDailyBonusTime: 0,
          streakDays: 1,
          packsOpenedCount: 0,
          gamesPlayedCount: 0,
          penaltyGoalsCount: 0,
          dailyGamesRecord: {},
          unlockedAchievements: [],
          packHistory: [],
          hasCelebrated: false
        });
      } catch (e) {
        console.warn('Error resetting cloud profile:', e);
      }
    }
    soundManager.playClick();
  }, [activeUserId, currentUser]);

  const updateCustomDescription = (id: string, text: string) => {
    const next = { ...customDescriptions, [id]: text };
    setCustomDescriptions(next);
  };

  const unlockedCount = unlockedIds.length;
  const percentage = Math.round((unlockedCount / TOTAL_STICKERS_COUNT) * 100);
  
  // Total duplicate copies
  const totalDuplicates = (Object.values(duplicateCounts) as number[]).reduce(
    (acc: number, count: number) => acc + Math.max(0, count - 1),
    0
  );

  // Total stickers obtained across all packs (uniques + duplicates)
  const totalObtained = unlockedCount + totalDuplicates;

  return {
    unlockedIds,
    unlockedCount,
    totalCount: TOTAL_STICKERS_COUNT,
    percentage,
    duplicateCounts,
    totalDuplicates,
    totalObtained,
    isUnlocked,
    resetProgress,
    // Pack 2-Hour Cooldown & Open
    isPackReady,
    timeRemainingMs,
    formattedCountdown,
    openPack,
    packsOpenedCount,
    packHistory,
    legendaryPull: legendaryPullSticker,
    legendaryPullSticker,
    setLegendaryPullSticker,
    closeLegendaryModal: () => setLegendaryPullSticker(null),
    // Points & Level
    points,
    addPoints,
    currentLevel,
    nextLevel,
    levelProgressPercentage,
    // Daily Bonus & Streak
    isDailyBonusReady,
    streakDays,
    claimDailyBonus,
    // Minigames
    recordGameResult,
    getPlaysToday,
    gamesPlayedCount,
    penaltyGoalsCount,
    // Achievements & Celebration
    unlockedAchievements,
    showCelebration,
    setShowCelebration,
    // Toasts & Custom Descriptions
    toasts,
    customDescriptions,
    updateCustomDescription
  };
}
