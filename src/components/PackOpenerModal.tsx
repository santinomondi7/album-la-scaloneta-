import React, { useState, useEffect } from 'react';
import { ALL_STICKERS } from '../data/albumData';
import { Sticker } from '../types';
import { StickerCard } from '../components/StickerCard';
import { X, Package, Sparkles, Check, RotateCcw, ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { ScalonetaEmblem } from './ScalonetaEmblem';

interface PackOpenerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockBatch: (ids: string[]) => void;
  unlockedIds: Set<string>;
}

export const PackOpenerModal: React.FC<PackOpenerModalProps> = ({
  isOpen,
  onClose,
  onUnlockBatch,
  unlockedIds
}) => {
  const [packOpened, setPackOpened] = useState(false);
  const [revealedCards, setRevealedCards] = useState<Sticker[]>([]);
  const [isOpeningAnim, setIsOpeningAnim] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPackOpened(false);
      setRevealedCards([]);
      setIsOpeningAnim(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRipPack = () => {
    if (isOpeningAnim) return;
    setIsOpeningAnim(true);
    soundManager.playPackRip();

    setTimeout(() => {
      // Pick up to 3 stickers that the student does not own.
      // NEVER fall back to ALL_STICKERS, because that would create duplicates.
      const uncollected = ALL_STICKERS.filter(s => !unlockedIds.has(s.id));
      const selected = [...uncollected]
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.min(3, uncollected.length));

      setRevealedCards(selected);
      setPackOpened(true);
      setIsOpeningAnim(false);
      soundManager.playPackOpen();

      // Automatically register unlocked stickers
      onUnlockBatch(selected.map(s => s.id));
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl border-4 border-[#003870] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Bento Header */}
        <div className="bg-[#74ACDF] border-b-2 border-[#003870] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#003870]" />
            <span className="font-heading text-sm font-black uppercase text-white tracking-wider">
              SOBRE OFICIAL DE FIGURITAS 2026
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-white/80 hover:bg-white text-[#003870] border border-[#003870]/30 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 text-center">
          {!packOpened ? (
            <div className="flex flex-col items-center justify-center py-6">
              {/* Foil Pack Graphic Bento */}
              <div
                onClick={handleRipPack}
                className={`relative w-52 sm:w-60 h-80 rounded-3xl bg-gradient-to-b from-[#74ACDF] via-[#003870] to-[#002244] border-4 border-[#D4AF37] shadow-2xl p-4 flex flex-col justify-between items-center text-white cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  isOpeningAnim ? 'animate-pulse scale-105 rotate-1' : ''
                }`}
              >
                {/* Rip Line Top */}
                <div className="w-full border-b-2 border-dashed border-[#D4AF37] pb-1 flex justify-between items-center text-[9px] font-black text-[#FEF08A] uppercase">
                  <span>✂️ Cortar aquí</span>
                  <span>3 Figuritas</span>
                </div>

                {/* Scaloneta Pack Crest */}
                <div className="text-center my-auto">
                  <div className="p-2 bg-white/10 rounded-2xl border border-white/20 shadow-inner inline-block mb-2">
                    <ScalonetaEmblem size="md" />
                  </div>
                  <h3 className="font-heading text-xl font-black uppercase tracking-tight text-white italic">
                    LA SCALONETA
                  </h3>
                  <div className="text-[#D4AF37] text-xs font-black">⭐⭐⭐</div>
                  <p className="text-[10px] text-sky-200 font-bold uppercase tracking-widest mt-1">
                    Centro de Estudiantes 2026
                  </p>
                </div>

                <div className="w-full bg-[#D4AF37] text-[#003870] text-[10px] font-black uppercase py-1.5 rounded-lg shadow-sm">
                  {isOpeningAnim ? 'Abriendo sobre...' : 'TOCÁ PARA ABRIR'}
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-4 font-semibold max-w-xs">
                Tocá el sobre para rasgarlo y descubrir 3 figuritas para tu colección.
              </p>
            </div>
          ) : (
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-4 border border-emerald-300">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>¡FIGURITAS PEGADAS EN TU ÁLBUM!</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 my-4 max-w-lg mx-auto">
                {revealedCards.map(card => (
                  <div key={card.id} className="h-full">
                    <StickerCard
                      sticker={card}
                      isUnlocked={true}
                      onSelect={() => {}}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                <button
                  onClick={() => {
                    setPackOpened(false);
                    soundManager.playClick();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#003870] font-heading text-xs font-black uppercase tracking-wider rounded-xl border border-slate-300 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Abrir Otro Sobre</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#003870] hover:bg-[#002244] text-white font-heading text-xs font-black uppercase tracking-wider rounded-xl shadow-md border border-[#D4AF37] flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Ver en el Álbum</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
