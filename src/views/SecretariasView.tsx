import React from 'react';
import { SECRETARIAS_DATA, ALL_STICKERS } from '../data/albumData';
import { Sticker } from '../types';
import { StickerCard } from '../components/StickerCard';
import { ArrowLeft, Briefcase, Megaphone, Trophy, Coins, FileText, Users, Smile } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface SecretariasViewProps {
  onBack: () => void;
  isUnlocked: (id: string) => boolean;
  duplicateCounts?: Record<string, number>;
  onSelectSticker: (sticker: Sticker) => void;
}

export const SecretariasView: React.FC<SecretariasViewProps> = ({
  onBack,
  isUnlocked,
  duplicateCounts = {},
  onSelectSticker
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Megaphone': return Megaphone;
      case 'Trophy': return Trophy;
      case 'Coins': return Coins;
      case 'FileText': return FileText;
      case 'Users': return Users;
      case 'Smile': return Smile;
      default: return Briefcase;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Top Navigation */}
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
        <span className="text-xs font-black text-purple-700 bg-purple-100 px-3 py-1 rounded-full uppercase">
          6 Secretarías • 12 Figuritas Épicas
        </span>
      </div>

      {/* Page Title & Bento Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-l-8 border-purple-600 border-2 border-slate-200 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-black text-white bg-[#003870] px-2.5 py-1 rounded-md uppercase tracking-wider">
              ORGANIZACIÓN DEL CENTRO
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl font-black uppercase text-[#003870] italic tracking-tight mt-2">
              LAS SECRETARÍAS
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mt-1 font-semibold leading-relaxed">
              Cada secretaría coordina un área fundamental para el colegio. Todas sus figuritas son de rareza <strong>ÉPICA</strong> y se consiguen en los sobres.
            </p>
          </div>
          <span className="text-xs font-black text-slate-400">PÁG. 02</span>
        </div>
      </div>

      {/* Secretarías Bento Cards */}
      <div className="space-y-6">
        {SECRETARIAS_DATA.map((sec, idx) => {
          const Icon = getIcon(sec.iconName);
          const memberStickers = sec.members.map(m => {
            return ALL_STICKERS.find(s => s.number === m.stickerNumber)!;
          });

          return (
            <div
              key={sec.id}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border-2 border-slate-200 border-l-8 border-purple-500"
            >
              {/* Header inside card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-900 text-[#FEF08A] flex items-center justify-center font-black shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-purple-700 uppercase tracking-widest">
                      SECRETARÍA #0{idx + 1} • RAREZA ÉPICA
                    </span>
                    <h3 className="font-heading text-xl sm:text-2xl font-black uppercase text-[#003870] italic">
                      {sec.name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 max-w-md font-medium leading-relaxed sm:text-right">
                  {sec.description}
                </p>
              </div>

              {/* Pair of Sticker Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                {memberStickers.map(sticker => {
                  if (!sticker) return null;
                  return (
                    <div key={sticker.id} className="w-full">
                      <StickerCard
                        sticker={sticker}
                        isUnlocked={isUnlocked(sticker.id)}
                        duplicateCount={duplicateCounts[sticker.id] || (isUnlocked(sticker.id) ? 1 : 0)}
                        onSelect={onSelectSticker}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
