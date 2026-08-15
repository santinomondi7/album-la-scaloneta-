import React from 'react';
import { ToastNotification } from '../types';
import { Sparkles, Trophy, Star, Flame, Zap } from 'lucide-react';

interface PointsToastProps {
  toasts: ToastNotification[];
}

export const PointsToast: React.FC<PointsToastProps> = ({ toasts }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-16 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-xs sm:max-w-sm">
      {toasts.map(toast => {
        let Icon = Sparkles;
        let bgClass = 'bg-[#003870] text-white border-[#D4AF37]';
        let accentColor = '#D4AF37';

        if (toast.type === 'achievement') {
          Icon = Trophy;
          bgClass = 'bg-[#003870] text-white border-[#FEF08A]';
          accentColor = '#FEF08A';
        } else if (toast.type === 'bonus') {
          Icon = Flame;
          bgClass = 'bg-[#003870] text-white border-[#74ACDF]';
          accentColor = '#74ACDF';
        } else if (toast.type === 'legendary') {
          Icon = Star;
          bgClass = 'bg-gradient-to-r from-[#003870] to-[#002244] text-white border-[#D4AF37]';
          accentColor = '#D4AF37';
        }

        return (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-2xl border-2 shadow-2xl flex items-center gap-3 backdrop-blur-md animate-in slide-in-from-top-4 fade-in duration-300 ${bgClass}`}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 border"
              style={{ backgroundColor: `${accentColor}20`, borderColor: accentColor, color: accentColor }}
            >
              <Icon className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-heading text-xs sm:text-sm font-black uppercase tracking-wide truncate" style={{ color: accentColor }}>
                {toast.title}
              </p>
              {toast.subtitle && (
                <p className="text-[11px] text-slate-200 font-semibold line-clamp-1">
                  {toast.subtitle}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
