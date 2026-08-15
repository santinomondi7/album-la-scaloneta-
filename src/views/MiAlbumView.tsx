import React, { useState } from 'react';
import { ALL_STICKERS } from '../data/albumData';
import { Sticker, StickerRarity } from '../types';
import { StickerCard } from '../components/StickerCard';
import { ArrowLeft, Package, Sparkles, RotateCcw, Filter, Star, CheckCircle2, Layers } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface MiAlbumViewProps {
  onBack: () => void;
  isUnlocked: (id: string) => boolean;
  duplicateCounts?: Record<string, number>;
  totalDuplicates?: number;
  totalObtained?: number;
  onSelectSticker: (sticker: Sticker) => void;
  unlockedCount: number;
  totalCount: number;
  percentage: number;
  onGoToSobres: () => void;
  onResetProgress: () => void;
}

export const MiAlbumView: React.FC<MiAlbumViewProps> = ({
  onBack,
  isUnlocked,
  duplicateCounts = {},
  totalDuplicates = 0,
  totalObtained = 0,
  onSelectSticker,
  unlockedCount,
  totalCount,
  percentage,
  onGoToSobres,
  onResetProgress
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [rarityFilter, setRarityFilter] = useState<'all' | StickerRarity>('all');

  const filteredStickers = ALL_STICKERS.filter(s => {
    const unlocked = isUnlocked(s.id);
    if (filterMode === 'unlocked' && !unlocked) return false;
    if (filterMode === 'locked' && unlocked) return false;
    if (rarityFilter !== 'all' && s.rarity !== rarityFilter) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 animate-in fade-in duration-300">
      {/* Top Nav */}
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

        <button
          onClick={() => {
            soundManager.playClick();
            onGoToSobres();
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#D4AF37] hover:bg-[#c49f2b] text-[#003870] font-heading font-black text-xs uppercase tracking-wider rounded-xl shadow-md border-2 border-[#003870] cursor-pointer"
        >
          <Package className="w-4 h-4 text-[#003870]" />
          <span>Abrir Sobre</span>
        </button>
      </div>

      {/* Main Collection Stats Hero */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-l-8 border-[#74ACDF] border-2 border-slate-200 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black text-white bg-[#003870] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                ÁLBUM DIGITAL OFICIAL
              </span>
              <span className="text-xs font-black text-slate-400">{totalCount} FIGURITAS</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-4xl font-black uppercase text-[#003870] italic tracking-tight">
              MI COLECCIÓN
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-semibold">
              "Si no te tocó en un sobre, no la tenés." Conseguí sobres cada 2 horas para completar tu álbum.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playClick();
                if (window.confirm('¿Estás seguro de reiniciar tu colección y empezar de cero?')) {
                  onResetProgress();
                }
              }}
              className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-rose-600 text-xs font-semibold rounded-xl border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar Colección</span>
            </button>
          </div>
        </div>

        {/* 3 Explicit Collection Metric Counters (Rule #18) */}
        <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-100 text-center">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <div className="text-[10px] sm:text-xs font-black uppercase text-slate-400 tracking-wider">
              FIGURITAS ÚNICAS
            </div>
            <div className="font-heading text-xl sm:text-3xl font-black text-[#003870] mt-0.5">
              {unlockedCount} <span className="text-xs font-semibold text-slate-400">/ {totalCount}</span>
            </div>
            <div className="text-[10px] font-bold text-slate-500 mt-0.5">
              {percentage}% del álbum
            </div>
          </div>

          <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/80">
            <div className="text-[10px] sm:text-xs font-black uppercase text-amber-700 tracking-wider">
              REPETIDAS
            </div>
            <div className="font-heading text-xl sm:text-3xl font-black text-amber-900 mt-0.5">
              {totalDuplicates}
            </div>
            <div className="text-[10px] font-bold text-amber-700 mt-0.5">
              canjeadas por puntos
            </div>
          </div>

          <div className="bg-sky-50/60 p-3.5 rounded-2xl border border-sky-200/80">
            <div className="text-[10px] sm:text-xs font-black uppercase text-sky-700 tracking-wider">
              TOTAL OBTENIDAS
            </div>
            <div className="font-heading text-xl sm:text-3xl font-black text-[#003870] mt-0.5">
              {totalObtained}
            </div>
            <div className="text-[10px] font-bold text-sky-700 mt-0.5">
              en todos los sobres
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mt-5 border border-slate-200">
          <div
            className="h-full bg-gradient-to-r from-[#74ACDF] to-[#003870] rounded-full transition-all duration-500"
            style={{ width: `${Math.max(percentage, 2)}%` }}
          />
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        {/* Status Filters */}
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm text-xs font-bold w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => {
              soundManager.playClick();
              setFilterMode('all');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              filterMode === 'all'
                ? 'bg-[#003870] text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-[#003870]'
            }`}
          >
            Todas ({ALL_STICKERS.length})
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setFilterMode('unlocked');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              filterMode === 'unlocked'
                ? 'bg-emerald-600 text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-emerald-700'
            }`}
          >
            Conseguidas ({unlockedCount})
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setFilterMode('locked');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              filterMode === 'locked'
                ? 'bg-slate-700 text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Faltantes ({totalCount - unlockedCount})
          </button>
        </div>

        {/* Rarity Filters */}
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm text-[11px] font-black uppercase w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => {
              soundManager.playClick();
              setRarityFilter('all');
            }}
            className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              rarityFilter === 'all' ? 'bg-[#003870] text-white' : 'text-slate-500 hover:text-[#003870]'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setRarityFilter('common');
            }}
            className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              rarityFilter === 'common' ? 'bg-slate-600 text-white' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Común
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setRarityFilter('rare');
            }}
            className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              rarityFilter === 'rare' ? 'bg-sky-600 text-white' : 'text-sky-600 hover:text-sky-800'
            }`}
          >
            Rara
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setRarityFilter('epic');
            }}
            className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              rarityFilter === 'epic' ? 'bg-purple-600 text-white' : 'text-purple-600 hover:text-purple-800'
            }`}
          >
            Épica
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setRarityFilter('legendary');
            }}
            className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              rarityFilter === 'legendary' ? 'bg-[#D4AF37] text-[#003870] font-black' : 'text-amber-600 hover:text-amber-800'
            }`}
          >
            <Star className="w-2.5 h-2.5 fill-current" /> Legendaria
          </button>
        </div>
      </div>

      {/* Stickers Grid */}
      {filteredStickers.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-slate-200">
          <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-heading text-lg font-black text-slate-600 uppercase">
            No hay figuritas con este filtro
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Probá seleccionando otro filtro de rareza o estado.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {filteredStickers.map(sticker => {
            const unlocked = isUnlocked(sticker.id);
            const count = duplicateCounts[sticker.id] || (unlocked ? 1 : 0);

            return (
              <StickerCard
                key={sticker.id}
                sticker={sticker}
                isUnlocked={unlocked}
                duplicateCount={count}
                onSelect={onSelectSticker}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
