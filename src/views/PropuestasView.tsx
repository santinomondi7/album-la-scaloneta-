import React, { useState, useMemo } from 'react';
import { CATEGORIES_LIST, ALL_STICKERS } from '../data/albumData';
import { Sticker } from '../types';
import { StickerCard } from '../components/StickerCard';
import { ArrowLeft, Sparkles, Search, CheckCircle2, Star, BookOpen, Calendar, Trophy, Wrench, Utensils, HeartHandshake, ShieldAlert, Radio } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface PropuestasViewProps {
  onBack: () => void;
  isUnlocked: (id: string) => boolean;
  duplicateCounts?: Record<string, number>;
  onSelectSticker: (sticker: Sticker) => void;
}

export const PropuestasView: React.FC<PropuestasViewProps> = ({
  onBack,
  isUnlocked,
  duplicateCounts = {},
  onSelectSticker
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allProposals = useMemo(() => {
    return ALL_STICKERS.filter(s => s.type === 'propuesta');
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Educación y Apoyo Académico': return BookOpen;
      case 'Eventos y Convivencias': return Calendar;
      case 'Deportes y Recreaciones': return Trophy;
      case 'Infraestructura y Mejoras para la Escuela': return Wrench;
      case 'Cantina y Alimentación': return Utensils;
      case 'Inclusión, Bienestar y Solidaridad': return HeartHandshake;
      case 'Participación del Estudiante': return ShieldAlert;
      case 'Cultura y Comunicación': return Radio;
      default: return Sparkles;
    }
  };

  const filteredProposals = useMemo(() => {
    return allProposals.filter(p => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.position?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [allProposals, selectedCategory, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 animate-in fade-in duration-300">
      {/* Top Back Nav */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-[#003870] border border-slate-300 shadow-sm transition-colors text-xs font-black uppercase tracking-wider cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>VOLVER AL MENÚ</span>
        </button>
        <span className="text-xs font-black text-sky-800 bg-sky-100 px-3 py-1 rounded-full uppercase">
          {allProposals.length} Propuestas • Rareza Rara
        </span>
      </div>

      {/* Main Title & Bento Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-l-8 border-[#74ACDF] border-2 border-slate-200 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-black text-white bg-[#003870] px-2.5 py-1 rounded-md uppercase tracking-wider">
              PLAN DE GOBIERNO ESTUDIANTIL
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl font-black uppercase text-[#003870] italic tracking-tight mt-2">
              PROPUESTAS
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mt-1 font-semibold leading-relaxed">
              Todas las propuestas son de rareza <strong>RARA</strong>. Si todavía no conseguiste una propuesta en un sobre, su espacio permanecerá bloqueado.
            </p>
          </div>
          <span className="text-xs font-black text-slate-400">PÁG. 03</span>
        </div>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200 shadow-xl mb-8 space-y-3">
        {/* Search Input */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar propuestas (ej. Calculadoras, Fiesta de la Primavera, Vóley)..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#003870]"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 text-xs">
          <button
            onClick={() => {
              soundManager.playClick();
              setSelectedCategory('all');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-[#003870] text-white shadow-xs font-black'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            Todas ({allProposals.length})
          </button>
          {CATEGORIES_LIST.map(cat => {
            const Icon = getCategoryIcon(cat);
            const count = allProposals.filter(p => p.category === cat).length;
            const isSel = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isSel
                    ? 'bg-[#74ACDF] text-[#003870] shadow-xs font-black'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat}</span>
                <span className="text-[10px] opacity-75">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Proposals Grid */}
      {filteredProposals.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-slate-200">
          <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-heading text-lg font-black text-slate-600 uppercase">
            No se encontraron propuestas
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Probá con otro término de búsqueda o categoría.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredProposals.map(sticker => (
            <StickerCard
              key={sticker.id}
              sticker={sticker}
              isUnlocked={isUnlocked(sticker.id)}
              duplicateCount={duplicateCounts[sticker.id] || (isUnlocked(sticker.id) ? 1 : 0)}
              onSelect={onSelectSticker}
            />
          ))}
        </div>
      )}
    </div>
  );
};
