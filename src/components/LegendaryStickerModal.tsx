import React from 'react';
import { Sticker } from '../types';
import { Star, Trophy, Sparkles, X, Check } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { StickerSymbol } from './StickerSymbol';
import { ScalonetaEmblem } from './ScalonetaEmblem';

interface LegendaryStickerModalProps {
  sticker: Sticker | null;
  onClose: () => void;
}

export const LegendaryStickerModal: React.FC<LegendaryStickerModalProps> = ({
  sticker,
  onClose
}) => {
  if (!sticker) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm bg-gradient-to-b from-[#003870] to-[#001830] rounded-3xl border-4 border-[#D4AF37] shadow-2xl p-6 text-center overflow-hidden animate-in zoom-in-95 duration-300 text-white"
        onClick={e => e.stopPropagation()}
      >
        {/* Holographic light overlay */}
        <div className="absolute inset-0 holo-foil opacity-30 pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Badge */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37] text-[#003870] text-xs font-black uppercase tracking-wider mb-3 shadow-md">
            <Star className="w-3.5 h-3.5 fill-[#003870]" />
            <span>¡FIGURITA LEGENDARIA!</span>
            <Star className="w-3.5 h-3.5 fill-[#003870]" />
          </div>

          <h2 className="font-heading text-2xl font-black uppercase italic tracking-tight text-white mb-1">
            ¡LA CONSEGUISTE!
          </h2>
          <p className="text-xs text-sky-200 font-semibold mb-5">
            Una de las 2 cartas más exclusivas y brillantes de todo el álbum.
          </p>

          {/* Physical Legendary Card Preview */}
          <div className="relative w-52 h-72 mx-auto rounded-2xl bg-white p-3 border-4 border-[#D4AF37] shadow-2xl text-[#003870] flex flex-col justify-between transform hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 holo-foil opacity-40 pointer-events-none rounded-xl" />

            <div className="flex justify-between items-center bg-[#003870] text-white px-2 py-1 rounded-md text-[10px] font-black">
              <span>#{sticker.number.toString().padStart(2, '0')}</span>
              <span className="text-[#D4AF37] uppercase flex items-center gap-0.5">
                <Star className="w-2.5 h-2.5 fill-[#D4AF37]" /> LEGENDARIA
              </span>
            </div>

            <div className="my-auto text-center flex flex-col items-center justify-center w-full px-1">
              <div className="w-full max-w-[150px] mb-1">
                <StickerSymbol
                  stickerNumber={sticker.number}
                  rarity="legendary"
                  size="sm"
                  isUnlocked={true}
                />
              </div>

              <h3 className="font-heading text-xs font-black uppercase text-[#003870] leading-tight">
                {sticker.title}
              </h3>
              <p className="text-[10px] font-bold text-[#74ACDF] uppercase">
                {sticker.role || sticker.position}
              </p>
            </div>

            <div className="bg-[#003870] text-white p-1.5 rounded-lg text-[9px] font-semibold text-center line-clamp-2">
              {sticker.description}
            </div>
          </div>

          {/* Notification strip */}
          <div className="mt-5 bg-white/10 border border-[#D4AF37]/50 rounded-xl p-2.5 text-xs text-slate-200 font-semibold flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-[#D4AF37]" />
            <span>Guardada en tu colección con acabado dorado</span>
          </div>

          {/* Action button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-full mt-4 py-3 bg-[#D4AF37] hover:bg-[#c49f2b] text-[#003870] font-heading text-xs font-black uppercase tracking-wider rounded-xl shadow-lg border-2 border-[#003870] transition-colors cursor-pointer"
          >
            Continuar Coleccionando
          </button>
        </div>
      </div>
    </div>
  );
};
