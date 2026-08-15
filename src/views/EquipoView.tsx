import React from 'react';
import { ALL_STICKERS } from '../data/albumData';
import { Sticker, ActiveSection } from '../types';
import { StickerCard } from '../components/StickerCard';
import { ArrowLeft, Star, Users, Trophy } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface EquipoViewProps {
  onBack: () => void;
  isUnlocked: (id: string) => boolean;
  duplicateCounts?: Record<string, number>;
  onSelectSticker: (sticker: Sticker) => void;
  setActiveSection: (sec: ActiveSection) => void;
}

export const EquipoView: React.FC<EquipoViewProps> = ({
  onBack,
  isUnlocked,
  duplicateCounts = {},
  onSelectSticker,
  setActiveSection
}) => {
  // Presidente & Vice (Legendarias)
  const presidente = ALL_STICKERS.find(s => s.id === 'st-01')!;
  const vicepresidenta = ALL_STICKERS.find(s => s.id === 'st-02')!;

  // Other team members (03 to 14 - Épicas)
  const teamMembers = ALL_STICKERS.filter(
    s => s.type === 'player' && s.id !== 'st-01' && s.id !== 'st-02'
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Top Breadcrumb / Back Button */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-[#003870] border border-slate-300 shadow-sm transition-colors text-xs font-black uppercase tracking-wider cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>VOLVER AL MENÚ</span>
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            setActiveSection('secretarias');
          }}
          className="text-xs font-black uppercase text-[#003870] hover:text-[#74ACDF] underline underline-offset-4 cursor-pointer"
        >
          Ver por Secretarías →
        </button>
      </div>

      {/* Page Title & Bento Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-l-8 border-[#74ACDF] border-2 border-slate-200 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-black text-white bg-[#003870] px-2.5 py-1 rounded-md uppercase tracking-wider">
              PLANTILLA OFICIAL 2026
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl font-black uppercase text-[#003870] italic tracking-tight mt-2">
              EL EQUIPO
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mt-1 font-semibold leading-relaxed">
              Conocé a los 14 integrantes de La Scaloneta. Las figuritas bloqueadas se descubren y consiguen abriendo sobres.
            </p>
          </div>
          <span className="text-xs font-black text-slate-400">PÁG. 01</span>
        </div>
      </div>

      {/* SPECIAL DUO: PRESIDENTE Y VICEPRESIDENTA (LEGENDARIAS) */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg bg-[#D4AF37] text-[#003870]">
              <Trophy className="w-4 h-4" />
            </div>
            <h2 className="font-heading text-base sm:text-lg font-black uppercase text-[#003870] tracking-wide">
              CONDUCCIÓN PRINCIPAL • FIGURITAS LEGENDARIAS
            </h2>
          </div>
          <span className="text-xs font-bold text-[#D4AF37] uppercase">⭐⭐⭐</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* PRESIDENTE */}
          <div className="bg-white p-5 rounded-3xl border-2 border-[#D4AF37] shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black uppercase text-[#003870] bg-[#D4AF37] px-2 py-0.5 rounded flex items-center gap-1">
                <Star className="w-2.5 h-2.5 fill-[#003870]" /> LEGENDARIA #01
              </span>
              <span className="font-heading text-xs font-black text-[#003870]">PRESIDENTE</span>
            </div>

            <div className="w-full max-w-[240px] mx-auto py-2">
              <StickerCard
                sticker={presidente}
                isUnlocked={isUnlocked(presidente.id)}
                duplicateCount={duplicateCounts[presidente.id] || (isUnlocked(presidente.id) ? 1 : 0)}
                onSelect={onSelectSticker}
              />
            </div>
          </div>

          {/* VICEPRESIDENTA */}
          <div className="bg-white p-5 rounded-3xl border-2 border-[#D4AF37] shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black uppercase text-[#003870] bg-[#D4AF37] px-2 py-0.5 rounded flex items-center gap-1">
                <Star className="w-2.5 h-2.5 fill-[#003870]" /> LEGENDARIA #02
              </span>
              <span className="font-heading text-xs font-black text-[#003870]">VICEPRESIDENTA</span>
            </div>

            <div className="w-full max-w-[240px] mx-auto py-2">
              <StickerCard
                sticker={vicepresidenta}
                isUnlocked={isUnlocked(vicepresidenta.id)}
                duplicateCount={duplicateCounts[vicepresidenta.id] || (isUnlocked(vicepresidenta.id) ? 1 : 0)}
                onSelect={onSelectSticker}
              />
            </div>
          </div>
        </div>
      </div>

      {/* TEAM MEMBERS GRID (ÉPICAS) */}
      <div>
        <div className="flex items-center justify-between mb-4 border-t border-slate-200 pt-6">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg bg-purple-600 text-white">
              <Users className="w-4 h-4" />
            </div>
            <h2 className="font-heading text-base sm:text-lg font-black uppercase text-[#003870] tracking-wide">
              INTEGRANTES DE SECRETARÍAS • FIGURITAS ÉPICAS
            </h2>
          </div>
          <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full uppercase">
            12 INTEGRANTES
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {teamMembers.map(sticker => (
            <StickerCard
              key={sticker.id}
              sticker={sticker}
              isUnlocked={isUnlocked(sticker.id)}
              duplicateCount={duplicateCounts[sticker.id] || (isUnlocked(sticker.id) ? 1 : 0)}
              onSelect={onSelectSticker}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
