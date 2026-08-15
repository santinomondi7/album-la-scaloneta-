import React, { useState } from 'react';
import { Sticker } from '../types';
import { X, Star, RotateCw, Lock, Package, Share2, ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { StickerSymbol } from './StickerSymbol';

interface StickerModalProps {
  sticker: Sticker | null;
  isOpen: boolean;
  onClose: () => void;
  isUnlocked: boolean;
  onGoToSobres?: () => void;
  customDescription?: string;
  onSaveCustomDescription?: (id: string, newText: string) => void;
}

export const StickerModal: React.FC<StickerModalProps> = ({
  sticker,
  isOpen,
  onClose,
  isUnlocked,
  onGoToSobres,
  customDescription,
  onSaveCustomDescription
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!isOpen || !sticker) return null;

  const isLegendary = sticker.rarity === 'legendary';
  const isEpic = sticker.rarity === 'epic';
  const isRare = sticker.rarity === 'rare';
  const isProposal = sticker.type === 'propuesta';
  const displayDescription = customDescription || sticker.details || sticker.description;

  const handleFlip = () => {
    soundManager.playCardFlip();
    setIsFlipped(!isFlipped);
  };

  const handleShareCard = () => {
    soundManager.playClick();
    const text = `¡Mirá la figurita #${sticker.number} de ${sticker.title} (${sticker.rarity.toUpperCase()}) en el álbum oficial de La Scaloneta! 🏆⭐⭐⭐`;
    if (navigator.share) {
      navigator.share({
        title: `La Scaloneta - #${sticker.number} ${sticker.title}`,
        text: text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text}\n${window.location.href}`);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  // -------------------------------------------------------------
  // 1. LOCKED STICKER MODAL
  // Strict rule: NO symbol, NO photo, NO details if locked.
  // -------------------------------------------------------------
  if (!isUnlocked) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-sm bg-white rounded-3xl border-4 border-slate-300 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-slate-100 border-b border-slate-200 px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-heading text-xs font-black text-slate-500 uppercase tracking-wider">
                FIGURITA #{sticker.number.toString().padStart(2, '0')}
              </span>
              {isLegendary ? (
                <span className="bg-[#D4AF37] text-[#003870] text-[8px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 uppercase">
                  <Star className="w-2.5 h-2.5 fill-[#003870]" /> LEGENDARIA
                </span>
              ) : isEpic ? (
                <span className="bg-purple-100 text-purple-900 text-[8px] font-black px-2 py-0.5 rounded-full uppercase">
                  ÉPICA
                </span>
              ) : isRare ? (
                <span className="bg-sky-100 text-sky-900 text-[8px] font-black px-2 py-0.5 rounded-full uppercase">
                  RARA
                </span>
              ) : (
                <span className="bg-slate-200 text-slate-700 text-[8px] font-black px-2 py-0.5 rounded-full uppercase">
                  COMÚN
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-xl bg-white hover:bg-slate-100 text-slate-500 border border-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Locked Content */}
          <div className="p-6 text-center">
            <div className="w-20 h-20 rounded-3xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Lock className="w-10 h-10" />
            </div>

            <div className="font-heading text-3xl font-black text-slate-400 mb-1">
              ???
            </div>

            <h3 className="font-heading text-base font-black text-[#003870] uppercase tracking-wide mb-2">
              FIGURITA NO CONSEGUIDA
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 font-semibold mb-6 max-w-xs mx-auto leading-relaxed">
              Encontrala en un sobre. Hay un nuevo sobre disponible cada 2 horas.
            </p>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] text-slate-500 font-semibold mb-5 flex items-center justify-center gap-1.5">
              <span>Rareza:</span>
              <span className="font-black text-[#003870] uppercase">
                {sticker.rarity}
              </span>
            </div>

            {onGoToSobres ? (
              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                  onGoToSobres();
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#003870] hover:bg-[#002850] text-white font-heading text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Package className="w-4 h-4" />
                <span>Ir a Abrir Sobres</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#003870] font-heading text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. UNLOCKED STICKER MODAL (CONSEGUIDA)
  // -------------------------------------------------------------
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl border-4 border-[#003870] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div
          className={`border-b-2 border-[#003870] px-4 py-3 flex items-center justify-between text-white ${
            isLegendary
              ? 'bg-gradient-to-r from-[#003870] via-[#002244] to-[#003870]'
              : isEpic
              ? 'bg-gradient-to-r from-purple-800 to-indigo-900'
              : isRare
              ? 'bg-[#003870]'
              : 'bg-[#74ACDF]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="font-heading text-xs sm:text-sm font-black text-white uppercase tracking-wider">
              FIGURITA #{sticker.number.toString().padStart(2, '0')}
            </span>

            {isLegendary ? (
              <span className="bg-[#D4AF37] text-[#003870] text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 uppercase">
                <Star className="w-3 h-3 fill-[#003870]" /> LEGENDARIA
              </span>
            ) : isEpic ? (
              <span className="bg-purple-200 text-purple-950 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                ÉPICA
              </span>
            ) : isRare ? (
              <span className="bg-sky-200 text-sky-950 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                RARA
              </span>
            ) : (
              <span className="bg-slate-200 text-slate-800 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                COMÚN
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6">
          {/* Card 3D Flip Display */}
          <div className="relative w-full max-w-[300px] h-[390px] mx-auto perspective-1000 my-1">
            <div
              className={`w-full h-full duration-500 transform-style-3d cursor-pointer ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              onClick={handleFlip}
            >
              {/* FRONT SIDE */}
              <div
                className={`absolute inset-0 backface-hidden rounded-2xl bg-white p-3.5 border-4 shadow-xl flex flex-col justify-between ${
                  isLegendary
                    ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50'
                    : isEpic
                    ? 'border-purple-400'
                    : isRare
                    ? 'border-[#74ACDF]'
                    : 'border-slate-300'
                }`}
              >
                {isLegendary && (
                  <div className="absolute inset-0 holo-foil opacity-35 pointer-events-none rounded-xl" />
                )}

                {/* Card Top Tag */}
                <div className="flex justify-between items-center bg-[#003870] text-white px-3 py-1.5 rounded-lg">
                  <span className="font-heading text-xs font-black">
                    #{sticker.number.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-[#74ACDF] truncate max-w-[180px]">
                    {sticker.category || 'La Scaloneta 2026'}
                  </span>
                </div>

                {/* Center Content: Proposal View vs Insignia View */}
                {isProposal ? (
                  <div className="my-auto text-center flex flex-col items-center justify-center p-3 bg-sky-50/60 rounded-xl border border-sky-100">
                    <span className="text-[10px] font-black uppercase text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-md mb-2">
                      {sticker.category}
                    </span>
                    <h3 className="font-heading text-sm sm:text-base font-black text-[#003870] uppercase leading-tight mb-3">
                      {sticker.title}
                    </h3>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">
                      {sticker.whatWeSeek || sticker.description}
                    </p>
                  </div>
                ) : (
                  <div className="my-auto text-center flex flex-col items-center justify-center w-full px-1">
                    <div className="w-full max-w-[210px] mx-auto mb-1">
                      <StickerSymbol
                        stickerNumber={sticker.number}
                        rarity={sticker.rarity}
                        size="modal"
                        isUnlocked={isUnlocked}
                      />
                    </div>

                    <h3 className="font-heading text-base font-black text-[#003870] uppercase leading-tight px-1 mt-1">
                      {sticker.title}
                    </h3>
                    <p className="text-xs text-[#74ACDF] font-bold uppercase mt-0.5 truncate max-w-full">
                      {sticker.role || sticker.secretariaName || sticker.subtitle || sticker.position}
                    </p>
                  </div>
                )}

                {/* Card Bottom Strip */}
                <div className="bg-[#003870] text-center py-2 px-3 rounded-lg text-white">
                  <p className="text-[10px] font-semibold text-slate-200 line-clamp-2 leading-tight">
                    {sticker.description}
                  </p>
                  <p className="text-[9px] font-bold text-[#D4AF37] uppercase mt-1 flex items-center justify-center gap-1">
                    <RotateCw className="w-2.5 h-2.5" /> Tocá para dar vuelta la carta
                  </p>
                </div>
              </div>

              {/* BACK SIDE */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-white p-4 border-4 border-[#003870] shadow-xl flex flex-col justify-between text-center">
                <div className="border-b-2 border-slate-100 pb-2">
                  <span className="text-[10px] font-black text-[#74ACDF] uppercase">FICHA TÉCNICA</span>
                  <h4 className="font-heading text-sm font-black text-[#003870] uppercase">
                    {sticker.title}
                  </h4>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">
                    {sticker.role || sticker.subtitle || sticker.category}
                  </p>
                </div>

                <div className="my-auto py-2 text-left space-y-2.5 text-xs">
                  <div>
                    <span className="font-bold text-[#003870] block text-[10px] uppercase">¿QUÉ BUSCAMOS?</span>
                    <p className="text-slate-600 font-medium text-[11px] leading-relaxed">
                      {sticker.whatWeSeek || displayDescription}
                    </p>
                  </div>

                  {sticker.position && (
                    <div>
                      <span className="font-bold text-[#003870] block text-[10px] uppercase">ÁREA / POSICIÓN</span>
                      <p className="text-slate-600 font-semibold text-[11px]">
                        📍 {sticker.position}
                      </p>
                    </div>
                  )}

                  {sticker.tags && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {sticker.tags.map((t, i) => (
                        <span key={i} className="text-[9px] font-black bg-slate-100 text-[#003870] px-2 py-0.5 rounded uppercase">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-slate-100 py-1.5 rounded-lg text-[9px] font-black text-[#003870] uppercase">
                  LA SCALONETA • LISTA OFICIAL
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar Under Card */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleFlip}
              className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-[#003870] font-heading text-xs font-black uppercase rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Girar Carta</span>
            </button>

            <button
              onClick={handleShareCard}
              className="py-2.5 px-4 bg-[#003870] hover:bg-[#002850] text-white font-heading text-xs font-black uppercase rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Compartir</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
