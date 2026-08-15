import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { soundManager } from '../utils/audio';
import { Sparkles, User, GraduationCap, KeyRound, Search, CheckCircle2 } from 'lucide-react';

const AVATAR_OPTIONS = ['⚽', '🏆', '⭐', '🇦🇷', '🔥', '🦁', '⚡', '🎯', '🦅', '🧤', '🥇', '👑'];

interface OnboardingProfileModalProps {
  isOpen: boolean;
}

export const OnboardingProfileModal: React.FC<OnboardingProfileModalProps> = ({ isOpen }) => {
  const { createProfile, loadProfileByCollectorId } = useAuth();

  const [mode, setMode] = useState<'create_guest' | 'recover_id'>('create_guest');
  const [displayName, setDisplayName] = useState('');
  const [schoolCourse, setSchoolCourse] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('⚽');
  const [collectorIdInput, setCollectorIdInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleCreateGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      setErrorMessage('Por favor ingresá tu nombre o apodo');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    try {
      soundManager.playGoldFanfare();
      await createProfile(displayName.trim(), schoolCourse.trim(), selectedAvatar);
    } catch (err: any) {
      console.error('Error creating profile:', err);
      setErrorMessage(err.message || 'Hubo un error al crear tu perfil. Intentá de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRecoverById = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collectorIdInput.trim()) {
      setErrorMessage('Ingresá tu ID de Coleccionista (ej. SC-4821)');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const success = await loadProfileByCollectorId(collectorIdInput.trim());
      if (success) {
        soundManager.playSuccess();
      } else {
        setErrorMessage('No encontramos ninguna colección con ese código. Verificá que esté bien escrito o creá una nueva.');
      }
    } catch (err: any) {
      console.error('Error recovering profile:', err);
      setErrorMessage('No se pudo recuperar la colección. Verificá tu conexión.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#74ACDF] max-h-[94vh] overflow-y-auto relative">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#003870] to-[#74ACDF] border-4 border-[#D4AF37] mx-auto flex items-center justify-center shadow-lg mb-3 text-3xl">
            {mode === 'create_guest' ? selectedAvatar : '🔍'}
          </div>
          <span className="text-[10px] font-black text-sky-800 bg-sky-100 px-3 py-0.5 rounded-full uppercase tracking-wider">
            CENTRO DE ESTUDIANTES 2026
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-black uppercase text-[#003870] italic tracking-tight mt-1">
            {mode === 'create_guest' ? 'CREÁ TU PERFIL' : 'RECUPERAR ÁLBUM'}
          </h2>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            {mode === 'create_guest'
              ? 'Tu colección se guardará en la nube con un código único de coleccionista.'
              : 'Ingresá tu código SC-XXXX para restaurar tus figuritas y puntos.'}
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-5">
          <button
            type="button"
            onClick={() => {
              setMode('create_guest');
              setErrorMessage('');
            }}
            className={`flex-1 py-2 text-xs font-heading font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
              mode === 'create_guest'
                ? 'bg-[#003870] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Nuevo Coleccionista
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('recover_id');
              setErrorMessage('');
            }}
            className={`flex-1 py-2 text-xs font-heading font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
              mode === 'recover_id'
                ? 'bg-[#003870] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Tengo un Código ID
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-300 rounded-xl text-rose-700 text-xs font-bold text-center">
            {errorMessage}
          </div>
        )}

        {/* Quick Profile Creation Form */}
        {mode === 'create_guest' && (
          <form onSubmit={handleCreateGuest} className="space-y-4">
            {/* Avatar picker */}
            <div>
              <label className="block text-xs font-black uppercase text-[#003870] mb-2 tracking-wider">
                Elegí tu Avatar
              </label>
              <div className="grid grid-cols-6 gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                {AVATAR_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      setSelectedAvatar(emoji);
                      soundManager.playClick();
                    }}
                    className={`h-11 rounded-xl text-xl flex items-center justify-center transition-all cursor-pointer ${
                      selectedAvatar === emoji
                        ? 'bg-amber-300 border-2 border-[#003870] scale-110 shadow-md'
                        : 'hover:bg-white hover:scale-105'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Display Name */}
            <div>
              <label className="block text-xs font-black uppercase text-[#003870] mb-1.5 tracking-wider">
                Tu Nombre o Apodo *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Ej. Lucas Gómez"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  maxLength={30}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-bold text-slate-800 focus:outline-hidden focus:border-[#74ACDF] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* School Course */}
            <div>
              <label className="block text-xs font-black uppercase text-[#003870] mb-1.5 tracking-wider">
                Curso / División (Opcional)
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Ej. 4° B, 1° A, 6° Economía..."
                  value={schoolCourse}
                  onChange={(e) => setSchoolCourse(e.target.value)}
                  maxLength={25}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-bold text-slate-800 focus:outline-hidden focus:border-[#74ACDF] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#003870] to-[#002244] hover:from-[#002244] hover:to-[#001830] text-white font-heading font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl border-2 border-[#D4AF37] flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Guardando en la nube...</span>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>¡EMPEZAR A COLECCIONAR!</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-center text-slate-400 font-semibold pt-1">
              ✨ Recibirás 50 puntos de bienvenida y tu primer sobre listo para abrir.
            </p>
          </form>
        )}

        {/* Recover by Collector ID Form */}
        {mode === 'recover_id' && (
          <form onSubmit={handleRecoverById} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase text-[#003870] mb-1.5 tracking-wider">
                Código de Coleccionista *
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Ej. SC-7492"
                  value={collectorIdInput}
                  onChange={(e) => setCollectorIdInput(e.target.value.toUpperCase())}
                  maxLength={10}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl text-base font-mono font-black text-slate-800 tracking-widest focus:outline-hidden focus:border-[#74ACDF] focus:bg-white uppercase"
                />
              </div>
              <p className="text-[11px] text-slate-400 font-medium mt-1.5">
                El código figura en la sección de "Perfil" de tu cuenta anterior.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#003870] hover:bg-[#002850] text-white font-heading font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl border-2 border-[#D4AF37] flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Buscando en la nube...</span>
              ) : (
                <>
                  <Search className="w-4 h-4 text-amber-300" />
                  <span>RESTAURAR MI COLECCIÓN</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
