import React from 'react';
import { ActiveSection, UserLevel } from '../types';
import { Users, Briefcase, Sparkles, Star, BookOpen, Share2, Package, ArrowRight, Shield, Trophy, Gamepad2, User, Clock, Flame } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface MenuViewProps {
  setActiveSection: (sec: ActiveSection) => void;
  unlockedCount: number;
  totalCount: number;
  percentage: number;
  points: number;
  currentLevel: UserLevel;
  streakDays: number;
  isPackReady: boolean;
  formattedCountdown: string;
  onOpenShareModal: () => void;
}

export const MenuView: React.FC<MenuViewProps> = ({
  setActiveSection,
  unlockedCount,
  totalCount,
  percentage,
  points,
  currentLevel,
  streakDays,
  isPackReady,
  formattedCountdown,
  onOpenShareModal
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 animate-in fade-in duration-300">
      {/* Title & Slogan Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#003870] text-white text-xs font-black uppercase tracking-wider mb-2 shadow-sm">
          <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>CENTRO DE ESTUDIANTES 2026</span>
          <span className="text-[#D4AF37]">⭐⭐⭐</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-black uppercase text-[#003870] italic tracking-tight">
          ÁLBUM LA SCALONETA
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mt-1 font-semibold">
          Abrí sobres cada 2 horas, sumá puntos en los minijuegos y descubrí todas las propuestas de la lista.
        </p>
      </div>

      {/* Bento Spotlight: Sobres & Gamification Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Card 1: Abrir Sobre (Large Spotlight) */}
        <div
          onClick={() => {
            soundManager.playClick();
            setActiveSection('sobres');
          }}
          className={`md:col-span-2 rounded-3xl p-6 shadow-xl border-4 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden group transform hover:-translate-y-1 ${
            isPackReady
              ? 'bg-gradient-to-br from-[#003870] via-[#002850] to-[#001830] border-[#D4AF37] text-white'
              : 'bg-white border-slate-200 text-[#003870]'
          }`}
        >
          {isPackReady && (
            <div className="absolute inset-0 holo-foil opacity-20 pointer-events-none" />
          )}

          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="flex items-center gap-3">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md ${
                  isPackReady
                    ? 'bg-[#D4AF37] text-[#003870] border-2 border-[#003870]'
                    : 'bg-sky-100 text-[#003870]'
                }`}
              >
                <Package className="w-7 h-7" />
              </div>
              <div>
                <span
                  className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isPackReady
                      ? 'bg-emerald-500 text-white animate-pulse'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isPackReady ? '🟢 ¡SOBRE LISTO!' : '⏳ CADA 2 HORAS'}
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-black uppercase italic tracking-tight mt-1">
                  ABRIR SOBRE DE FIGURITAS
                </h2>
              </div>
            </div>

            {/* Countdown / Ready pill */}
            <div className="text-right">
              {isPackReady ? (
                <span className="bg-[#FEF08A] text-[#003870] text-xs font-black px-3 py-1.5 rounded-xl uppercase shadow-md inline-block">
                  ¡ABRIR AHORA!
                </span>
              ) : (
                <div className="bg-slate-100 border border-slate-300 px-3 py-1.5 rounded-xl text-center">
                  <span className="text-[9px] font-black text-slate-400 uppercase block">
                    PRÓXIMO EN
                  </span>
                  <span className="font-heading text-sm font-black text-[#003870]">
                    {formattedCountdown}
                  </span>
                </div>
              )}
            </div>
          </div>

          <p
            className={`text-xs font-medium max-w-md relative z-10 leading-relaxed mb-4 ${
              isPackReady ? 'text-sky-100' : 'text-slate-600'
            }`}
          >
            {isPackReady
              ? '¡Tenés 3 figuritas esperándote! Podés sacar cartas legendarias doradas o sumar puntos por repetidas.'
              : 'El sobre se recarga automáticamente. Mientras tanto, ¡ganá puntos compitiendo en los Minijuegos!'}
          </p>

          <div
            className={`pt-3 border-t flex items-center justify-between text-xs font-black uppercase tracking-wider relative z-10 ${
              isPackReady
                ? 'border-white/20 text-[#FEF08A]'
                : 'border-slate-100 text-[#003870]'
            }`}
          >
            <span>Ir a la sala de sobres</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: User Status & Level */}
        <div
          onClick={() => {
            soundManager.playClick();
            setActiveSection('perfil');
          }}
          className="bg-white rounded-3xl p-6 shadow-xl border-2 border-slate-200 hover:border-[#74ACDF] transition-all cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1"
        >
          <div>
            <div className="flex justify-between items-center mb-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-2xl">
                {currentLevel.badge}
              </div>
              <div className="flex items-center gap-1 bg-[#FEF08A] text-[#003870] px-2.5 py-1 rounded-xl text-xs font-black">
                <Star className="w-3.5 h-3.5 fill-[#003870]" />
                <span>{points} pts</span>
              </div>
            </div>

            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
              Nivel de Hinchada
            </span>
            <h3 className="font-heading text-lg font-black uppercase text-[#003870]">
              {currentLevel.name}
            </h3>

            <div className="flex items-center gap-1.5 text-xs text-amber-700 font-bold mt-2 bg-amber-50 px-2.5 py-1 rounded-lg">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Racha: {streakDays} {streakDays === 1 ? 'día' : 'días'}</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-[#003870] group-hover:text-[#74ACDF] uppercase">
            <span>Ver Mi Perfil</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Main Bento Grid Sections (8 Cards) */}
      <h2 className="font-heading text-xs font-black uppercase text-slate-400 tracking-wider mb-3 px-1">
        Explorar el Álbum y Actividades
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* 1. Minijuegos */}
        <div
          onClick={() => {
            soundManager.playClick();
            setActiveSection('juegos');
          }}
          className="bg-white rounded-3xl p-5 shadow-lg border-2 border-purple-200 hover:border-purple-500 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-purple-600 text-white">
              5 Juegos
            </span>
          </div>
          <div>
            <h3 className="font-heading text-base font-black uppercase text-[#003870] group-hover:text-purple-700 transition-colors">
              MINIJUEGOS
            </h3>
            <p className="text-xs text-slate-600 mt-1 line-clamp-2 font-medium">
              Quiz de la Selección, Penales, Adiviná el Jugador y Memoria.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-purple-700 uppercase">
            <span>Jugar Ahora</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 2. El Equipo */}
        <div
          onClick={() => {
            soundManager.playClick();
            setActiveSection('equipo');
          }}
          className="bg-white rounded-3xl p-5 shadow-lg border-2 border-slate-200 hover:border-[#74ACDF] hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="w-12 h-12 rounded-2xl bg-[#003870] text-[#74ACDF] flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#74ACDF] text-white">
              PÁG. 01
            </span>
          </div>
          <div>
            <h3 className="font-heading text-base font-black uppercase text-[#003870] group-hover:text-[#74ACDF] transition-colors">
              EL EQUIPO
            </h3>
            <p className="text-xs text-slate-600 mt-1 line-clamp-2 font-medium">
              Presidente, Vicepresidenta y plantel completo de La Scaloneta.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-[#003870] uppercase">
            <span>Ver Plantel</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 3. Las Secretarías */}
        <div
          onClick={() => {
            soundManager.playClick();
            setActiveSection('secretarias');
          }}
          className="bg-white rounded-3xl p-5 shadow-lg border-2 border-slate-200 hover:border-[#003870] hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="w-12 h-12 rounded-2xl bg-[#003870] text-white flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#003870] text-white">
              PÁG. 02
            </span>
          </div>
          <div>
            <h3 className="font-heading text-base font-black uppercase text-[#003870] group-hover:text-[#74ACDF] transition-colors">
              SECRETARÍAS
            </h3>
            <p className="text-xs text-slate-600 mt-1 line-clamp-2 font-medium">
              Prensa, Deportes, Finanzas, Actas, Cultura y Recreación.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-[#003870] uppercase">
            <span>Ver Secretarías</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 4. Propuestas */}
        <div
          onClick={() => {
            soundManager.playClick();
            setActiveSection('propuestas');
          }}
          className="bg-white rounded-3xl p-5 shadow-lg border-2 border-slate-200 hover:border-[#D4AF37] hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#003870] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#D4AF37] text-[#003870]">
              29 Iniciativas
            </span>
          </div>
          <div>
            <h3 className="font-heading text-base font-black uppercase text-[#003870] group-hover:text-[#D4AF37] transition-colors">
              PROPUESTAS
            </h3>
            <p className="text-xs text-slate-600 mt-1 line-clamp-2 font-medium">
              Educación, Eventos, Deportes, Infraestructura y Cantina.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-[#003870] uppercase">
            <span>Ver Proyectos</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 5. Especiales */}
        <div
          onClick={() => {
            soundManager.playClick();
            setActiveSection('especiales');
          }}
          className="bg-white rounded-3xl p-5 shadow-lg border-2 border-slate-200 hover:border-[#D4AF37] hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FEF08A] to-[#D4AF37] text-[#003870] flex items-center justify-center">
              <Star className="w-6 h-6 fill-[#003870]" />
            </div>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#FEF08A] text-[#003870]">
              PÁG. 04
            </span>
          </div>
          <div>
            <h3 className="font-heading text-base font-black uppercase text-[#003870] group-hover:text-[#D4AF37] transition-colors">
              ESPECIALES
            </h3>
            <p className="text-xs text-slate-600 mt-1 line-clamp-2 font-medium">
              Figuritas holográficas doradas y cartas coleccionables.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-[#003870] uppercase">
            <span>Ver Holográficas</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 6. Mi Álbum */}
        <div
          onClick={() => {
            soundManager.playClick();
            setActiveSection('mialbum');
          }}
          className="bg-white rounded-3xl p-5 shadow-lg border-2 border-slate-200 hover:border-[#74ACDF] hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-[#003870] flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#74ACDF] text-white">
              {unlockedCount}/{totalCount}
            </span>
          </div>
          <div>
            <h3 className="font-heading text-base font-black uppercase text-[#003870] group-hover:text-[#74ACDF] transition-colors">
              MI COLECCIÓN
            </h3>
            <p className="text-xs text-slate-600 mt-1 line-clamp-2 font-medium">
              Tablero completo con todas las figuritas #00 a #43.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-[#003870] uppercase">
            <span>Ver Mi Álbum</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 7. Logros */}
        <div
          onClick={() => {
            soundManager.playClick();
            setActiveSection('logros');
          }}
          className="bg-white rounded-3xl p-5 shadow-lg border-2 border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#FEF08A] text-[#003870]">
              15 Trofeos
            </span>
          </div>
          <div>
            <h3 className="font-heading text-base font-black uppercase text-[#003870] group-hover:text-amber-700 transition-colors">
              LOGROS
            </h3>
            <p className="text-xs text-slate-600 mt-1 line-clamp-2 font-medium">
              Desbloqueá insignias y sumá recompensas virtuales.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-[#003870] uppercase">
            <span>Ver Trofeos</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 8. Compartir */}
        <div
          onClick={() => {
            soundManager.playClick();
            onOpenShareModal();
          }}
          className="bg-white rounded-3xl p-5 shadow-lg border-2 border-emerald-200 hover:border-emerald-500 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Share2 className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-600 text-white">
              Instagram / QR
            </span>
          </div>
          <div>
            <h3 className="font-heading text-base font-black uppercase text-[#003870] group-hover:text-emerald-700 transition-colors">
              COMPARTIR
            </h3>
            <p className="text-xs text-slate-600 mt-1 line-clamp-2 font-medium">
              Descargá historias para Instagram o escaneá con QR.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-emerald-700 uppercase">
            <span>Compartir</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
