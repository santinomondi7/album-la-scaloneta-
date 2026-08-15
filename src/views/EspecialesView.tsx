import React from 'react';
import { SPECIAL_STICKERS } from '../data/albumData';
import { Sticker } from '../types';
import { StickerCard } from '../components/StickerCard';
import { ArrowLeft, Star, Sparkles, Trophy } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface EspecialesViewProps {
  onBack: () => void;
  isUnlocked: (id: string) => boolean;
  duplicateCounts?: Record<string, number>;
  onSelectSticker: (sticker: Sticker) => void;
}

export const EspecialesView: React.FC<EspecialesViewProps> = ({
  onBack,
  isUnlocked,
  duplicateCounts = {},
  onSelectSticker
}) => {
  const collectedCount = SPECIAL_STICKERS.filter(s => isUnlocked(s.id)).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 animate-in fade-in duration-300">
      {/* Top Nav */}
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

        <div className="flex items-center gap-1.5 text-xs font-black text-[#003870] bg-[#D4AF37] px-3 py-1.5 rounded-xl shadow-xs">
          <Star className="w-3.5 h-3.5 fill-[#003870]" />
          <span>{collectedCount} de {SPECIAL_STICKERS.length} Especiales</span>
        </div>
      </div>

      {/* Title Bento Hero */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-l-8 border-[#D4AF37] border-2 border-slate-200 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-black text-[#003870] bg-[#D4AF37] px-2.5 py-1 rounded-md uppercase tracking-wider">
              EDICIÓN ESPECIAL Y LEGENDARIA
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl font-black uppercase text-[#003870] italic tracking-tight mt-2">
              FIGURITAS ESPECIALES
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mt-1 font-semibold leading-relaxed">
              Las únicas 2 cartas <strong>LEGENDARIAS</strong> de todo el álbum son el Presidente <strong>Santino Mondino</strong> y la Vicepresidenta <strong>Helena Vercellone</strong>, acompañadas por el <strong>Escudo Oficial</strong>.
            </p>
          </div>
          <span className="text-xs font-black text-slate-400">PÁG. 04</span>
        </div>
      </div>

      {/* Specials Bento Grid Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {SPECIAL_STICKERS.map(sticker => (
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
