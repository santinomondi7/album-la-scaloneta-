import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../../types';
import { generateQuizMatch } from '../../data/quizData';
import { soundManager } from '../../utils/audio';
import { Trophy, ArrowRight, RotateCcw, CheckCircle2, XCircle, Star, Sparkles, HelpCircle } from 'lucide-react';

interface QuizGameProps {
  onGameComplete: (points: number, score: number) => void;
  onExit: () => void;
  playsToday: number;
  maxRewarded: number;
}

export const QuizGame: React.FC<QuizGameProps> = ({
  onGameComplete,
  onExit,
  playsToday,
  maxRewarded
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => generateQuizMatch());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex];
  const isRewarded = playsToday < maxRewarded;

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctIndex;
    const nextScore = score + (isCorrect ? 1 : 0);
    if (isCorrect) {
      setScore(nextScore);
      soundManager.playSuccess();
    } else {
      soundManager.playMiss();
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      const pointsEarned = isRewarded ? nextScore * 10 : 0;
      onGameComplete(pointsEarned, nextScore);
    }
  };

  const handleRestart = () => {
    soundManager.playClick();
    setQuestions(generateQuizMatch());
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🇦🇷</span>
            <h2 className="font-heading text-lg font-black uppercase text-[#003870]">
              Quiz de la Selección
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-semibold">
            {isRewarded
              ? `Partida ${playsToday + 1}/${maxRewarded} con puntos hoy (+10 pts por acierto)`
              : 'Modo Práctica (Límite de puntos diarios alcanzado)'}
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
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs font-black text-slate-400 mb-2">
            <span className="uppercase text-[#003870]">
              Pregunta {currentIndex + 1} de {questions.length}
            </span>
            <span className="text-[#D4AF37] font-black">
              Aciertos: {score}/{currentIndex + (isAnswered ? 1 : 0)}
            </span>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
            <div
              className="bg-gradient-to-r from-[#74ACDF] to-[#003870] h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Difficulty Badge & Category */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                currentQ.difficulty === 'facil'
                  ? 'bg-emerald-100 text-emerald-800'
                  : currentQ.difficulty === 'medio'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              Nivel: {currentQ.difficulty}
            </span>
            {currentQ.category && (
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md uppercase">
                {currentQ.category}
              </span>
            )}
          </div>

          {/* Question Text */}
          <h3 className="font-heading text-lg sm:text-xl font-black text-[#003870] leading-snug mb-6">
            {currentQ.question}
          </h3>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {currentQ.options.map((option, idx) => {
              let optionStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

              if (isAnswered) {
                if (idx === currentQ.correctIndex) {
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
                  <span className="leading-tight">{option}</span>
                  {isAnswered && idx === currentQ.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Card */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 mb-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-[#003870] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>¿Sabías qué?</span>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {currentQ.funFact || '¡La historia de nuestra Selección está llena de momentos inolvidables!'}
              </p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <button
              onClick={handleNext}
              className="w-full py-3.5 bg-[#003870] hover:bg-[#002850] text-white font-heading text-xs font-black uppercase tracking-wider rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <span>{currentIndex + 1 === questions.length ? 'Ver Resultados' : 'Siguiente Pregunta'}</span>
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
            {score >= 8 ? '¡SABIO ALBICELESTE!' : score >= 5 ? '¡BUEN PARTIDO!' : '¡A SEGUIR ENTRENANDO!'}
          </h2>

          <p className="text-sm font-semibold text-slate-600 mb-6">
            Acertaste <span className="text-[#003870] font-black text-base">{score}</span> de{' '}
            <span className="text-[#003870] font-black text-base">{questions.length}</span> preguntas.
          </p>

          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 mb-8 max-w-sm mx-auto">
            <p className="text-xs font-black uppercase text-slate-400">PUNTOS OBTENIDOS</p>
            <p className="font-heading text-3xl font-black text-[#D4AF37]">
              +{isRewarded ? score * 10 : 0} PUNTOS
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
