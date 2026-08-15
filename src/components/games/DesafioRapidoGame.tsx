import React, { useState, useEffect } from 'react';
import { RapidQuestion } from '../../types';
import { RAPID_TRIVIA_POOL } from '../../data/rapidTriviaData';
import { soundManager } from '../../utils/audio';
import { Trophy, RotateCcw, Zap, Timer, CheckCircle2, XCircle } from 'lucide-react';

interface DesafioRapidoGameProps {
  onGameComplete: (points: number, correctCount: number) => void;
  onExit: () => void;
  playsToday: number;
  maxRewarded: number;
}

export const DesafioRapidoGame: React.FC<DesafioRapidoGameProps> = ({
  onGameComplete,
  onExit,
  playsToday,
  maxRewarded
}) => {
  const [deck, setDeck] = useState<RapidQuestion[]>(() => {
    return [...RAPID_TRIVIA_POOL].sort(() => 0.5 - Math.random());
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const isRewarded = playsToday < maxRewarded;

  // 30-second countdown
  useEffect(() => {
    if (!isPlaying || isFinished) return;

    if (timeLeft <= 0) {
      setIsFinished(true);
      setIsPlaying(false);
      const pointsEarned = isRewarded ? correctAnswers * 10 : 0;
      onGameComplete(pointsEarned, correctAnswers);
      soundManager.playGoldFanfare();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, isFinished, timeLeft, correctAnswers, isRewarded, onGameComplete]);

  const handleStart = () => {
    soundManager.playClick();
    setIsPlaying(true);
  };

  const handleAnswer = (optionIdx: number) => {
    if (!isPlaying || isFinished) return;

    const currentQ = deck[currentIndex % deck.length];
    const isCorrect = optionIdx === currentQ.correctIndex;

    if (isCorrect) {
      soundManager.playSuccess();
      setCorrectAnswers(c => c + 1);
    } else {
      soundManager.playMiss();
    }

    setCurrentIndex(c => c + 1);
  };

  const handleRestart = () => {
    soundManager.playClick();
    setDeck([...RAPID_TRIVIA_POOL].sort(() => 0.5 - Math.random()));
    setCurrentIndex(0);
    setTimeLeft(30);
    setCorrectAnswers(0);
    setIsPlaying(true);
    setIsFinished(false);
  };

  const currentQ = deck[currentIndex % deck.length];

  return (
    <div className="w-full max-w-2xl mx-auto p-4 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <h2 className="font-heading text-lg font-black uppercase text-[#003870]">
              Desafío Rápido (30s)
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-semibold">
            {isRewarded
              ? `Partida ${playsToday + 1}/${maxRewarded} con puntos (+10 pts por acierto)`
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

      {!isPlaying && !isFinished ? (
        /* Intro Card */
        <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-xl text-center">
          <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 border-4 border-amber-400 flex items-center justify-center font-heading text-3xl font-black mx-auto mb-4">
            <Zap className="w-10 h-10 fill-amber-500" />
          </div>

          <h3 className="font-heading text-2xl font-black uppercase text-[#003870] mb-2">
            ¿Cuántas podés responder en 30 segundos?
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
            Preguntas rápidas de Verdadero / Falso sobre la historia y figuras de la Selección. ¡Respondé a máxima velocidad!
          </p>

          <button
            onClick={handleStart}
            className="w-full sm:w-auto px-10 py-4 bg-[#003870] hover:bg-[#002850] text-white font-heading text-sm font-black uppercase tracking-wider rounded-2xl shadow-xl transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-2 mx-auto"
          >
            <Zap className="w-5 h-5 text-[#FEF08A]" />
            <span>¡Comenzar Desafío!</span>
          </button>
        </div>
      ) : isPlaying && !isFinished ? (
        /* Fast Gameplay Card */
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl">
          {/* Header Stats */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 bg-rose-50 text-rose-700 px-4 py-2 rounded-2xl border border-rose-200 font-heading text-lg font-black">
              <Timer className="w-5 h-5 animate-spin" />
              <span>{timeLeft}s</span>
            </div>

            <div className="bg-emerald-50 text-emerald-800 px-4 py-2 rounded-2xl border border-emerald-200 font-heading text-sm font-black uppercase">
              Aciertos: {correctAnswers}
            </div>
          </div>

          {/* Question Text */}
          <div className="min-h-[100px] flex items-center justify-center text-center p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-6">
            <h3 className="font-heading text-lg sm:text-xl font-black text-[#003870] leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* 2 Options Quick Buttons */}
          <div className="grid grid-cols-2 gap-4">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="py-5 px-4 rounded-2xl border-2 border-[#003870] bg-[#003870] hover:bg-[#002850] text-white font-heading text-sm font-black uppercase tracking-wider shadow-lg active:scale-95 transition-transform cursor-pointer text-center"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Results Screen */
        <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-2xl text-center">
          <div className="w-20 h-20 rounded-full bg-[#FEF08A] text-[#003870] border-4 border-[#003870] flex items-center justify-center font-heading text-3xl font-black italic mx-auto mb-4 shadow-lg">
            <Trophy className="w-10 h-10 text-[#003870]" />
          </div>

          <span className="text-xs font-black uppercase tracking-widest text-[#74ACDF]">
            ¡TIEMPO AGOTADO!
          </span>
          <h2 className="font-heading text-3xl font-black uppercase text-[#003870] mt-1 mb-2">
            {correctAnswers >= 8 ? '¡VELOCIDAD PURA!' : correctAnswers >= 4 ? '¡MUY BUEN RITMO!' : '¡A MEJORAR LOS REFLEJOS!'}
          </h2>

          <p className="text-sm font-semibold text-slate-600 mb-6">
            Lograste <span className="text-[#003870] font-black text-base">{correctAnswers}</span> aciertos en 30 segundos.
          </p>

          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 mb-8 max-w-sm mx-auto">
            <p className="text-xs font-black uppercase text-slate-400">PUNTOS OBTENIDOS</p>
            <p className="font-heading text-3xl font-black text-[#D4AF37]">
              +{isRewarded ? correctAnswers * 10 : 0} PUNTOS
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
