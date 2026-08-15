import { useState, useEffect, useCallback } from 'react';
import { ALL_STICKERS, TOTAL_STICKERS_COUNT } from '../data/albumData';
import { soundManager } from '../utils/audio';

const STORAGE_KEY = 'la_scaloneta_album_stickers_v4';
const CUSTOM_DATA_KEY = 'la_scaloneta_custom_data_v4';

export function useAlbumProgress() {
  const [unlockedIds, setUnlockedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    // Starts from 0 stickers for new players
    return [];
  });

  const [hasCelebrated, setHasCelebrated] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [customDescriptions, setCustomDescriptions] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_DATA_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(unlockedIds));
    } catch {}
  }, [unlockedIds]);

  // Check 100% complete celebration
  useEffect(() => {
    if (unlockedIds.length >= TOTAL_STICKERS_COUNT && !hasCelebrated && TOTAL_STICKERS_COUNT > 0) {
      setHasCelebrated(true);
      setShowCelebration(true);
      soundManager.playGoldFanfare();
    }
  }, [unlockedIds.length, hasCelebrated]);

  const isUnlocked = useCallback((id: string) => {
    return unlockedIds.includes(id);
  }, [unlockedIds]);

  const unlockSticker = useCallback((id: string) => {
    if (!unlockedIds.includes(id)) {
      setUnlockedIds(prev => [...prev, id]);
      soundManager.playStickerCollect();
      return true;
    }
    return false;
  }, [unlockedIds]);

  const toggleSticker = useCallback((id: string) => {
    if (unlockedIds.includes(id)) {
      setUnlockedIds(prev => prev.filter(x => x !== id));
      soundManager.playClick();
    } else {
      unlockSticker(id);
    }
  }, [unlockedIds, unlockSticker]);

  const unlockAll = useCallback(() => {
    const allIds = ALL_STICKERS.map(s => s.id);
    setUnlockedIds(allIds);
    soundManager.playGoldFanfare();
  }, []);

  const resetProgress = useCallback(() => {
    setUnlockedIds([]);
    setHasCelebrated(false);
    setShowCelebration(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    soundManager.playClick();
  }, []);

  const openRandomPack = useCallback((packSize: number = 4): string[] => {
    // Get locked stickers first
    const lockedStickers = ALL_STICKERS.filter(s => !unlockedIds.includes(s.id));
    const pool = lockedStickers.length > 0 ? lockedStickers : ALL_STICKERS;
    
    // Pick random stickers
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(packSize, pool.length));
    const selectedIds = selected.map(s => s.id);

    // Auto unlock them in album
    setUnlockedIds(prev => Array.from(new Set([...prev, ...selectedIds])));
    return selectedIds;
  }, [unlockedIds]);

  const updateCustomDescription = (id: string, text: string) => {
    const next = { ...customDescriptions, [id]: text };
    setCustomDescriptions(next);
    try {
      localStorage.setItem(CUSTOM_DATA_KEY, JSON.stringify(next));
    } catch {}
  };

  const unlockedCount = unlockedIds.length;
  const percentage = Math.round((unlockedCount / TOTAL_STICKERS_COUNT) * 100);

  return {
    unlockedIds,
    unlockedCount,
    totalCount: TOTAL_STICKERS_COUNT,
    percentage,
    isUnlocked,
    unlockSticker,
    toggleSticker,
    unlockAll,
    resetProgress,
    openRandomPack,
    showCelebration,
    setShowCelebration,
    customDescriptions,
    updateCustomDescription
  };
}
