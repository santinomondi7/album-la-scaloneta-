import React from 'react';
import { ActiveSection } from '../types';
import { Home, Package, Gamepad2, BookOpen, User } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface BottomNavProps {
  activeSection: ActiveSection;
  setActiveSection: (sec: ActiveSection) => void;
  unlockedCount: number;
  totalCount: number;
  isPackReady: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeSection,
  setActiveSection,
  unlockedCount,
  totalCount,
  isPackReady
}) => {
  const tabs = [
    { id: 'portada' as ActiveSection, label: 'Inicio', icon: Home },
    { id: 'juegos' as ActiveSection, label: 'Juegos', icon: Gamepad2 },
    { id: 'sobres' as ActiveSection, label: 'Sobres', icon: Package, highlight: isPackReady },
    { id: 'mialbum' as ActiveSection, label: 'Álbum', icon: BookOpen, badge: `${unlockedCount}/${totalCount}` },
    { id: 'perfil' as ActiveSection, label: 'Perfil', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#003870] border-t-4 border-[#D4AF37] px-2 py-2 shadow-2xl flex items-center justify-around">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeSection === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => {
              soundManager.playClick();
              setActiveSection(tab.id);
            }}
            className="flex flex-col items-center gap-1 group relative cursor-pointer min-w-[52px]"
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                tab.highlight && !isActive
                  ? 'bg-[#D4AF37] text-[#003870] font-black animate-bounce shadow-md'
                  : isActive
                  ? 'bg-[#74ACDF] text-[#003870] font-black shadow-sm scale-105'
                  : 'bg-white/10 text-white group-hover:bg-white/20'
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>
            <span
              className={`text-[9px] font-black uppercase tracking-wider ${
                isActive ? 'text-[#FEF08A]' : 'text-slate-300'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
