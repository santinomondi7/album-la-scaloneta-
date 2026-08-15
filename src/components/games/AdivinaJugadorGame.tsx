import React, { useState } from 'react';
import { PlayerGuessItem } from '../../types';
import { PLAYER_GUESS_POOL } from '../../data/playerGuessData';
import { soundManager } from '../../utils/audio';
import { Trophy, ArrowRight, RotateCcw, HelpCircle, Sparkles, CheckCircle2, XCircle, ChevronDown } from 'lucide-react';

interface AdivinaJugadorGameProps {
  onGameComplete: (points: number, perfectClue1: boolean) => void;
  onExit: () => void;
  playsToday: number;
  maxRewarded: number;
}

export const AdivinaJugadorGame: React.FC<AdivinaJugadorGameProps> = ({
  onGameComplete,
  onExit,
  playsToday,
  maxRewarded
}) => {
  const TOTAL_ROUNDS = 5;
  const [deck, setDeck] = useState<PlayerGuessItem[]>(() => {
    return [...PLAYER_GUESS_POOL].sort(() => 0.5 - Math.random()).slice(0, TOTAL_ROUNDS);
  });
  const [currentRound, setCurrentRound] = useState(0);
  const [clueLevel, setClueLevel] = useState<1 | 2 | 3>(1);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [perfectClue1Found, setPerfectClue1Found] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentItem = deck[currentRound];
  const isRewarded = playsToday < maxRewarded;

  // Points based on clue level: Clue 1 = 30 pts, Clue 2 = 20 pts, Clue 3 = 10 pts
  const pointsForCurrentLevel = clueLevel === 1 ? 30 : clueLevel === 2 ? 20 : 10;

  const handleNextClue = () => {
    if (clueLevel < 3 && !isAnswered) {
      soundManager.playClick();
      setClueLevel(lvl => (lvl + 1) as 1 | 2 | 3);
    }
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentItem.correctIndex;
    if (isCorrect) {
      soundManager.playSuccess();
      setTotalPoints(p => p + pointsForCurrentLevel);
      if (clueLevel === 1) {
        setPerfectClue1Found(true);
      }
    } else {
      soundManager.playMiss();
    }
  };

  const handleNextRound = () => {
    soundManager.playClick();
    if (currentRound + 1 < TOTAL_ROUNDS) {
      setCurrentRound(r => r + 1);
      setClueLevel(1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      const finalPoints = isRewarded ? totalPoints : 0;
      onGameComplete(finalPoints, perfectClue1Found);
    }
  };

  const handleRestart = () => {
    soundManager.playClick();
    setDeck([...PLAYER_GUESS_POOL].sort(() => 0.5 - Math.random()).slice(0, TOTAL_ROUNDS));
    setCurrentRound(0);
    setClueLevel(1);
    setSelectedOption(null);
    setIsAnswered(false);
    setTotalPoints(0);
    setPerfectClue1Found(false);
    setIsFinished(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🕵️‍♂️</span>
            <h2 className="font-heading text-lg font-black uppercase text-[#003870]">
              Adiviná el Jugador
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-semibold">
            {isRewarded
              ? `Partida ${playsToday + 1}/${maxRewarded} con puntos (Hasta +30 pts por ronda)`
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
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs font-black text-slate-400 mb-4">
            <span className="uppercase text-[#003870]">
              Ronda {currentRound + 1} de {TOTAL_ROUNDS}
            </span>
            <span className="text-[#D4AF37] font-black">
              Puntaje: {totalPoints} pts
            </span>
          </div>

          {/* Potential reward pill */}
          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-3 mb-5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600">Recompensa en esta pista:</span>
              <span className="font-black text-sm text-[#003870] bg-[#FEF08A] px-2.5 py-0.5 rounded-lg">
                +{pointsForCurrentLevel} pts
              </span>
            </div>

            {clueLevel < 3 && !isAnswered && (
              <button
                onClick={handleNextClue}
                className="text-xs font-bold text-[#003870] hover:text-[#002244] bg-sky-100 hover:bg-sky-200 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Ver Pista {clueLevel + 1}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Clues Container */}
          <div className="space-y-3 mb-6">
            {/* Clue 1 */}
            <div className="p-4 rounded-2xl bg-sky-50/70 border-2 border-sky-200 transition-all">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-[#003870] mb-1">
                <span className="w-5 h-5 rounded-full bg-[#003870] text-white flex items-center justify-center text-[10px]">
                  1
                </span>
                <span>Pista Inicial</span>
              </div>
              <p className="text-sm font-semibold text-slate-800">
                "{currentItem.clues[0]}"
              </p>
            </div>

            {/* Clue 2 */}
            {clueLevel >= 2 ? (
              <div className="p-4 rounded-2xl bg-amber-50/70 border-2 border-amber-200 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-900 mb-1">
                  <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">
                    2
                  </span>
                  <span>Pista Intermedia</span>
                </div>
                <p className="text-sm font-semibold text-slate-800">
                  "{currentItem.clues[1]}"
                </p>
              </div>
            ) : (
              <div className="p-3 rounded-2xl bg-slate-100 border border-dashed border-slate-300 text-center text-xs font-bold text-slate-400">
                🔒 Pista 2 bloqueada (Pedila si la necesitás)
              </div>
            )}

            {/* Clue 3 */}
            {clueLevel >= 3 ? (
              <div className="p-4 rounded-2xl bg-emerald-50/70 border-2 border-emerald-200 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-emerald-900 mb-1">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                    3
                  </span>
                  <span>Pista Reveladora</span>
                </div>
                <p className="text-sm font-semibold text-slate-800">
                  "{currentItem.clues[2]}"
                </p>
              </div>
            ) : (
              <div className="p-3 rounded-2xl bg-slate-100 border border-dashed border-slate-300 text-center text-xs font-bold text-slate-400">
                🔒 Pista 3 bloqueada
              </div>
            )}
          </div>

          {/* Options Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {currentItem.options.map((playerOption, idx) => {
              let optionStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

              if (isAnswered) {
                if (idx === currentItem.correctIndex) {
                  optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500 font-bold';
                } else if (idx === selectedOption) {
                  optionStyle = 'bg-rose-50 border-rose-500 text-rose-900 font-bold';
                } else {
                  optionStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`p-4 rounded-2xl border-2 text-left text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                >
                  <span>{playerOption}</span>
                  {isAnswered && idx === currentItem.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && idx === selectedOption && idx !== currentItem.correctIndex && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Next Round Button */}
          {isAnswered && (
            <button
              onClick={handleNextRound}
              className="w-full py-3.5 bg-[#003870] hover:bg-[#002850] text-white font-heading text-xs font-black uppercase tracking-wider rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <span>{currentRound + 1 === TOTAL_ROUNDS ? 'Ver Resultados' : 'Siguiente Ronda'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        /* Results Screen */
        <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-2xl text-center">
          <div className="w-20 h-20 rounded-full bg-[#FEF08A] text-[#003870] border-4 border-[#003870] flex items-center justify-center font-heading text-3xl font-black italic mx-auto mb-4 shadow-lg">
            <Trophy className="w-10 h-10 text-[#003870]" />
          </div>

          <span className="text-xs font-black uppercase tracking-widest text-[#74ACDF]">
            RESULTADO FINAL
          </span>
          <h2 className="font-heading text-3xl font-black uppercase text-[#003870] mt-1 mb-2">
            ¡DETECCIÓN COMPLETADA!
          </h2>

          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 mb-8 max-w-sm mx-auto">
            <p className="text-xs font-black uppercase text-slate-400">PUNTOS OBTENIDOS</p>
            <p className="font-heading text-3xl font-black text-[#D4AF37]">
              +{isRewarded ? totalPoints : 0} PUNTOS
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
              <span>Jugar Otra Vez</span>
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
