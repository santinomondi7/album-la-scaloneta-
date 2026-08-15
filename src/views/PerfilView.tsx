import React, { useState } from 'react';
import { UserLevel, Achievement } from '../types';
import { ACHIEVEMENTS_LIST } from '../data/achievementsData';
import { soundManager } from '../utils/audio';
import { useAuth } from '../context/AuthContext';
import { EditProfileModal } from '../components/EditProfileModal';
import {
  Trophy,
  Flame,
  Star,
  Award,
  BookOpen,
  Package,
  Gamepad2,
  ChevronLeft,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Cloud,
  CloudCheck,
  UserCheck,
  Edit3,
  LogOut
} from 'lucide-react';

interface PerfilViewProps {
  onBack: () => void;
  onNavigateToLogros: () => void;
  onNavigateToAlbum: () => void;
  points: number;
  currentLevel: UserLevel;
  nextLevel?: UserLevel;
  levelProgressPercentage: number;
  isDailyBonusReady: boolean;
  streakDays: number;
  claimDailyBonus: () => void;
  unlockedCount: number;
  totalCount: number;
  totalDuplicates: number;
  packsOpenedCount: number;
  gamesPlayedCount: number;
  penaltyGoalsCount: number;
  unlockedAchievements: string[];
  onResetProgress: () => void;
}

