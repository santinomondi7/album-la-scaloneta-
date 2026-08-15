import React, { useState } from 'react';
import { soundManager } from '../../utils/audio';
import { Trophy, RotateCcw, Target, Shield, Check, X } from 'lucide-react';

interface PenaltyGameProps {
  onGameComplete: (points: number, goalsScored: number) => void;
  onExit: () => void;
  playsToday: number;
  maxRewarded: number;
}

type GoalZone = 'TL' | 'TC' | 'TR' | 'BL' | 'BC' | 'BR';

const ZONES: { id: GoalZone; name: string }[] = [
  { id: 'TL', name: 'Ángulo Izquierdo' },
  { id: 'TC', name: 'Arriba al Centro' },
  { id: 'TR', name: 'Ángulo Derecho' },
  { id: 'BL', name: 'Raso Izquierda' },
  { id: 'BC', name: 'Raso al Medio' },
  { id: 'BR', name: 'Raso Derecha' }
];

export const PenaltyGame: React.FC<PenaltyGameProps> = ({
  onGameComplete,
  onExit,
  playsToday,
  maxRewarded
}) => {
  const TOTAL_KICKS = 5;
  const [currentKick, setCurrentKick] = useState(1);
  const [kicksHistory, setKicksHistory] = useState<('goal' | 'saved')[]>([]);
  const [isKicking, setIsKicking] = useState(false);
  const [selectedZone, setSelectedZone] = useState<GoalZone | null>(null);
  const [keeperZone, setKeeperZone] = useState<GoalZone | null>(null);
  const [lastResult, setLastResult] = useState<'goal' | 'saved' | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const isRewarded = playsToday < maxRewarded;
  const goalsCount = kicksHistory.filter(k => k === 'goal').length;

  const handleShoot = (zone: GoalZone) => {
    if (isKicking || isFinished) return;

    soundManager.playClick();
    setIsKicking(true);
    setSelectedZone(zone);

    // Goalkeeper dives randomly with 65% save probability variance
    const allZones: GoalZone[] = ['TL', 'TC', 'TR', 'BL', 'BC', 'BR'];
    const keeperChoice = allZones[Math.floor(Math.random() * allZones.length)];
    setKeeperZone(keeperChoice);

    const isGoal = zone !== keeperChoice;

    setTimeout(() => {
      if (isGoal) {
        soundManager.playGoal();
        setLastResult('goal');
      } else {
        soundManager.playMiss();
        setLastResult('saved');
      }

      const nextHistory = [...kicksHistory, isGoal ? 'goal' : 'saved'];
      setKicksHistory(nextHistory);

      setTimeout(() => {
        if (currentKick < TOTAL_KICKS) {
          setCurrentKick(c => c + 1);
          setIsKicking(false);
          setSelectedZone(null);
          setKeeperZone(null);
          setLastResult(null);
        } else {
          setIsFinished(true);
          const finalGoals = nextHistory.filter(k => k === 'goal').length;
          const pointsEarned = isRewarded ? finalGoals * 15 : 0;
          onGameComplete(pointsEarned, finalGoals);
        }
      }, 1200);
    }, 600);
  };

  const handleRestart = () => {
    soundManager.playClick();
    setCurrentKick(1);
    setKicksHistory([]);
    setIsKicking(false);
    setSelectedZone(null);
    setKeeperZone(null);
    setLastResult(null);
    setIsFinished(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">⚽</span>
            <h2 className="font-heading text-lg font-black uppercase text-[#003870]">
              Tanda de Penales
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-semibold">
            {isRewarded
              ? `Partida ${playsToday + 1}/${maxRewarded} con puntos (+15 pts por gol)`
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
          {/* Scoreboard Bar */}
          <div className="flex items-center justify-between bg-slate-900 text-white rounded-2xl p-4 mb-6 shadow-inner">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#74ACDF]">
                PENAL {currentKick} DE {TOTAL_KICKS}
              </span>
              <p className="font-heading text-xl font-black text-white">
                Goles: {goalsCount}
              </p>
            </div>

            {/* Kick Indicators */}
            <div className="flex items-center gap-2">
              {Array.from({ length: TOTAL_KICKS }).map((_, i) => {
                const res = kicksHistory[i];
                return (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border-2 ${
                      res === 'goal'
                        ? 'bg-emerald-500 border-emerald-400 text-white shadow-md'
                        : res === 'saved'
                        ? 'bg-rose-500 border-rose-400 text-white shadow-md'
                        : i === currentKick - 1
                        ? 'bg-slate-800 border-[#FEF08A] text-white animate-pulse'
                        : 'bg-slate-800 border-slate-700 text-slate-500'
                    }`}
                  >
                    {res === 'goal' ? '⚽' : res === 'saved' ? '✕' : i + 1}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Realistic Interactive Goal Area */}
          <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-sky-300 to-emerald-700 rounded-2xl border-4 border-slate-800 overflow-hidden shadow-2xl p-4 flex flex-col justify-between mb-6">
            {/* Goal Frame */}
            <div className="relative w-full h-[85%] border-8 border-white bg-emerald-900/60 rounded-t-lg backdrop-blur-[2px] grid grid-cols-3 grid-rows-2 gap-2 p-2 shadow-2xl">
              {/* Goal Net Graphic Grid */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                  backgroundSize: '12px 12px'
                }}
              />

              {/* 6 Target Aiming Zones */}
              {ZONES.map(z => {
                const isSelected = selectedZone === z.id;
                const isKeeperHere = keeperZone === z.id;

                return (
                  <button
                    key={z.id}
                    onClick={() => handleShoot(z.id)}
                    disabled={isKicking}
                    className={`relative rounded-xl border-2 border-dashed border-white/40 flex items-center justify-center transition-all cursor-pointer group ${
                      isSelected
                        ? 'bg-white/30 border-white ring-4 ring-[#FEF08A]'
                        : 'hover:bg-white/20 hover:border-white'
                    }`}
                  >
                    {!isKicking && (
                      <div className="w-8 h-8 rounded-full bg-black/30 group-hover:bg-[#FEF08A] text-white group-hover:text-[#003870] flex items-center justify-center font-bold text-xs shadow-md transition-colors">
                        <Target className="w-4 h-4" />
                      </div>
                    )}

                    {/* Ball animation */}
                    {isSelected && (
                      <div className="absolute z-20 text-3xl animate-bounce">
                        ⚽
                      </div>
                    )}

                    {/* Goalkeeper Jump animation */}
                    {isKeeperHere && isKicking && (
                      <div className="absolute z-10 text-3xl transform scale-125 animate-in zoom-in-50">
                        🧤
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Grass Field & Shoot Prompt */}
            <div className="text-center relative z-10">
              {lastResult === 'goal' ? (
                <span className="font-heading text-lg font-black uppercase text-white bg-emerald-600 px-4 py-1.5 rounded-full shadow-lg border-2 border-white animate-bounce">
                  ¡GOOOOOOL! ⚽🔥
                </span>
              ) : lastResult === 'saved' ? (
                <span className="font-heading text-lg font-black uppercase text-white bg-rose-600 px-4 py-1.5 rounded-full shadow-lg border-2 border-white">
                  ¡ATAJÓ EL ARQUERO! 🧤❌
                </span>
              ) : (
                <span className="text-xs font-black uppercase text-white bg-black/40 px-3.5 py-1 rounded-full backdrop-blur-sm">
                  Elegí dónde patear el penal
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Final Score Results */
        <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-2xl text-center">
          <div className="w-20 h-20 rounded-full bg-[#FEF08A] text-[#003870] border-4 border-[#003870] flex items-center justify-center font-heading text-3xl font-black italic mx-auto mb-4 shadow-lg">
            <Trophy className="w-10 h-10 text-[#003870]" />
          </div>

          <span className="text-xs font-black uppercase tracking-widest text-[#74ACDF]">
            FINAL DE LA TANDA
          </span>
          <h2 className="font-heading text-3xl font-black uppercase text-[#003870] mt-1 mb-2">
            {goalsCount >= 4 ? '¡FIGURA DEL PARTIDO!' : goalsCount >= 2 ? '¡BUENA DEFINICIÓN!' : '¡A PRACTICAR PENALES!'}
          </h2>

          <p className="text-sm font-semibold text-slate-600 mb-6">
            Convertiste <span className="text-[#003870] font-black text-base">{goalsCount}</span> de{' '}
            <span className="text-[#003870] font-black text-base">{TOTAL_KICKS}</span> penales.
          </p>

          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 mb-8 max-w-sm mx-auto">
            <p className="text-xs font-black uppercase text-slate-400">PUNTOS OBTENIDOS</p>
            <p className="font-heading text-3xl font-black text-[#D4AF37]">
              +{isRewarded ? goalsCount * 15 : 0} PUNTOS
            </p>
            {!isRewarded && (
              <p className="text-[11px] text-slate-500 mt-1">
                (Partida en Modo Práctica. Mañana podés sumar más puntos).
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-[#003870] font-heading text-xs font-black uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Patear Otra Tanda</span>
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
