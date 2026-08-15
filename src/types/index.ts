export type StickerType = 'player' | 'secretaria' | 'propuesta' | 'especial';
export type StickerRarity = 'common' | 'rare' | 'epic' | 'legendary';

export type PitchPosition = 
  | 'DT / Capitán'
  | 'Subcapitana / Mediocampo'
  | 'Ataque y Difusión'
  | 'Defensa y Estrategia'
  | 'Mediocampo Creativo'
  | 'Enganche y Cultura'
  | 'Arquera / Bloque Central'
  | 'Líbero y Organización'
  | 'Lateral de Recreación'
  | 'Especial';

export interface Sticker {
  id: string;
  number: number; // #01, #02...
  type: StickerType;
  rarity: StickerRarity; // 'common' | 'rare' | 'epic' | 'legendary'
  title: string; // e.g. "Santino Mondino" or "Calculadoras a disposición"
  subtitle?: string; // e.g. "Presidente" or "Educación y Apoyo"
  role?: string; // e.g. "Presidente", "Vicepresidenta", "Secretaria de Prensa y Difusión"
  category?: string; // e.g. "Educación y Apoyo Académico", "Deportes y Recreaciones"
  description: string;
  whatWeSeek?: string; // "¿Qué buscamos?" description
  position?: string; // Posición en la cancha
  image?: string; // e.g. "/images/players/santino-mondino.jpg"
  imagePlaceholder?: string;
  customPhotoUrl?: string; // User-uploaded/editable photo
  isSpecial?: boolean;
  specialType?: 'gold' | 'hologram' | 'silver';
  secretariaName?: string;
  members?: string[];
  numberTag?: string; // e.g. "10", "01", "07"
  tags?: string[];
  quote?: string;
  details?: string;
}

export interface SecretariaGroup {
  id: string;
  name: string;
  shortName: string;
  iconName: string;
  members: {
    name: string;
    role: string;
    stickerNumber: number;
    position: string;
    photoPlaceholder?: string;
  }[];
  description: string;
  color: string;
}

export type ActiveSection = 
  | 'portada' 
  | 'menu' 
  | 'equipo' 
  | 'secretarias' 
  | 'propuestas' 
  | 'especiales' 
  | 'sobres'
  | 'juegos'
  | 'mialbum'
  | 'perfil'
  | 'logros';

export type UserLevel = {
  level: number;
  name: string;
  minPoints: number;
  maxPoints: number;
  badge: string;
};

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'sobres' | 'juegos' | 'coleccion' | 'puntos' | 'racha';
  pointsReward: number;
  requiredCount: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  difficulty: 'facil' | 'medio' | 'dificil';
  category?: string;
  funFact?: string;
}

export interface PlayerGuessItem {
  id: string;
  playerName: string;
  clues: [string, string, string];
  options: string[];
  correctIndex: number;
  position: string;
  era: string;
}

export interface RapidQuestion {
  id: string;
  question: string;
  options: [string, string];
  correctIndex: number;
}

export interface MemoryCardItem {
  id: string;
  symbol: string;
  label: string;
}

export interface ToastNotification {
  id: string;
  type: 'points' | 'achievement' | 'legendary' | 'bonus';
  title: string;
  subtitle?: string;
}

export interface PackHistoryCard {
  id: string;
  number: number;
  title: string;
  rarity: StickerRarity;
  isDuplicate: boolean;
  pointsEarned: number;
}

export interface PackHistoryEntry {
  id: string;
  packNumber: number;
  timestamp: number;
  timeFormatted: string; // e.g. "Hoy — 13:42"
  cards: PackHistoryCard[];
  summary: string; // e.g. "1 común, 1 rara, 1 épica"
}

export interface UserProfile {
  id: string;
  collectorId: string;
  displayName: string;
  schoolCourse?: string;
  avatarEmoji?: string;
  email?: string | null;
  isAnonymous?: boolean;
  points: number;
  unlockedIds: string[];
  duplicateCounts: Record<string, number>;
  lastPackTime: number;
  lastDailyBonusTime: number;
  streakDays: number;
  packsOpenedCount: number;
  gamesPlayedCount: number;
  penaltyGoalsCount: number;
  dailyGamesRecord: Record<string, Record<string, number>>;
  unlockedAchievements: string[];
  customDescriptions: Record<string, string>;
  packHistory: PackHistoryEntry[];
  hasCelebrated: boolean;
  createdAt: string;
  updatedAt: string;
}