export const PerfilView: React.FC<PerfilViewProps> = ({
  onBack,
  onNavigateToLogros,
  onNavigateToAlbum,
  points,
  currentLevel,
  nextLevel,
  levelProgressPercentage,
  isDailyBonusReady,
  streakDays,
  claimDailyBonus,
  unlockedCount,
  totalCount,
  totalDuplicates,
  packsOpenedCount,
  gamesPlayedCount,
  penaltyGoalsCount,
  unlockedAchievements,
  onResetProgress
}) => {
  const { userProfile, syncStatus, isSaving, logOut } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  const percentage = Math.round((unlockedCount / totalCount) * 100);

  const handleCopyId = () => {
    if (userProfile?.collectorId) {
      navigator.clipboard.writeText(userProfile.collectorId);
      setCopiedId(true);
      soundManager.playSuccess();
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="flex items-center gap-1.5 text-xs font-heading font-black uppercase text-[#003870] hover:text-[#002244] bg-white border border-slate-200 shadow-sm px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Volver al Menú</span>
        </button>

        {/* Cloud Sync Indicator */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-600 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] text-slate-500 uppercase tracking-wider">
            {isSaving ? 'Guardando en la nube...' : 'Firestore Conectado ☁️'}
          </span>
        </div>
      </div>

      {/* User Identity & Collector ID Card */}
      {userProfile && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200 shadow-md mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl shadow-sm shrink-0">
              {userProfile.avatarEmoji || '⚽'}
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                <h2 className="font-heading text-xl font-black uppercase text-[#003870]">
                  {userProfile.displayName || 'Coleccionista'}
                </h2>
                {userProfile.schoolCourse && (
                  <span className="text-[11px] font-black text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full uppercase">
                    {userProfile.schoolCourse}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1 justify-center sm:justify-start">
                <span className="text-xs text-slate-500 font-semibold">ID Coleccionista:</span>
                <button
                  onClick={handleCopyId}
                  className="inline-flex items-center gap-1 font-mono font-black text-xs text-[#003870] bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  title="Copiar ID"
                >
                  <span>{userProfile.collectorId}</span>
                  {copiedId ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-400" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playClick();
                setIsEditModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#003870] text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editar Perfil</span>
            </button>

            {!userProfile.isAnonymous && (
              <button
                onClick={() => {
                  if (window.confirm('¿Deseas cerrar sesión?')) {
                    logOut();
                  }
                }}
                className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                title="Cerrar Sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Hero Level & Points Card */}
      <div className="bg-gradient-to-r from-[#003870] via-[#002850] to-[#001830] rounded-3xl p-6 sm:p-8 text-white border-4 border-[#D4AF37] shadow-2xl mb-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            {/* Level Badge Circle */}
            <div className="w-20 h-20 rounded-2xl bg-[#D4AF37] border-4 border-white shadow-xl flex items-center justify-center text-4xl shrink-0">
              {currentLevel.badge}
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-sky-200 text-[11px] font-black uppercase tracking-wider mb-1">
                <span>Nivel {currentLevel.level}</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-white">
                {currentLevel.name}
              </h1>
              <p className="text-xs text-sky-100 font-medium">
                {nextLevel
                  ? `Faltan ${nextLevel.minPoints - points} puntos para ${nextLevel.name}`
                  : '¡Alcanzaste el rango máximo de la hinchada!'}
              </p>
            </div>
          </div>

          {/* Points Pill */}
          <div className="bg-white/10 border-2 border-[#D4AF37] rounded-2xl p-4 text-center sm:text-right min-w-[140px]">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#74ACDF]">
              TOTAL PUNTOS
            </span>
            <p className="font-heading text-2xl sm:text-3xl font-black text-[#FEF08A] flex items-center justify-center sm:justify-end gap-1">
              <Star className="w-5 h-5 fill-[#FEF08A]" />
              <span>{points}</span>
            </p>
          </div>
        </div>

        {/* Level Progress Bar */}
        {nextLevel && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex justify-between text-xs font-bold text-sky-200 mb-1.5">
              <span>{currentLevel.name} ({currentLevel.minPoints} pts)</span>
              <span>{levelProgressPercentage}%</span>
              <span>{nextLevel.name} ({nextLevel.minPoints} pts)</span>
            </div>
            <div className="w-full bg-black/40 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/20">
              <div
                className="bg-gradient-to-r from-[#74ACDF] to-[#FEF08A] h-full rounded-full transition-all duration-500"
                style={{ width: `${levelProgressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Daily Bonus & Streak Card */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-3xl shrink-0">
            🔥
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading text-lg font-black uppercase text-[#003870]">
                Racha Diaria: {streakDays} {streakDays === 1 ? 'Día' : 'Días'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-semibold">
              Reclamá tu bonus cada 24 horas para multiplicar tus puntos diarios.
            </p>
          </div>
        </div>

        <button
          onClick={claimDailyBonus}
          disabled={!isDailyBonusReady}
          className={`px-6 py-3.5 rounded-2xl font-heading text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
            isDailyBonusReady
              ? 'bg-[#003870] hover:bg-[#002850] text-white shadow-lg animate-bounce active:scale-95'
              : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
          }`}
        >
          {isDailyBonusReady ? '¡Reclamar Bonus Diario! ✨' : 'Bonus Reclamado (Vuelve mañana)'}
        </button>
      </div>

      {/* Bento Grid Stats */}
      <h2 className="font-heading text-sm font-black uppercase text-slate-400 tracking-wider mb-3 px-1">
        Tus Estadísticas
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {/* Stat 1: Album Progress */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
            <BookOpen className="w-4 h-4 text-[#003870]" />
            <span>Álbum</span>
          </div>
          <p className="font-heading text-xl font-black text-[#003870]">
            {unlockedCount} / {totalCount}
          </p>
          <p className="text-[11px] text-slate-500 font-semibold">
            {percentage}% Completado
          </p>
        </div>

        {/* Stat 2: Repetidas */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
            <RefreshCw className="w-4 h-4 text-amber-600" />
            <span>Repetidas</span>
          </div>
          <p className="font-heading text-xl font-black text-amber-600">
            {totalDuplicates}
          </p>
          <p className="text-[11px] text-slate-500 font-semibold">
            Convertidas en Puntos
          </p>
        </div>

        {/* Stat 3: Sobres Abiertos */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
            <Package className="w-4 h-4 text-sky-600" />
            <span>Sobres</span>
          </div>
          <p className="font-heading text-xl font-black text-[#003870]">
            {packsOpenedCount}
          </p>
          <p className="text-[11px] text-slate-500 font-semibold">
            Sobres Abiertos
          </p>
        </div>

        {/* Stat 4: Minijuegos */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
            <Gamepad2 className="w-4 h-4 text-purple-600" />
            <span>Partidas</span>
          </div>
          <p className="font-heading text-xl font-black text-[#003870]">
            {gamesPlayedCount}
          </p>
          <p className="text-[11px] text-slate-500 font-semibold">
            Minijuegos Jugados
          </p>
        </div>

        {/* Stat 5: Goles */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Goles Penales</span>
          </div>
          <p className="font-heading text-xl font-black text-[#003870]">
            {penaltyGoalsCount}
          </p>
          <p className="text-[11px] text-slate-500 font-semibold">
            Goles Marcados
          </p>
        </div>

        {/* Stat 6: Logros */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
            <Trophy className="w-4 h-4 text-[#D4AF37]" />
            <span>Logros</span>
          </div>
          <p className="font-heading text-xl font-black text-[#003870]">
            {unlockedAchievements.length} / {ACHIEVEMENTS_LIST.length}
          </p>
          <p className="text-[11px] text-slate-500 font-semibold">
            Trofeos Desbloqueados
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        <button
          onClick={() => {
            soundManager.playClick();
            onNavigateToLogros();
          }}
          className="p-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 flex items-center justify-between shadow-sm transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-heading text-sm font-black uppercase text-[#003870]">
                Ver Galería de Logros
              </p>
              <p className="text-xs text-slate-500">
                {unlockedAchievements.length} de {ACHIEVEMENTS_LIST.length} conseguidos
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#003870] transition-colors" />
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            onNavigateToAlbum();
          }}
          className="p-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 flex items-center justify-between shadow-sm transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-heading text-sm font-black uppercase text-[#003870]">
                Ver Mi Álbum Completo
              </p>
              <p className="text-xs text-slate-500">
                Revisar figuritas y propuestas
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#003870] transition-colors" />
        </button>
      </div>

      {/* Reset Progress Danger Zone */}
      <div className="pt-6 border-t border-slate-200 text-center">
        <button
          onClick={() => {
            if (window.confirm('¿Estás seguro de que querés reiniciar tu progreso? Se borrarán tus figuritas y puntos en la nube y en este dispositivo.')) {
              onResetProgress();
            }
          }}
          className="text-xs text-rose-600 hover:text-rose-800 font-bold underline cursor-pointer"
        >
          Reiniciar mi progreso (comenzar desde 0)
        </button>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};

