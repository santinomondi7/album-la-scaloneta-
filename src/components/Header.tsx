import React from 'react';
import { ActiveSection } from '../types';
import { Volume2, VolumeX, QrCode, Share2, Package, Star, Gamepad2, User, Trophy } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { useAuth } from '../context/AuthContext';
import { ScalonetaEmblem } from './ScalonetaEmblem';

interface HeaderProps {
  activeSection: ActiveSection;
  setActiveSection: (sec: ActiveSection) => void;
  unlockedCount: number;
  totalCount: number;
  percentage: number;
  points: number;
  isPackReady: boolean;
  formattedCountdown: string;
  onOpenPackModal: () => void;
  onOpenShareModal: () => void;
  onOpenQRModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  setActiveSection,
  unlockedCount,
  totalCount,
  percentage,
  points,
  isPackReady,
  formattedCountdown,
  onOpenPackModal,
  onOpenShareModal,
  onOpenQRModal
}) => {
  const { userProfile } = useAuth();
  const [isMuted, setIsMuted] = React.useState(soundManager.isSoundMuted());

  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const navItems: { id: ActiveSection; label: string }[] = [
    { id: 'portada', label: 'Inicio' },
    { id: 'menu', label: 'Menú' },
    { id: 'sobres', label: 'Sobres' },
    { id: 'juegos', label: 'Minijuegos' },
    { id: 'equipo', label: 'Equipo' },
    { id: 'secretarias', label: 'Secretarías' },
    { id: 'propuestas', label: 'Propuestas' },
    { id: 'especiales', label: 'Especiales' },
    { id: 'mialbum', label: 'Álbum' },
    { id: 'perfil', label: 'Mi Perfil' },
    { id: 'logros', label: 'Logros' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#74ACDF] border-b-4 border-[#003870] shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo and Title */}
          <div
            onClick={() => {
              soundManager.playClick();
              setActiveSection('portada');
            }}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-full flex items-center justify-center border-2 border-[#003870] shadow-sm group-hover:scale-105 transition-transform shrink-0 p-0.5">
              <ScalonetaEmblem size="sm" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white italic drop-shadow-sm leading-none">
                  La Scaloneta <span className="text-[#003870]">2026</span>
                </h1>
                <span className="hidden sm:inline-block text-[#D4AF37] font-black text-xs">⭐⭐⭐</span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-bold text-[#003870] uppercase tracking-widest leading-tight mt-0.5">
                Álbum Oficial Centro de Estudiantes
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#003870]/15 p-1 rounded-xl border border-white/25 backdrop-blur-xs">
            {navItems.slice(0, 7).map(item => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveSection(item.id);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-[#003870] shadow-sm border border-[#003870]/20'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Quick dropdown / secondary tabs */}
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveSection('mialbum');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeSection === 'mialbum'
                  ? 'bg-white text-[#003870] shadow-sm border border-[#003870]/20'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Álbum
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveSection('perfil');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeSection === 'perfil'
                  ? 'bg-white text-[#003870] shadow-sm border border-[#003870]/20'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Perfil
            </button>
          </nav>

          {/* Right Action Bento Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* User Profile Avatar / ID Badge */}
            {userProfile && (
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveSection('perfil');
                }}
                className="flex items-center gap-1.5 bg-white/90 hover:bg-white text-[#003870] px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl border border-[#003870]/30 shadow-xs transition-transform hover:scale-105 cursor-pointer"
                title={`Perfil: ${userProfile.displayName} (${userProfile.collectorId})`}
              >
                <span className="text-base sm:text-lg leading-none">{userProfile.avatarEmoji || '⚽'}</span>
                <span className="hidden lg:inline text-xs font-black uppercase tracking-wider text-[#003870] max-w-[80px] truncate">
                  {userProfile.displayName.split(' ')[0]}
                </span>
              </button>
            )}

            {/* Points Badge */}
            <div
              onClick={() => {
                soundManager.playClick();
                setActiveSection('perfil');
              }}
              className="flex items-center gap-1.5 bg-[#003870] text-white px-2.5 sm:px-3 py-1.5 rounded-xl border border-white/30 shadow-xs hover:bg-[#002850] transition-colors cursor-pointer select-none"
              title="Tus Puntos"
            >
              <Star className="w-3.5 h-3.5 text-[#FEF08A] fill-[#FEF08A]" />
              <span className="font-heading text-xs sm:text-sm font-black text-[#FEF08A]">
                {points}
              </span>
            </div>

            {/* Quick Open Pack / Sobres Button with Status */}
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveSection('sobres');
              }}
              className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 font-heading text-xs font-black uppercase tracking-wider rounded-xl shadow-md border-2 border-[#003870] flex items-center gap-1.5 cursor-pointer transition-all shrink-0 ${
                isPackReady
                  ? 'bg-[#D4AF37] hover:bg-[#c49f2b] text-[#003870] animate-pulse'
                  : 'bg-white/90 hover:bg-white text-[#003870]'
              }`}
              title="Abrir Sobre de Figuritas"
            >
              <Package className="w-4 h-4 text-[#003870]" />
              <span className="hidden sm:inline">
                {isPackReady ? '¡Sobre Listo!' : formattedCountdown}
              </span>
              <span className="sm:hidden">
                {isPackReady ? '¡Sobre!' : 'Sobre'}
              </span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 bg-white/80 hover:bg-white text-[#003870] rounded-xl border border-[#003870]/30 transition-colors cursor-pointer shrink-0"
              title={isMuted ? 'Activar Sonido' : 'Silenciar'}
              aria-label="Sonido"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* QR Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenQRModal();
              }}
              className="hidden md:flex p-2 bg-white/80 hover:bg-white text-[#003870] rounded-xl border border-[#003870]/30 transition-colors cursor-pointer shrink-0"
              title="Código QR Afiche"
              aria-label="Código QR"
            >
              <QrCode className="w-4 h-4" />
            </button>

            {/* Share Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenShareModal();
              }}
              className="p-2 bg-[#003870] hover:bg-[#002850] text-white rounded-xl border border-white/40 transition-colors cursor-pointer shrink-0 shadow-xs"
              title="Compartir Álbum"
              aria-label="Compartir"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
