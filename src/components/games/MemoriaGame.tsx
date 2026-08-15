import React, { useState, useEffect } from 'react';
import { soundManager } from '../../utils/audio';
import { Trophy, RotateCcw, Sparkles } from 'lucide-react';

interface MemoriaGameProps {
  onGameComplete: (points: number) => void;
  onExit: () => void;
  playsToday: number;
  maxRewarded: number;
}

interface Card {
  id: number;
  symbol: string;
  label: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const SYMBOLS = [
  { symbol: '⚽', label: 'Pelota' },
  { symbol: '🏆', label: 'Copa' },
  { symbol: '🎽', label: 'Camiseta' },
  { symbol: '🧤', label: 'Guantes' },
  { symbol: '🥇', label: 'Medalla' },
  { symbol: '🎺', label: 'Corneta' },
  { symbol: '🟨', label: 'Tarjeta' },
  { symbol: '⏱️', label: 'Reloj' }
];

function generateDeck(): Card[] {
  const cards: Card[] = [];
  let idCounter = 1;

  SYMBOLS.forEach(item => {
    // 2 copies per symbol
    cards.push({ id: idCounter++, symbol: item.symbol, label: item.label, isFlipped: false, isMatched: false });
    cards.push({ id: idCounter++, symbol: item.symbol, label: item.label, isFlipped: false, isMatched: false });
  });

  return cards.sort(() => 0.5 - Math.random());
}

export const MemoriaGame: React.FC<MemoriaGameProps> = ({
  onGameComplete,
  onExit,
  playsToday,
  maxRewarded
}) => {
  const [cards, setCards] = useState<Card[]>(() => generateDeck());
  const [selectedCardIds, setSelectedCardIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const isRewarded = playsToday < maxRewarded;

  const handleCardClick = (id: number) => {
    if (isLocked) return;
    const clickedCard = cards.find(c => c.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    soundManager.playStickerFlip();

    const newFlipped = [...selectedCardIds, id];
    setSelectedCardIds(newFlipped);

    setCards(prev => prev.map(c => (c.id === id ? { ...c, isFlipped: true } : c)));

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      setIsLocked(true);

      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
        // Match!
        setTimeout(() => {
          soundManager.playSuccess();
          setCards(prev =>
            prev.map(c => (c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c))
          );
          setMatchedPairs(p => {
            const nextP = p + 1;
            if (nextP === SYMBOLS.length) {
              setIsFinished(true);
              const pointsEarned = isRewarded ? 100 : 0;
              onGameComplete(pointsEarned);
            }
            return nextP;
          });
          setSelectedCardIds([]);
          setIsLocked(false);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev =>
            prev.map(c => (c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c))
          );
          setSelectedCardIds([]);
          setIsLocked(false);
        }, 900);
      }
    }
  };

  const handleRestart = () => {
    soundManager.playClick();
    setCards(generateDeck());
    setSelectedCardIds([]);
    setMoves(0);
    setMatchedPairs(0);
    setIsLocked(false);
    setIsFinished(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🧠</span>
            <h2 className="font-heading text-lg font-black uppercase text-[#003870]">
              Memoria Futbolera
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-semibold">
            {isRewarded
              ? `Partida ${playsToday + 1}/${maxRewarded} con puntos (+100 pts al completar)`
              : 'Modo Práctica (Sin puntos)'}
          </p>
        </div>

        <button
          onClick={onExit}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
        >
          Volver a Juegos
        </button>
      </div>

      {!isFinished ? (
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl">
          {/* Status Bar */}
          <div className="flex items-center justify-between text-xs font-black text-slate-400 mb-5">
            <span className="uppercase text-[#003870]">
              Parejas encontradas: {matchedPairs} / {SYMBOLS.length}
            </span>
            <span className="text-slate-600">Movimientos: {moves}</span>
          </div>

          {/* 4x4 Cards Grid */}
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 mb-4">
            {cards.map(card => {
              const isFaceUp = card.isFlipped || card.isMatched;

              return (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  disabled={card.isMatched || card.isFlipped || isLocked}
                  className={`aspect-square rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center p-2 cursor-pointer select-none ${
                    card.isMatched
                      ? 'bg-emerald-50 border-emerald-400 opacity-80 ring-2 ring-emerald-300'
                      : isFaceUp
                      ? 'bg-white border-[#74ACDF] shadow-md transform rotate-y-180'
                      : 'bg-gradient-to-br from-[#003870] to-[#002244] border-[#D4AF37] hover:scale-102 shadow-sm'
                  }`}
                >
                  {isFaceUp ? (
                    <div className="flex flex-col items-center animate-in zoom-in-50 duration-200">
                      <span className="text-2xl sm:text-3xl">{card.symbol}</span>
                      <span className="text-[9px] font-black uppercase text-[#003870] mt-1">
                        {card.label}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center">
                      <span className="text-xs font-black text-[#FEF08A]">LS</span>
                      <span className="text-[8px] font-bold text-sky-200 uppercase mt-0.5">
                        ALBUM
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Results Screen */
        <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-2xl text-center">
          <div className="w-20 h-20 rounded-full bg-[#FEF08A] text-[#003870] border-4 border-[#003870] flex items-center justify-center font-heading text-3xl font-black italic mx-auto mb-4 shadow-lg">
            <Trophy className="w-10 h-10 text-[#003870]" />
          </div>

          <span className="text-xs font-black uppercase tracking-widest text-[#74ACDF]">
            ¡TABLERO COMPLETADO!
          </span>
          <h2 className="font-heading text-3xl font-black uppercase text-[#003870] mt-1 mb-2">
            ¡MEMORIA DE CAMPEÓN!
          </h2>

          <p className="text-sm font-semibold text-slate-600 mb-6">
            Completaste el tablero en <span className="text-[#003870] font-black text-base">{moves}</span> movimientos.
          </p>

          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 mb-8 max-w-sm mx-auto">
            <p className="text-xs font-black uppercase text-slate-400">PUNTOS OBTENIDOS</p>
            <p className="font-heading text-3xl font-black text-[#D4AF37]">
              +{isRewarded ? 100 : 0} PUNTOS
            </p>
            {!isRewarded && (
              <p className="text-[11px] text-slate-500 mt-1">
                (Partida en Modo Práctica).
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-[#003870] font-heading text-xs font-black uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Jugar Otra Partida</span>
            </button>

            <button
              onClick={onExit}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#003870] hover:bg-[#002850] text-white font-heading text-xs font-black uppercase tracking-wider rounded-2xl shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              Volver al Menú de Juegos
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
