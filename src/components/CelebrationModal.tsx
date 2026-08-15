import React from 'react';
import { Trophy, Star, Sparkles, Share2, ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenShare: () => void;
  totalCount: number;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  onClose,
  onOpenShare,
  totalCount
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl border-4 border-[#D4AF37] shadow-2xl p-6 sm:p-8 text-center overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* Holographic Top Flare */}
        <div className="absolute inset-0 holo-foil opacity-20 pointer-events-none" />

        <div className="relative z-10">
          {/* Trophy Icon Badge */}
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#FEF08A] to-[#D4AF37] border-4 border-[#003870] flex items-center justify-center text-[#003870] shadow-xl mb-4 transform hover:rotate-12 transition-transform">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#003870] text-[#D4AF37] text-xs font-black uppercase tracking-wider mb-2">
            <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
            <span>¡CAMPEÓN DEL ÁLBUM!</span>
            <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl font-black uppercase text-[#003870] italic leading-tight">
            ¡ÁLBUM 100% COMPLETADO!
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-2 max-w-xs mx-auto leading-relaxed">
            Pegaste las <b>{totalCount} figuritas</b> de La Scaloneta. ¡La plantilla, las secretarías y todas las propuestas ya forman parte de tu equipo!
          </p>

          {/* Action Buttons */}
          <div className="mt-6 space-y-2.5">
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenShare();
              }}
              className="w-full py-3.5 px-4 bg-[#003870] hover:bg-[#002244] text-white font-heading text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-lg border-2 border-[#D4AF37] flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <Share2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Compartir tu Logro 100%</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-[#003870] font-heading text-xs font-black uppercase tracking-wider rounded-xl border border-slate-300 transition-colors cursor-pointer"
            >
              Volver al Álbum
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
