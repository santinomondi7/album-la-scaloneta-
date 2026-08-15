import React, { useState } from 'react';
import { ACHIEVEMENTS_LIST } from '../data/achievementsData';
import { Achievement } from '../types';
import { soundManager } from '../utils/audio';
import { Trophy, Lock, CheckCircle2, Star, ChevronLeft, Sparkles } from 'lucide-react';

interface LogrosViewProps {
  onBack: () => void;
  unlockedAchievements: string[];
  points: number;
}

export const LogrosView: React.FC<LogrosViewProps> = ({
  onBack,
  unlockedAchievements,
  points
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'coleccion', name: 'Colección' },
    { id: 'sobres', name: 'Sobres' },
    { id: 'juegos', name: 'Minijuegos' },
    { id: 'racha', name: 'Racha' },
    { id: 'puntos', name: 'Puntos' }
  ];

  const filteredList = ACHIEVEMENTS_LIST.filter(ach => {
    if (selectedCategory === 'todos') return true;
    return ach.category === selectedCategory;
  });

  const unlockedCount = unlockedAchievements.length;
  const totalCount = ACHIEVEMENTS_LIST.length;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="flex items-center gap-1.5 text-xs font-heading font-black uppercase text-[#003870] hover:text-[#002244] bg-white border border-slate-200 shadow-sm px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>

        <div className="flex items-center gap-2 bg-[#003870] text-white px-3.5 py-1.5 rounded-xl text-xs font-black shadow-sm">
          <Trophy className="w-3.5 h-3.5 text-[#FEF08A]" />
          <span>{unlockedCount} / {totalCount} Logros</span>
        </div>
      </div>

      {/* Hero Title */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xl mb-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3">
          <Trophy className="w-8 h-8 text-[#003870]" />
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-black uppercase text-[#003870] tracking-tight mb-2">
          Galería de Logros y Trofeos
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-semibold max-w-md mx-auto">
          Completá desafíos abriendo sobres, acertando en los minijuegos y juntando figuritas para ganar puntos extra.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              soundManager.playClick();
              setSelectedCategory(cat.id);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-heading font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#003870] text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Achievements Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredList.map(ach => {
          const isUnlocked = unlockedAchievements.includes(ach.id);

          return (
            <div
              key={ach.id}
              className={`p-5 rounded-3xl border-2 transition-all flex items-start gap-4 ${
                isUnlocked
                  ? 'bg-white border-[#FEF08A] shadow-md ring-1 ring-[#FEF08A]'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 border-2 ${
                  isUnlocked
                    ? 'bg-[#003870] border-[#D4AF37] text-[#FEF08A]'
                    : 'bg-slate-200 border-slate-300 text-slate-400'
                }`}
              >
                {isUnlocked ? <Sparkles className="w-6 h-6 text-[#FEF08A]" /> : <Lock className="w-5 h-5 text-slate-400" />}
              </div>

              {/* Text info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-heading text-sm font-black uppercase text-[#003870] truncate">
                    {ach.title}
                  </h3>
                  <span className="text-[10px] font-black text-[#003870] bg-[#FEF08A] px-2 py-0.5 rounded-md shrink-0">
                    +{ach.pointsReward} pts
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-snug mb-2">
                  {ach.description}
                </p>

                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase">
                  {isUnlocked ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      ¡Desbloqueado!
                    </span>
                  ) : (
                    <span className="text-slate-400">En progreso...</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
