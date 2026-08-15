import { StickerRarity, UserLevel } from '../types';

// Pack Cooldown: 2 hours in milliseconds
export const PACK_COOLDOWN_MS = 2 * 60 * 60 * 1000; // 2 hours = 7,200,000 ms

// Number of stickers per pack
export const STICKERS_PER_PACK = 3;

// Drop rate probabilities (Configurable)
// COMÚN: 65%, RARA: 25%, ÉPICA: 9%, LEGENDARIA: 1%
export const RARITY_WEIGHTS: Record<StickerRarity, number> = {
  common: 65,   // 65%
  rare: 25,     // 25%
  epic: 9,      // 9%
  legendary: 1  // 1% (Only Santino #01 and Helena #02)
};

// Points awarded when receiving duplicate stickers
export const DUPLICATE_POINTS: Record<StickerRarity, number> = {
  common: 5,     // +5 puntos
  rare: 10,      // +10 puntos
  epic: 25,      // +25 puntos
  legendary: 50  // +50 puntos
};

// User progression levels
export const USER_LEVELS: UserLevel[] = [
  { level: 1, name: 'Hincha Principiante', minPoints: 0, maxPoints: 99, badge: '🟢' },
  { level: 2, name: 'Suplente', minPoints: 100, maxPoints: 249, badge: '🔵' },
  { level: 3, name: 'Titular', minPoints: 250, maxPoints: 499, badge: '🟣' },
  { level: 4, name: 'Capitán', minPoints: 500, maxPoints: 999, badge: '🟡' },
  { level: 5, name: 'Campeón de América', minPoints: 1000, maxPoints: 1999, badge: '⭐' },
  { level: 6, name: 'Campeón del Mundo', minPoints: 2000, maxPoints: 3499, badge: '⭐⭐⭐' },
  { level: 7, name: 'Leyenda Scaloneta', minPoints: 3500, maxPoints: Infinity, badge: '🏆' }
];

// Max rewarded game matches per game per day
export const MAX_REWARDED_GAMES_PER_DAY = 3;

// Daily bonus streak rewards
export const DAILY_BONUS_REWARDS = [10, 15, 20, 25, 30]; // Day 1 to 5+
