import React from 'react';
import { Sticker } from '../types';
import { Lock, Star, Check, BookOpen } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { StickerSymbol } from './StickerSymbol';

interface StickerCardProps {
  sticker: Sticker;
  isUnlocked: boolean;
  duplicateCount?: number;
  onSelect: (sticker: Sticker) => void;
  compact?: boolean;
}

export const StickerCard: React.FC<StickerCardProps> = ({
  sticker,
  isUnlocked,
  duplicateCount = 1,
  onSelect,
  compact = false
}) => {
  const isLegendary = sticker.rarity === 'legendary';
  const isEpic = sticker.rarity === 'epic';
  const isRare = sticker.rarity === 'rare';
  const isProposal = sticker.type === 'propuesta';

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playCardFlip();
    onSelect(sticker);
  };

  // -------------------------------------------------------------
  // 1. UNLOCKED STATE CARD (CONSEGUIDA / REPETIDA)
  // -------------------------------------------------------------
  if (isUnlocked) {
    return (
      <div
        onClick={handleClick}
        className={`group relative bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex flex-col h-full ${
          isLegendary
            ? 'border-3 border-[#D4AF37] shadow-lg ring-2 ring-[#D4AF37]/50'
            : isEpic
            ? 'border-2 border-purple-500 shadow-md ring-1 ring-purple-300'
            : isRare
            ? 'border-2 border-[#74ACDF] shadow-md'
            : 'border-2 border-slate-300 shadow-sm'
        }`}
      >
        {/* Holographic foil sheen for Legendary cards */}
        {isLegendary && (
          <div className="absolute inset-0 holo-foil opacity-35 pointer-events-none z-20" />
        )}

        {/* Card Header Bar */}
        <div
          className={`px-2.5 py-1.5 flex items-center justify-between text-white ${
            isLegendary
              ? 'bg-gradient-to-r from-[#003870] via-[#002244] to-[#003870]'
              : isEpic
              ? 'bg-gradient-to-r from-purple-800 to-indigo-900'
              : isRare
              ? 'bg-[#003870]'
              : 'bg-slate-700'
          }`}
        >
          <span className="font-heading text-xs font-black tracking-wider text-white">
            #{sticker.number.toString().padStart(2, '0')}
          </span>

          <div className="flex items-center gap-1">
            {/* Multiplier for Duplicates (x2, x3, x4...) */}
            {duplicateCount > 1 && (
              <span className="bg-[#FEF08A] text-[#003870] text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase shadow-xs">
                x{duplicateCount}
              </span>
            )}

            {/* Rarity Badges */}
            {isLegendary ? (
              <span className="bg-[#D4AF37] text-[#003870] text-[8px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs uppercase tracking-wider">
                <Star className="w-2.5 h-2.5 fill-[#003870]" /> LEGENDARIA
              </span>
            ) : isEpic ? (
              <span className="bg-purple-200 text-purple-950 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                ÉPICA
              </span>
            ) : isRare ? (
              <span className="bg-sky-200 text-sky-950 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                RARA
              </span>
            ) : (
              <span className="bg-slate-200 text-slate-800 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                COMÚN
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        {isProposal ? (
          /* Propuesta Card: Sin símbolo, solo nombre y breve explicación clara */
          <div className="p-3.5 flex-1 flex flex-col justify-between bg-gradient-to-b from-sky-50/70 via-white to-sky-50/40 text-center">
            <div className="my-auto py-2">
              <span className="inline-block text-[9px] font-black uppercase text-sky-800 bg-sky-100/90 px-2 py-0.5 rounded-md border border-sky-200 mb-2">
                {sticker.category || 'Propuesta'}
              </span>

              <h4 className="font-heading text-xs sm:text-sm font-black text-[#003870] uppercase leading-snug line-clamp-3 mb-2">
                {sticker.title}
              </h4>

              <p className="text-[11px] text-slate-600 font-medium leading-relaxed line-clamp-4 px-1">
                {sticker.whatWeSeek || sticker.description}
              </p>
            </div>
          </div>
        ) : (
          /* Integrantes / Escudo: Insignia vectorial legible y distintiva */
          <div className="p-2.5 flex-1 flex flex-col justify-between bg-slate-50 relative">
            <div className="flex flex-col items-center justify-center my-auto w-full">
              <StickerSymbol
                stickerNumber={sticker.number}
                rarity={sticker.rarity}
                size="md"
                isUnlocked={isUnlocked}
              />

              <div className="text-[10px] font-black text-[#003870] uppercase tracking-wider line-clamp-1 mt-1 text-center">
                {sticker.role || sticker.position || sticker.category}
              </div>
            </div>
          </div>
        )}

        {/* Footer info strip */}
        <div
          className={`p-2 text-center text-white ${
            isLegendary ? 'bg-[#002850]' : isEpic ? 'bg-purple-950' : 'bg-[#003870]'
          }`}
        >
          <p className="text-[9px] font-bold text-[#74ACDF] uppercase tracking-wider truncate">
            {sticker.secretariaName || sticker.subtitle || sticker.position || 'La Scaloneta'}
          </p>
          <p className="font-heading text-xs font-black text-white uppercase truncate">
            {sticker.title}
          </p>
          <div className="mt-1 flex items-center justify-center gap-1 text-[8px] font-black text-[#D4AF37] uppercase">
            <Check className="w-2.5 h-2.5" /> Pegada en Álbum
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. LOCKED STATE CARD (BLOQUEADA / NO CONSEGUIDA)
  // Strict rule: NO symbol, NO photo, NO name, NO role, NO clues.
  // -------------------------------------------------------------
  return (
    <div
      onClick={handleClick}
      className={`group relative bg-slate-100/90 hover:bg-slate-200/80 rounded-2xl border-2 border-dashed p-3.5 transition-all duration-200 flex flex-col justify-between items-center text-center cursor-pointer min-h-[220px] ${
        isLegendary
          ? 'border-[#D4AF37] bg-amber-50/40 hover:bg-amber-100/50'
          : isEpic
          ? 'border-purple-300 bg-purple-50/30 hover:bg-purple-100/40'
          : isRare
          ? 'border-sky-300 bg-sky-50/30 hover:bg-sky-100/40'
          : 'border-slate-300'
      }`}
    >
      {/* Top Slot Header: Number & Rarity */}
      <div className="w-full flex items-center justify-between">
        <span className="font-heading text-xs font-black text-slate-400 group-hover:text-[#003870] transition-colors">
          #{sticker.number.toString().padStart(2, '0')}
        </span>

        {isLegendary ? (
          <span className="text-[8px] font-black text-[#D4AF37] bg-[#D4AF37]/15 border border-[#D4AF37]/40 px-2 py-0.5 rounded-full flex items-center gap-0.5 uppercase tracking-wider">
            <Star className="w-2 h-2 fill-[#D4AF37]" /> LEGENDARIA
          </span>
        ) : isEpic ? (
          <span className="text-[8px] font-black text-purple-700 bg-purple-100 border border-purple-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
            ÉPICA
          </span>
        ) : isRare ? (
          <span className="text-[8px] font-black text-sky-700 bg-sky-100 border border-sky-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
            RARA
          </span>
        ) : (
          <span className="text-[8px] font-black text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
            COMÚN
          </span>
        )}
      </div>

      {/* Middle Slot Content: ??? and Lock */}
      <div className="my-auto py-3 flex flex-col items-center">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 shadow-inner transition-transform group-hover:scale-105 ${
            isLegendary
              ? 'bg-amber-100/80 text-amber-700 border border-amber-300'
              : isEpic
              ? 'bg-purple-100/80 text-purple-700 border border-purple-300'
              : isRare
              ? 'bg-sky-100/80 text-sky-700 border border-sky-300'
              : 'bg-slate-200 text-slate-400'
          }`}
        >
          <Lock className="w-5 h-5" />
        </div>

        {/* Masked mystery text */}
        <h4 className="font-heading text-xl font-black text-slate-400 group-hover:text-slate-600 transition-colors">
          ???
        </h4>

        <p className="font-heading text-[10px] font-black text-slate-500 uppercase tracking-wide mt-1">
          FIGURITA NO CONSEGUIDA
        </p>
      </div>

      {/* Bottom info helper */}
      <div className="w-full pt-2 border-t border-slate-200/80">
        <p className="text-[9px] font-bold text-slate-400 group-hover:text-slate-600 transition-colors uppercase tracking-tight">
          Encontrala en un sobre
        </p>
      </div>
    </div>
  );
};
