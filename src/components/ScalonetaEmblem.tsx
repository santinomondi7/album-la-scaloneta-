import React, { useState } from 'react';

interface ScalonetaEmblemProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  watermark?: boolean;
}

export const ScalonetaEmblem: React.FC<ScalonetaEmblemProps> = ({
  className = '',
  size = 'md',
  watermark = false
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    hero: 'w-32 h-32 sm:w-40 sm:h-40'
  }[size];

  if (watermark) {
    return (
      <div className={`pointer-events-none select-none opacity-10 flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 120 140" className="w-full h-full fill-current" aria-hidden="true">
          <path d="M 60 5 Q 110 5 110 50 Q 110 100 60 135 Q 10 100 10 50 Q 10 5 60 5 Z" fill="#003870" />
          <path d="M 60 15 Q 100 15 100 50 Q 100 92 60 125 Q 20 92 20 50 Q 20 15 60 15 Z" fill="#74ACDF" opacity="0.4" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}>
      {!imgError ? (
        <img
          src="/images/emblem/la-scaloneta.png"
          alt="Emblema Oficial La Scaloneta"
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-contain drop-shadow-md transition-transform duration-300"
        />
      ) : (
        /* High-Quality Scaloneta Crest Vector Fallback */
        <div className="w-full h-full relative flex items-center justify-center group">
          <svg viewBox="0 0 120 140" className="w-full h-full drop-shadow-md" aria-label="Escudo La Scaloneta">
            {/* Outer Shield with Gold/Navy Rim */}
            <defs>
              <linearGradient id="shieldBg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#74ACDF" />
                <stop offset="40%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#74ACDF" />
              </linearGradient>
              <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#9A7B1C" />
              </linearGradient>
            </defs>

            {/* Shield Outline */}
            <path
              d="M 60 6 Q 112 6 112 52 Q 112 102 60 134 Q 8 102 8 52 Q 8 6 60 6 Z"
              fill="#003870"
              stroke="url(#goldRim)"
              strokeWidth="4"
            />

            {/* Inner Shield Body */}
            <path
              d="M 60 14 Q 104 14 104 52 Q 104 94 60 124 Q 16 94 16 52 Q 16 14 60 14 Z"
              fill="url(#shieldBg)"
            />

            {/* Vertical Argentine Stripes */}
            <clipPath id="innerShieldClip">
              <path d="M 60 14 Q 104 14 104 52 Q 104 94 60 124 Q 16 94 16 52 Q 16 14 60 14 Z" />
            </clipPath>

            <g clipPath="url(#innerShieldClip)">
              {/* Celeste left stripe */}
              <rect x="16" y="14" width="29" height="110" fill="#74ACDF" opacity="0.9" />
              {/* White center stripe */}
              <rect x="45" y="14" width="30" height="110" fill="#FFFFFF" />
              {/* Celeste right stripe */}
              <rect x="75" y="14" width="29" height="110" fill="#74ACDF" opacity="0.9" />

              {/* Sun/Gold Star in center */}
              <circle cx="60" cy="55" r="14" fill="#FEF08A" stroke="#D4AF37" strokeWidth="2" />
              <circle cx="60" cy="55" r="8" fill="#D4AF37" />
            </g>

            {/* Shield Top Header Ribbon */}
            <path
              d="M 22 28 Q 60 22 98 28 L 98 42 Q 60 36 22 42 Z"
              fill="#003870"
            />
            <text
              x="60"
              y="37"
              textAnchor="middle"
              fill="#FEF08A"
              fontSize="8"
              fontFamily="sans-serif"
              fontWeight="900"
              letterSpacing="1"
            >
              LA SCALONETA
            </text>

            {/* Big Monogram "LS" in Center */}
            <text
              x="60"
              y="82"
              textAnchor="middle"
              fill="#003870"
              fontSize="24"
              fontFamily="sans-serif"
              fontWeight="900"
              fontStyle="italic"
            >
              LS
            </text>

            {/* 3 Stars at Bottom */}
            <text
              x="60"
              y="102"
              textAnchor="middle"
              fill="#D4AF37"
              fontSize="11"
              fontWeight="900"
            >
              ★ ★ ★
            </text>

            {/* Year / CE tag */}
            <text
              x="60"
              y="114"
              textAnchor="middle"
              fill="#003870"
              fontSize="6"
              fontFamily="sans-serif"
              fontWeight="800"
            >
              CENTRO 2026
            </text>
          </svg>
        </div>
      )}
    </div>
  );
};
