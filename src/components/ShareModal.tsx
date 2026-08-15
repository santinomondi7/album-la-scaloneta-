import React from 'react';
import { X, Share2, MessageCircle, Instagram, QrCode, Copy, Check, Trophy } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedCount: number;
  totalCount: number;
  percentage: number;
  onOpenQR: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  unlockedCount,
  totalCount,
  percentage,
  onOpenQR
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const shareTitle = 'Álbum Oficial de La Scaloneta 2026';
  const shareText = `¡Ya tengo ${unlockedCount}/${totalCount} figuritas (${percentage}%) en el Álbum Oficial de La Scaloneta! 🏆⭐⭐⭐ Conocé todas las propuestas para el Centro de Estudiantes aquí:`;
  const shareUrl = window.location.href;

  const handleCopyLink = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    soundManager.playClick();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
    window.open(url, '_blank');
  };

  const handleNativeShare = () => {
    soundManager.playClick();
    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl,
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl border-4 border-[#003870] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#74ACDF] border-b-2 border-[#003870] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#003870]" />
            <span className="font-heading text-sm font-black uppercase text-white tracking-wider">
              COMPARTIR TU COLECCIÓN
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-white/80 hover:bg-white text-[#003870] border border-[#003870]/30 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {/* Card Preview Banner Bento */}
          <div className="bg-slate-50 border-2 border-[#74ACDF] rounded-xl p-4 text-center mb-6">
            <div className="w-12 h-12 bg-white rounded-full border-2 border-[#003870] flex items-center justify-center font-heading text-xl font-black italic text-[#003870] mx-auto mb-2 shadow-xs">
              LS
            </div>
            <h3 className="font-heading text-lg font-black uppercase text-[#003870] italic">
              LA SCALONETA 2026
            </h3>
            <p className="text-xs text-[#74ACDF] font-bold uppercase mt-0.5">
              Álbum Oficial Centro de Estudiantes
            </p>
            <div className="mt-3 inline-block bg-[#003870] text-white px-3 py-1 rounded-full text-xs font-black">
              FIGURITAS: {unlockedCount} / {totalCount} ({percentage}%)
            </div>
          </div>

          {/* Share Actions Grid */}
          <div className="grid grid-cols-1 gap-2.5">
            {/* WhatsApp */}
            <button
              onClick={handleWhatsAppShare}
              className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading text-xs font-black uppercase tracking-wider rounded-xl shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Compartir en WhatsApp</span>
            </button>

            {/* QR Afiches */}
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
                onOpenQR();
              }}
              className="w-full py-3 px-4 bg-[#003870] hover:bg-[#002244] text-white font-heading text-xs font-black uppercase tracking-wider rounded-xl shadow-sm border border-[#D4AF37] flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <QrCode className="w-4 h-4 text-[#D4AF37]" />
              <span>Ver Código QR para Afiches</span>
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-[#003870] font-heading text-xs font-black uppercase tracking-wider rounded-xl border border-slate-300 flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>¡Enlace Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Enlace del Álbum</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
