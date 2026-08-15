import React, { useState } from 'react';
import { QuizGame } from '../components/games/QuizGame';
import { PenaltyGame } from '../components/games/PenaltyGame';
import { AdivinaJugadorGame } from '../components/games/AdivinaJugadorGame';
import { MemoriaGame } from '../components/games/MemoriaGame';
import { DesafioRapidoGame } from '../components/games/DesafioRapidoGame';
import { MAX_REWARDED_GAMES_PER_DAY } from '../data/packProbabilities';
import { soundManager } from '../utils/audio';
import { Trophy, Play, Star, ChevronLeft, Zap, Target, Brain, HelpCircle, Gamepad2 } from 'lucide-react';

interface JuegosViewProps {
  onBack: () => void;
  recordGameResult: (
    gameType: 'quiz' | 'penalty' | 'adivina' | 'memoria' | 'rapido',
    pointsEarned: number,
    extraData?: { isPenaltyGoal?: number; quizScore?: number; perfectClue1?: boolean }
  ) => void;
  getPlaysToday: (gameType: string) => number;
  points: number;
}

type SelectedGame = 'quiz' | 'penalty' | 'adivina' | 'memoria' | 'rapido' | null;

export const JuegosView: React.FC<JuegosViewProps> = ({
  onBack,
  recordGameResult,
  getPlaysToday,
  points
}) => {
  const [activeGame, setActiveGame] = useState<SelectedGame>(null);

  const gamesList = [
    {
      id: 'quiz' as const,
      title: 'Quiz de la Selección',
      subtitle: '10 preguntas históricas y de Qatar 2022',
      reward: 'Hasta +100 pts',
      icon: '🇦🇷',
      bgColor: 'from-sky-600 to-[#003870]',
      tag: 'Cultura Fútbol'
    },
    {
      id: 'penalty' as const,
      title: 'Tanda de Penales',
      subtitle: 'Elegí el ángulo y superá al arquero (5 tiros)',
      reward: 'Hasta +75 pts',
      icon: '⚽',
      bgColor: 'from-emerald-600 to-teal-800',
      tag: 'Precisión'
    },
    {
      id: 'adivina' as const,
      title: 'Adiviná el Jugador',
      subtitle: 'Descubrí a la leyenda con menos pistas',
      reward: 'Hasta +150 pts',
      icon: '🕵️‍♂️',
      bgColor: 'from-purple-600 to-indigo-800',
      tag: 'Deducción'
    },
    {
      id: 'memoria' as const,
      title: 'Memoria Futbolera',
      subtitle: 'Encontrá todas las parejas de cartas',
      reward: '+100 pts',
      icon: '🧠',
      bgColor: 'from-blue-600 to-slate-800',
      tag: 'Concentración'
    },
    {
      id: 'rapido' as const,
      title: 'Desafío Rápido 30s',
      subtitle: 'Preguntas vertiginosas contrarreloj',
      reward: '+10 pts / acierto',
      icon: '⚡',
      bgColor: 'from-amber-600 to-yellow-800',
      tag: 'Velocidad'
    }
  ];

  const handleLaunchGame = (gameId: SelectedGame) => {
    soundManager.playClick();
    setActiveGame(gameId);
  };

  if (activeGame === 'quiz') {
    return (
      <QuizGame
        onGameComplete={(pts, score) => {
          recordGameResult('quiz', pts, { quizScore: score });
        }}
        onExit={() => setActiveGame(null)}
        playsToday={getPlaysToday('quiz')}
        maxRewarded={MAX_REWARDED_GAMES_PER_DAY}
      />
    );
  }

  if (activeGame === 'penalty') {
    return (
      <PenaltyGame
        onGameComplete={(pts, goals) => {
          recordGameResult('penalty', pts, { isPenaltyGoal: goals });
        }}
        onExit={() => setActiveGame(null)}
        playsToday={getPlaysToday('penalty')}
        maxRewarded={MAX_REWARDED_GAMES_PER_DAY}
      />
    );
  }

  if (activeGame === 'adivina') {
    return (
      <AdivinaJugadorGame
        onGameComplete={(pts, perfect) => {
          recordGameResult('adivina', pts, { perfectClue1: perfect });
        }}
        onExit={() => setActiveGame(null)}
        playsToday={getPlaysToday('adivina')}
        maxRewarded={MAX_REWARDED_GAMES_PER_DAY}
      />
    );
  }

  if (activeGame === 'memoria') {
    return (
      <MemoriaGame
        onGameComplete={pts => {
          recordGameResult('memoria', pts);
        }}
        onExit={() => setActiveGame(null)}
        playsToday={getPlaysToday('memoria')}
        maxRewarded={MAX_REWARDED_GAMES_PER_DAY}
      />
    );
  }

  if (activeGame === 'rapido') {
    return (
      <DesafioRapidoGame
        onGameComplete={(pts, score) => {
          recordGameResult('rapido', pts);
        }}
        onExit={() => setActiveGame(null)}
        playsToday={getPlaysToday('rapido')}
        maxRewarded={MAX_REWARDED_GAMES_PER_DAY}
      />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-6">
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

        <div className="flex items-center gap-2 bg-[#003870] text-white px-3.5 py-1.5 rounded-xl text-xs font-black shadow-sm">
          <Star className="w-3.5 h-3.5 text-[#FEF08A] fill-[#FEF08A]" />
          <span>{points} Puntos</span>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#003870] to-[#002244] rounded-3xl p-6 sm:p-8 text-white border-4 border-[#D4AF37] shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 text-9xl pointer-events-none">
          🎮
        </div>

        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37] text-[#003870] text-[11px] font-black uppercase tracking-wider mb-3 shadow-md">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Zona de Juegos Futboleros</span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-black uppercase italic tracking-tight mb-2">
            Minijuegos La Scaloneta
          </h1>
          <p className="text-xs sm:text-sm text-sky-100 font-medium leading-relaxed mb-4">
            Demostrá tu pasión por el fútbol y la Selección. Ganá puntos diarios para desbloquear logros, subir de nivel y abrir más sobres de figuritas.
          </p>

          <div className="inline-flex items-center gap-2 text-[11px] font-bold text-sky-200 bg-white/10 px-3 py-1 rounded-lg">
            <span>ℹ️ Hasta {MAX_REWARDED_GAMES_PER_DAY} partidas diarias con puntos por cada juego (luego modo práctica ilimitado).</span>
          </div>
        </div>
      </div>

      {/* Games Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gamesList.map(game => {
          const plays = getPlaysToday(game.id);
          const isFullReward = plays < MAX_REWARDED_GAMES_PER_DAY;

          return (
            <div
              key={game.id}
              className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-lg hover:border-[#74ACDF] hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${game.bgColor} flex items-center justify-center text-2xl shadow-md shrink-0`}>
                      {game.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#74ACDF]">
                        {game.tag}
                      </span>
                      <h3 className="font-heading text-base sm:text-lg font-black uppercase text-[#003870] leading-snug">
                        {game.title}
                      </h3>
                    </div>
                  </div>

                  <span className="text-[11px] font-black text-[#003870] bg-[#FEF08A] px-2.5 py-0.5 rounded-lg shrink-0">
                    {game.reward}
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-semibold mb-4 leading-relaxed">
                  {game.subtitle}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="text-[11px] font-bold text-slate-500">
                  {isFullReward ? (
                    <span className="text-emerald-700 font-black">
                      🟢 {plays}/{MAX_REWARDED_GAMES_PER_DAY} partidas con puntos hoy
                    </span>
                  ) : (
                    <span className="text-slate-400">
                      ⚪ Modo Práctica (Partidas con puntos completadas)
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleLaunchGame(game.id)}
                  className="px-4 py-2 bg-[#003870] hover:bg-[#002850] text-white font-heading text-xs font-black uppercase tracking-wider rounded-xl shadow-md flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Jugar</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
