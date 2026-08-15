import React from 'react';
import { ActiveSection, UserLevel } from '../types';
import { Shield, Sparkles, BookOpen, Package, Users, ArrowRight, Trophy, ChevronRight, Award, Star, Gamepad2, Flame } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { ScalonetaEmblem } from './ScalonetaEmblem';

interface AlbumCoverProps {
  onOpenAlbum: () => void;
  onOpenPackModal: () => void;
  unlockedCount: number;
  totalCount: number;
  percentage: number;
  points?: number;
  currentLevel?: UserLevel;
  streakDays?: number;
  isPackReady?: boolean;
  formattedCountdown?: string;
  setActiveSection: (sec: ActiveSection) => void;
}

export const AlbumCover: React.FC<AlbumCoverProps> = ({
  onOpenAlbum,
  onOpenPackModal,
  unlockedCount,
  totalCount,
  percentage,
  points = 0,
  currentLevel,
  streakDays = 1,
  isPackReady = true,
  formattedCountdown = '02:00:00',
  setActiveSection
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10 animate-in fade-in duration-300">
      {/* Top Banner Alert / Welcome */}
      <div className="bg-[#74ACDF]/20 border-2 border-[#74ACDF] rounded-3xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-[#003870] text-[#D4AF37] flex items-center justify-center shrink-0 shadow-md">
            <ScalonetaEmblem size="sm" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading text-base sm:text-lg font-black uppercase text-[#003870]">
                ÁLBUM OFICIAL DE FIGURITAS 2026
              </h2>
              {points > 0 && (
                <span className="hidden sm:inline-block bg-[#003870] text-[#FEF08A] text-[10px] font-black px-2 py-0.5 rounded-full">
                  ⭐ {points} PTS
                </span>
              )}
            </div>
            <p className="text-xs text-slate-700 font-medium">
              Abrí sobres cada 2 horas, sumá puntos en los minijuegos y completá las 44 figuritas de La Scaloneta.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            setActiveSection('sobres');
          }}
          className={`w-full sm:w-auto px-5 py-3 text-[#003870] font-heading text-xs font-black uppercase tracking-wider rounded-2xl shadow-md border-2 border-[#003870] flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0 ${
            isPackReady
              ? 'bg-[#D4AF37] hover:bg-[#c49f2b] active:scale-95 animate-pulse'
              : 'bg-white hover:bg-slate-50'
          }`}
        >
          <Package className="w-4 h-4 text-[#003870]" />
          <span>{isPackReady ? '¡Abrir Sobre Gratis!' : `Sobre en ${formattedCountdown}`}</span>
        </button>
      </div>

      {/* Main Bento Grid Hero Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Big Album Binder Cover (Bento Hero 7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl border-l-8 border-[#74ACDF] border-2 border-slate-200 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Header Subtitle */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-[10px] font-black tracking-widest uppercase bg-[#003870] text-white px-2.5 py-1 rounded-md">
                CENTRO DE ESTUDIANTES • LISTA OFICIAL
              </span>
              <div className="flex items-center gap-1 mt-2 text-[#D4AF37]">
                <Star className="w-4 h-4 fill-[#D4AF37]" />
                <Star className="w-4 h-4 fill-[#D4AF37]" />
                <Star className="w-4 h-4 fill-[#D4AF37]" />
                <span className="text-xs font-black text-[#003870] ml-1 uppercase">Edición Campeones</span>
              </div>
            </div>

            <div className="p-2 bg-slate-50 rounded-2xl border-2 border-[#003870] shadow-sm">
              <ScalonetaEmblem size="md" />
            </div>
          </div>

          {/* Album Title with Center Emblem Focus */}
          <div className="my-4 flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="shrink-0 p-3 bg-gradient-to-b from-[#74ACDF]/10 to-slate-50 rounded-3xl border-2 border-[#003870]/20 shadow-inner flex items-center justify-center">
              <ScalonetaEmblem size="lg" />
            </div>

            <div className="text-center sm:text-left">
              <span className="text-xs font-black text-[#74ACDF] uppercase tracking-widest">
                ÁLBUM OFICIAL
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#003870] italic leading-none mt-1">
                LA SCALONETA
              </h1>
              <p className="text-xs font-black text-[#003870] uppercase mt-1 tracking-wider">
                CENTRO DE ESTUDIANTES 2026
              </p>
              <div className="h-1.5 w-24 bg-[#74ACDF] my-2 rounded-full mx-auto sm:mx-0" />
              <p className="text-xs sm:text-sm text-slate-600 font-semibold max-w-md leading-relaxed">
                Completá el equipo. Conocé nuestras propuestas. Viví la campaña.
              </p>
            </div>
          </div>

          {/* Conducción Highlight Pills */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3">
              <span className="text-[9px] font-black text-[#74ACDF] uppercase">Presidente</span>
              <p className="font-heading text-sm font-black text-[#003870] uppercase">Santino Mondino</p>
              <span className="text-[10px] text-amber-700 font-bold flex items-center gap-0.5">
                <Star className="w-2.5 h-2.5 fill-current" /> Legendaria #01
              </span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3">
              <span className="text-[9px] font-black text-[#74ACDF] uppercase">Vicepresidenta</span>
              <p className="font-heading text-sm font-black text-[#003870] uppercase">Helena Vercellone</p>
              <span className="text-[10px] text-amber-700 font-bold flex items-center gap-0.5">
                <Star className="w-2.5 h-2.5 fill-current" /> Legendaria #02
              </span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenAlbum();
              }}
              className="py-4 px-6 bg-[#003870] hover:bg-[#002850] text-white font-heading text-sm font-black tracking-wider uppercase rounded-2xl shadow-lg border-2 border-[#D4AF37] flex items-center justify-center gap-2 transition-all transform active:scale-98 cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-[#D4AF37]" />
              <span>ABRIR ÁLBUM</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setActiveSection('juegos');
              }}
              className="py-4 px-6 bg-purple-700 hover:bg-purple-800 text-white font-heading text-sm font-black tracking-wider uppercase rounded-2xl shadow-lg border-2 border-purple-400 flex items-center justify-center gap-2 transition-all transform active:scale-98 cursor-pointer"
            >
              <Gamepad2 className="w-5 h-5 text-[#FEF08A]" />
              <span>MINIJUEGOS</span>
            </button>
          </div>
        </div>

        {/* Right Column: Bento Modules (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Module 1: Progress Tracker Card */}
          <div className="bg-white rounded-3xl shadow-xl border-r-8 border-[#74ACDF] border-2 border-slate-200 p-6 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-heading text-lg font-black uppercase text-[#003870] italic">
                ESTADO DEL ÁLBUM
              </h3>
              <span className="bg-[#74ACDF] text-white px-2 py-0.5 rounded-lg text-xs font-black border border-[#003870]/20">
                {unlockedCount} / {totalCount}
              </span>
            </div>

            <p className="text-xs text-slate-600 font-medium mb-3">
              {unlockedCount === totalCount
                ? '¡Felicitaciones! Completaste todas las figuritas del álbum.'
                : `Te faltan ${totalCount - unlockedCount} figuritas para completar la colección.`}
            </p>

            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-[#D4AF37] rounded-full transition-all duration-500"
                style={{ width: `${Math.max(percentage, 3)}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] font-black text-[#003870] mt-1.5 uppercase">
              <span>Progreso: {percentage}%</span>
              <span>Total: 44 Cartas</span>
            </div>
          </div>

          {/* Module 2: Quick Section Jump Bento Grid */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-slate-200 flex-1 flex flex-col justify-between">
            <h3 className="font-heading text-sm font-black uppercase text-[#003870] tracking-wide mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              ACCESOS RÁPIDOS
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveSection('sobres');
                }}
                className="p-3 bg-amber-50/50 hover:bg-amber-100/60 border border-amber-300 rounded-2xl text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-black text-amber-700 uppercase">2 Horas</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#003870]" />
                </div>
                <p className="font-heading text-xs font-black text-[#003870] uppercase">Abrir Sobres</p>
                <span className="text-[10px] text-slate-500 font-semibold">3 Figuritas</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveSection('juegos');
                }}
                className="p-3 bg-purple-50/50 hover:bg-purple-100/60 border border-purple-300 rounded-2xl text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-black text-purple-700 uppercase">Ganá Puntos</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#003870]" />
                </div>
                <p className="font-heading text-xs font-black text-[#003870] uppercase">Minijuegos</p>
                <span className="text-[10px] text-slate-500 font-semibold">5 Juegos</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveSection('propuestas');
                }}
                className="p-3 bg-slate-50 hover:bg-[#74ACDF]/10 border border-slate-200 hover:border-[#74ACDF] rounded-2xl text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-black text-[#74ACDF] uppercase">Pág. 03</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#003870]" />
                </div>
                <p className="font-heading text-xs font-black text-[#003870] uppercase">Propuestas</p>
                <span className="text-[10px] text-slate-500 font-semibold">29 Proyectos</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveSection('perfil');
                }}
                className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-black text-emerald-700 uppercase">Estadísticas</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#003870]" />
                </div>
                <p className="font-heading text-xs font-black text-[#003870] uppercase">Mi Perfil</p>
                <span className="text-[10px] text-slate-500 font-semibold">Racha y Logros</span>
              </button>
            </div>

            {/* Info notice bar */}
            <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-2.5">
              <div className="bg-[#74ACDF] w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0">
                i
              </div>
              <p className="text-[10px] text-slate-600 font-medium leading-tight">
                Podés ingresar todos los días para mantener tu racha y conseguir cartas legendarias.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
