import React, { useState } from 'react';
import { PackPullResult } from '../hooks/useGamification';
import { Sticker, PackHistoryEntry } from '../types';
import { soundManager } from '../utils/audio';
import { Package, Clock, Sparkles, Star, ChevronLeft, ArrowRight, Eye, CheckCircle2, RotateCcw, History, AlertCircle } from 'lucide-react';
import { ScalonetaEmblem } from '../components/ScalonetaEmblem';
import { StickerSymbol } from '../components/StickerSymbol';

interface SobresViewProps {
  onBack: () => void;
  onNavigateToAlbum: () => void;
  onOpenStickerModal: (sticker: Sticker) => void;
  isPackReady: boolean;
  formattedCountdown: string;
  openPack: () => PackPullResult[];
  packsOpenedCount: number;
  packHistory: PackHistoryEntry[];
}

export const SobresView: React.FC<SobresViewProps> = ({
  onBack,
  onNavigateToAlbum,
  onOpenStickerModal,
  isPackReady,
  formattedCountdown,
  openPack,
  packsOpenedCount,
  packHistory
}) => {
  const [openingPhase, setOpeningPhase] = useState<'idle' | 'tearing' | 'revealing' | 'revealed'>('idle');
  const [pulledCards, setPulledCards] = useState<PackPullResult[]>([]);
  const [revealedIndices, setRevealedIndices] = useState<number[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const handleStartOpen = () => {
    if (!isPackReady || openingPhase !== 'idle') return;

    soundManager.playPackTear();
    setOpeningPhase('tearing');

    const results = openPack();
    setPulledCards(results);
    setRevealedIndices([]);

    // Tearing animation phase
    setTimeout(() => {
      soundManager.playPackOpen();
      setOpeningPhase('revealing');

      // Sequential reveals
      setTimeout(() => setRevealedIndices(results.length >= 1 ? [0] : []), 400);
      setTimeout(() => setRevealedIndices(results.length >= 2 ? [0, 1] : results.length >= 1 ? [0] : []), 900);
      setTimeout(() => {
        setRevealedIndices(results.map((_, index) => index));
        setOpeningPhase('revealed');
      }, 1400);
    }, 1200);
  };

  const handleSkipAnimation = () => {
    if (openingPhase === 'tearing' || openingPhase === 'revealing') {
      soundManager.playClick();
      setRevealedIndices(pulledCards.map((_, index) => index));
      setOpeningPhase('revealed');
    }
  };

  const handleResetToIdle = () => {
    soundManager.playClick();
    setOpeningPhase('idle');
    setPulledCards([]);
    setRevealedIndices([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 animate-in fade-in duration-300">
      {/* Top Navigation & Status Bar */}
      <div className="flex items-center justify-between mb-6 gap-2">
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

        <div className="flex items-center gap-2">
          {packHistory.length > 0 && (
            <button
              onClick={() => {
                soundManager.playClick();
                setShowHistoryModal(true);
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-[#003870] bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <History className="w-3.5 h-3.5" />
              <span>Historial</span>
            </button>
          )}

          <div className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm">
            📦 Sobres abiertos: <span className="text-[#003870] font-black">{packsOpenedCount}</span>
          </div>
        </div>
      </div>

      {openingPhase === 'idle' ? (
        /* IDLE STAGE: Pack Presentation & Countdown */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-200 shadow-2xl text-center max-w-lg mx-auto">
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FEF08A] text-[#003870] text-xs font-black uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SOBRE OFICIAL LA SCALONETA</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl font-black uppercase italic tracking-tight text-[#003870] mb-2">
            ¿QUÉ TE TOCÓ?
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold mb-8">
            Hay un nuevo sobre de 3 figuritas disponible cada 2 horas.
          </p>

          {/* Big Foil Pack Component with Scaloneta Official Emblem */}
          <div
            onClick={isPackReady ? handleStartOpen : undefined}
            className={`relative w-56 sm:w-64 h-84 sm:h-92 mx-auto rounded-3xl bg-gradient-to-b from-[#003870] via-[#002244] to-[#001428] border-4 border-[#D4AF37] shadow-2xl p-4 flex flex-col justify-between overflow-hidden group mb-8 transform transition-all duration-300 ${
              isPackReady ? 'cursor-pointer hover:scale-105 hover:shadow-2xl' : 'opacity-90'
            }`}
          >
            {/* Top Seal Serrated Edge */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-[#D4AF37] via-[#FEF08A] to-[#D4AF37] border-b border-[#003870] opacity-80" />

            {/* Holographic shimmer */}
            <div className="absolute inset-0 holo-foil opacity-35 pointer-events-none" />

            <div className="mt-4 text-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#74ACDF]">
                ÁLBUM OFICIAL 2026
              </span>
              <h2 className="font-heading text-2xl font-black italic text-white uppercase mt-0.5 tracking-tight">
                LA SCALONETA
              </h2>
            </div>

            {/* Center Official Emblem */}
            <div className="my-auto py-2 flex items-center justify-center">
              <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 shadow-inner">
                <ScalonetaEmblem size="lg" />
              </div>
            </div>

            <div className="mb-4 text-center">
              <div className="inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-[10px] font-black text-[#FEF08A] uppercase mb-1">
                <Star className="w-3 h-3 fill-[#FEF08A]" />
                <span>3 FIGURITAS</span>
              </div>
              <p className="text-[9px] text-sky-200 uppercase font-semibold">
                Centro de Estudiantes
              </p>
            </div>

            {/* Bottom Seal Serrated Edge */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-[#D4AF37] via-[#FEF08A] to-[#D4AF37] border-t border-[#003870] opacity-80" />
          </div>

          {/* Action / Countdown State */}
          {isPackReady ? (
            <div className="animate-in zoom-in-95 duration-200">
              <button
                onClick={handleStartOpen}
                className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#FEF08A] hover:from-[#c49f2b] hover:to-[#e2d572] text-[#003870] font-heading text-sm font-black uppercase tracking-wider rounded-2xl shadow-xl border-2 border-[#003870] transition-all transform active:scale-95 animate-pulse cursor-pointer flex items-center justify-center gap-2"
              >
                <Package className="w-5 h-5 text-[#003870]" />
                <span>¡ABRIR SOBRE AHORA!</span>
              </button>
              <p className="text-[11px] text-emerald-700 font-bold mt-2">
                🟢 ¡Tu sobre está listo para abrir!
              </p>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl p-5 border-2 border-slate-200">
              <div className="flex items-center justify-center gap-2 text-xs font-black uppercase text-slate-500 mb-2">
                <Clock className="w-4 h-4 text-[#003870]" />
                <span>PRÓXIMO SOBRE DISPONIBLE EN</span>
              </div>

              <div className="font-heading text-3xl sm:text-4xl font-black text-[#003870] tracking-widest bg-white py-2 px-4 rounded-xl border border-slate-200 inline-block shadow-inner">
                {formattedCountdown}
              </div>

              <p className="text-xs text-slate-500 font-semibold mt-3">
                Mientras esperás, podés sumar puntos y divertirte jugando en la sección de Minijuegos.
              </p>
            </div>
          )}

          {/* Probabilities Information Bar */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-left">
            <h4 className="text-[11px] font-black uppercase text-slate-400 mb-2 tracking-wider">
              PROBABILIDADES OFICIALES
            </h4>
            <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-black uppercase">
              <div className="p-2 bg-slate-100 rounded-xl border border-slate-200">
                <div className="text-slate-600">Común</div>
                <div className="text-slate-900 font-black text-xs">65%</div>
              </div>
              <div className="p-2 bg-sky-50 rounded-xl border border-sky-200">
                <div className="text-sky-700">Rara</div>
                <div className="text-sky-900 font-black text-xs">25%</div>
              </div>
              <div className="p-2 bg-purple-50 rounded-xl border border-purple-200">
                <div className="text-purple-700">Épica</div>
                <div className="text-purple-900 font-black text-xs">9%</div>
              </div>
              <div className="p-2 bg-amber-50 rounded-xl border border-amber-300">
                <div className="text-amber-700">Legendaria</div>
                <div className="text-amber-900 font-black text-xs">1%</div>
              </div>
            </div>
          </div>
        </div>
      ) : openingPhase === 'tearing' || openingPhase === 'revealing' ? (
        /* ANIMATION STAGE: Tearing and flying cards with Scaloneta emblem reveal */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-200 shadow-2xl text-center max-w-2xl mx-auto min-h-[420px] flex flex-col justify-between items-center">
          <div className="w-full flex justify-between items-center">
            <span className="text-xs font-black uppercase text-[#74ACDF]">
              ABRIENDO SOBRE...
            </span>
            <button
              onClick={handleSkipAnimation}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Ver Figuritas (Saltar)</span>
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="my-auto py-6 flex flex-col items-center">
            <div className="w-48 sm:w-56 h-64 sm:h-72 rounded-3xl bg-gradient-to-b from-[#003870] to-[#002244] border-4 border-[#D4AF37] shadow-2xl flex flex-col items-center justify-center p-4 animate-bounce mx-auto">
              <ScalonetaEmblem size="xl" />
              <span className="text-[#FEF08A] font-heading font-black text-xs uppercase mt-3 tracking-widest">
                LA SCALONETA
              </span>
            </div>
            <p className="font-heading text-xl font-black uppercase text-[#003870] mt-6 animate-pulse">
              ¡Rompiendo el sobre!
            </p>
          </div>
        </div>
      ) : (
        /* REVEALED STAGE: Show the 3 pulled cards with Duplicate status and Real Photos */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-2xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>¡SOBRE ABIERTO!</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl font-black uppercase italic text-[#003870] mb-2">
            Tus 3 Figuritas
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold mb-6">
            Esperá 2 horas para el próximo sobre. Tocá cualquier figurita para verla en detalle.
          </p>

          {/* 3 Pulled Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {pulledCards.map((pull, idx) => {
              const { sticker, isDuplicate, pointsEarned, isLegendary } = pull;
              const isRevealed = revealedIndices.includes(idx);
              const isEpic = sticker.rarity === 'epic';
              const isRare = sticker.rarity === 'rare';

              if (!isRevealed) {
                return (
                  <div
                    key={idx}
                    className="aspect-[3/4] rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center animate-pulse"
                  >
                    <span className="text-xs font-black text-slate-400 uppercase">
                      Revelando...
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={idx}
                  onClick={() => {
                    soundManager.playCardFlip();
                    onOpenStickerModal(sticker);
                  }}
                  className={`relative rounded-2xl p-3 sm:p-4 border-2 shadow-lg transition-all duration-300 transform hover:scale-103 hover:shadow-xl cursor-pointer flex flex-col justify-between text-left animate-in zoom-in-90 ${
                    isLegendary
                      ? 'bg-gradient-to-b from-[#FEF08A]/25 via-white to-[#D4AF37]/20 border-3 border-[#D4AF37] ring-2 ring-[#D4AF37]/50'
                      : isEpic
                      ? 'bg-gradient-to-b from-purple-50 via-white to-purple-100/50 border-purple-400'
                      : isRare
                      ? 'bg-gradient-to-b from-sky-50 via-white to-sky-100/50 border-sky-300'
                      : 'bg-slate-50 border-slate-300'
                  }`}
                >
                  {/* Status Banner */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-[#003870]">
                      #{sticker.number.toString().padStart(2, '0')}
                    </span>

                    {isDuplicate ? (
                      isLegendary ? (
                        <div className="text-right">
                          <span className="text-[9px] font-black text-amber-900 bg-[#FEF08A] border border-[#D4AF37] px-2 py-0.5 rounded-full uppercase shadow-xs block">
                            LEGENDARIA REPETIDA
                          </span>
                          <span className="text-[8px] font-bold text-amber-700 block mt-0.5">
                            +{pointsEarned} PUNTOS
                          </span>
                        </div>
                      ) : (
                        <span className="text-[9px] font-black text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full uppercase shadow-xs">
                          REPETIDA (+{pointsEarned} pts)
                        </span>
                      )
                    ) : (
                      <span className="text-[9px] font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full uppercase shadow-xs">
                        ¡NUEVA!
                      </span>
                    )}
                  </div>

                  {/* Card Graphic: Symbol for team / Text proposal for proposals */}
                  <div className="my-auto text-center py-1 flex flex-col items-center">
                    {sticker.type === 'propuesta' ? (
                      <div className="w-full py-2 px-1 flex flex-col items-center justify-center">
                        <span className="text-[8px] font-black uppercase text-sky-800 bg-sky-100 px-1.5 py-0.5 rounded mb-1">
                          {sticker.category}
                        </span>
                        <h3 className="font-heading text-xs font-black uppercase text-[#003870] line-clamp-2 leading-tight">
                          {sticker.title}
                        </h3>
                        <p className="text-[10px] text-slate-600 font-medium line-clamp-2 mt-1 px-1">
                          {sticker.whatWeSeek || sticker.description}
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="w-full max-w-[150px] mb-1.5 flex items-center justify-center">
                          <StickerSymbol
                            stickerNumber={sticker.number}
                            rarity={sticker.rarity}
                            size="sm"
                            isUnlocked={true}
                          />
                        </div>

                        <h3 className="font-heading text-xs sm:text-sm font-black uppercase text-[#003870] line-clamp-1 leading-tight mt-1">
                          {sticker.title}
                        </h3>
                        <p className="text-[10px] text-slate-500 font-bold line-clamp-1 mt-0.5">
                          {sticker.role || sticker.subtitle || sticker.category}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Rarity Tag */}
                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] font-black uppercase mt-1">
                    <span className="text-slate-400">Rareza</span>
                    <span
                      className={`px-2 py-0.5 rounded-md ${
                        isLegendary
                          ? 'bg-[#D4AF37] text-[#003870] font-black'
                          : isEpic
                          ? 'bg-purple-100 text-purple-800'
                          : isRare
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {sticker.rarity}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleResetToIdle}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-[#003870] font-heading text-xs font-black uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Volver a Sobres</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onNavigateToAlbum();
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#003870] hover:bg-[#002850] text-white font-heading text-xs font-black uppercase tracking-wider rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <span>Ver en Mi Colección</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* HISTORIAL MODAL (HISTORIAL DE SOBRES) */}
      {showHistoryModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setShowHistoryModal(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl border-2 border-slate-200 shadow-2xl p-6 text-left max-h-[85vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-[#003870]" />
                <h3 className="font-heading text-lg font-black uppercase text-[#003870]">
                  HISTORIAL DE SOBRES
                </h3>
              </div>

              <button
                onClick={() => setShowHistoryModal(false)}
                className="p-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer text-xs font-bold px-2 py-1"
              >
                Cerrar
              </button>
            </div>

            {/* Modal Content List */}
            <div className="overflow-y-auto flex-1 py-4 space-y-3 pr-1">
              {packHistory.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-sm font-semibold">
                  Aún no abriste ningún sobre.
                </div>
              ) : (
                packHistory.map(entry => (
                  <div
                    key={entry.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-heading font-black text-[#003870]">
                        SOBRE #{entry.packNumber.toString().padStart(2, '0')}
                      </span>
                      <span className="text-slate-500 font-semibold text-[11px]">
                        {entry.timeFormatted}
                      </span>
                    </div>

                    <div className="text-[11px] font-bold text-slate-700">
                      3 figuritas: <span className="text-[#003870]">{entry.summary}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {entry.cards.map((c, i) => (
                        <div
                          key={i}
                          className={`p-2 rounded-xl border text-[10px] font-semibold flex flex-col justify-between ${
                            c.rarity === 'legendary'
                              ? 'bg-amber-50 border-amber-300 text-amber-950'
                              : c.rarity === 'epic'
                              ? 'bg-purple-50 border-purple-200 text-purple-950'
                              : c.rarity === 'rare'
                              ? 'bg-sky-50 border-sky-200 text-sky-950'
                              : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between font-black">
                            <span>#{c.number.toString().padStart(2, '0')}</span>
                            <span className="uppercase text-[8px]">{c.rarity}</span>
                          </div>
                          <div className="truncate font-black text-[#003870] mt-0.5">
                            {c.title}
                          </div>
                          <div className="text-[9px] mt-1 font-bold">
                            {c.isDuplicate ? (
                              <span className="text-amber-700">Repetida (+{c.pointsEarned}p)</span>
                            ) : (
                              <span className="text-emerald-700 font-black">¡Nueva!</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
