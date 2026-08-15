import React from 'react';
import { X, QrCode, Download, Copy, Check, Printer } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.href;
  // Standard SVG QR Code renderer via quickchart or visual SVG
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    currentUrl
  )}&bgcolor=ffffff&color=003870&margin=10`;

  const handleCopyLink = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm bg-white rounded-2xl border-4 border-[#003870] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-center"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#74ACDF] border-b-2 border-[#003870] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#003870]" />
            <span className="font-heading text-sm font-black uppercase text-white tracking-wider">
              CÓDIGO QR OFICIAL
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
          {/* Printable Bento Card */}
          <div className="bg-slate-50 border-2 border-[#003870] rounded-2xl p-4 shadow-sm mb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="font-heading text-sm font-black uppercase text-[#003870] italic">
                LA SCALONETA 2026
              </span>
              <span className="text-[#D4AF37] font-black">⭐⭐⭐</span>
            </div>
            <p className="text-[10px] font-bold text-[#74ACDF] uppercase tracking-wider mb-3">
              Escaneá para abrir el álbum en tu celular
            </p>

            {/* QR Image */}
            <div className="w-48 h-48 mx-auto bg-white p-2 rounded-xl border border-slate-300 shadow-inner flex items-center justify-center">
              <img
                src={qrApiUrl}
                alt="QR Code Álbum La Scaloneta"
                className="w-full h-full object-contain"
              />
            </div>

            <p className="text-[10px] text-slate-500 font-semibold mt-2">
              Ideal para imprimir en volantes, folletos y afiches escolares.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={handleCopyLink}
              className="w-full py-2.5 px-4 bg-[#74ACDF] hover:bg-[#003870] text-white font-heading text-xs font-black uppercase tracking-wider rounded-xl shadow-xs border border-[#003870] flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>¡Enlace Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Enlace Directo</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-[#003870] font-heading text-xs font-black uppercase tracking-wider rounded-xl border border-slate-300 flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Afiche</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
