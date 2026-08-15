import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { soundManager } from '../utils/audio';
import { X, User, GraduationCap, Check } from 'lucide-react';

const AVATAR_OPTIONS = ['⚽', '🏆', '⭐', '🇦🇷', '🔥', '🦁', '⚡', '🎯', '🦅', '🧤', '🥇', '👑'];

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const { userProfile, updateProfileDetails, isSaving } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [schoolCourse, setSchoolCourse] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('⚽');

  useEffect(() => {
    if (userProfile) {
      setDisplayName(userProfile.displayName || '');
      setSchoolCourse(userProfile.schoolCourse || '');
      setSelectedAvatar(userProfile.avatarEmoji || '⚽');
    }
  }, [userProfile, isOpen]);

  if (!isOpen || !userProfile) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) return;

    try {
      await updateProfileDetails(displayName.trim(), schoolCourse.trim(), selectedAvatar);
      soundManager.playSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border-4 border-[#74ACDF] relative">
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-300 mx-auto flex items-center justify-center text-3xl mb-2">
            {selectedAvatar}
          </div>
          <h2 className="font-heading text-xl font-black uppercase text-[#003870]">
            Editar Mi Perfil
          </h2>
          <p className="text-xs text-slate-500">
            ID de Coleccionista: <span className="font-mono font-black text-[#003870]">{userProfile.collectorId}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase text-[#003870] mb-2 tracking-wider">
              Elegir Avatar
            </label>
            <div className="grid grid-cols-6 gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200">
              {AVATAR_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => {
                    setSelectedAvatar(emoji);
                    soundManager.playClick();
                  }}
                  className={`h-10 rounded-xl text-xl flex items-center justify-center transition-all cursor-pointer ${
                    selectedAvatar === emoji
                      ? 'bg-amber-300 border-2 border-[#003870] scale-110 shadow-sm'
                      : 'hover:bg-white'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-[#003870] mb-1 tracking-wider">
              Nombre o Apodo
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                maxLength={30}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-bold text-slate-800 focus:outline-hidden focus:border-[#74ACDF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-[#003870] mb-1 tracking-wider">
              Curso / División
            </label>
            <div className="relative">
              <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={schoolCourse}
                onChange={(e) => setSchoolCourse(e.target.value)}
                placeholder="Ej. 4° B"
                maxLength={25}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-bold text-slate-800 focus:outline-hidden focus:border-[#74ACDF]"
              />
            </div>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-heading font-black text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-3 bg-[#003870] hover:bg-[#002850] text-white font-heading font-black text-xs uppercase tracking-wider rounded-xl shadow-md border border-[#D4AF37] flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>{isSaving ? 'Guardando...' : 'Guardar Cambios'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
