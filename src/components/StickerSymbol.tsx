import React from 'react';
import { StickerRarity } from '../types';
import { ScalonetaEmblem } from './ScalonetaEmblem';

interface StickerSymbolProps {
  stickerNumber: number;
  rarity: StickerRarity;
  size?: 'sm' | 'md' | 'lg' | 'modal';
  className?: string;
  isUnlocked?: boolean;
}

/**
 * StickerSymbol: High-contrast, iconic insignia vector badges for the team & secretarias.
 * Designed for maximum clarity and bold readability at any card size.
 */
export const StickerSymbol: React.FC<StickerSymbolProps> = ({
  stickerNumber,
  rarity,
  size = 'md',
  className = '',
  isUnlocked = true
}) => {
  if (!isUnlocked) {
    return null;
  }

  const containerSizes = {
    sm: 'w-16 h-20',
    md: 'w-full aspect-[4/5] max-h-48 sm:max-h-56',
    lg: 'w-full aspect-[4/5] max-h-64 sm:max-h-72',
    modal: 'w-full aspect-[4/5] max-h-60 sm:max-h-72'
  }[size];

  // Helper renderer for each official team member
  const renderSymbolContent = () => {
    switch (stickerNumber) {
      // 00. ESCUDO LA SCALONETA
      case 0:
        return (
          <div className="w-full h-full flex items-center justify-center p-2">
            <ScalonetaEmblem size={size === 'sm' ? 'sm' : size === 'lg' || size === 'modal' ? 'xl' : 'lg'} />
          </div>
        );

      // 01. SANTINO MONDINO - PRESIDENTE (LEGENDARIA)
      // Símbolo: Cinta de Capitán Albiceleste con 'C' dorada + Gran Copa Trofeo + Laureles y 3 Estrellas
      case 1:
        return (
          <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-lg" aria-label="Cinta de Capitán y Trofeo">
            <defs>
              <linearGradient id="goldCapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF9C4" />
                <stop offset="35%" stopColor="#F59E0B" />
                <stop offset="75%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
              <linearGradient id="argCapBands" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#74ACDF" />
                <stop offset="33%" stopColor="#74ACDF" />
                <stop offset="33%" stopColor="#FFFFFF" />
                <stop offset="66%" stopColor="#FFFFFF" />
                <stop offset="66%" stopColor="#74ACDF" />
                <stop offset="100%" stopColor="#74ACDF" />
              </linearGradient>
            </defs>

            {/* Radiant Background Aura */}
            <circle cx="100" cy="115" r="75" fill="#FEF08A" opacity="0.4" />

            {/* 3 Golden Stars Top */}
            <g fill="url(#goldCapGrad)" stroke="#003870" strokeWidth="1">
              <polygon points="100,12 103,22 114,22 105,28 108,38 100,32 92,38 95,28 86,22 97,22" />
              <polygon points="70,22 72,29 80,29 74,34 76,41 70,37 64,41 66,34 60,29 68,29" />
              <polygon points="130,22 132,29 140,29 134,34 136,41 130,37 124,41 126,34 120,29 128,29" />
            </g>

            {/* Golden Laurels */}
            <g stroke="#D4AF37" strokeWidth="3" fill="none" opacity="0.9">
              <path d="M 40 160 C 20 115 28 65 60 42" />
              <path d="M 160 160 C 180 115 172 65 140 42" />
              <circle cx="30" cy="120" r="5" fill="#D4AF37" />
              <circle cx="34" cy="90" r="5" fill="#D4AF37" />
              <circle cx="46" cy="65" r="5" fill="#D4AF37" />
              <circle cx="170" cy="120" r="5" fill="#D4AF37" />
              <circle cx="166" cy="90" r="5" fill="#D4AF37" />
              <circle cx="154" cy="65" r="5" fill="#D4AF37" />
            </g>

            {/* Big Golden Champions Trophy */}
            <g transform="translate(100, 95)">
              {/* Handles */}
              <path d="M -38 -20 C -62 -20 -60 16 -32 24" stroke="url(#goldCapGrad)" strokeWidth="7" fill="none" strokeLinecap="round" />
              <path d="M 38 -20 C 62 -20 60 16 32 24" stroke="url(#goldCapGrad)" strokeWidth="7" fill="none" strokeLinecap="round" />
              {/* Cup */}
              <path d="M -34 -28 L 34 -28 C 34 18 22 45 0 48 C -22 45 -34 18 -34 -28 Z" fill="url(#goldCapGrad)" stroke="#003870" strokeWidth="3" />
              {/* Cup Stem & Pedestal */}
              <rect x="-9" y="48" width="18" height="18" fill="url(#goldCapGrad)" stroke="#003870" strokeWidth="2" />
              <path d="M -28 66 L 28 66 L 34 78 L -34 78 Z" fill="#003870" stroke="#D4AF37" strokeWidth="2.5" />
              <text x="0" y="10" textAnchor="middle" fill="#003870" fontSize="18" fontWeight="900" fontStyle="italic">LS</text>
            </g>

            {/* Captain's Armband (Brazalete de Capitán) */}
            <g transform="translate(100, 200)">
              <rect x="-76" y="-22" width="152" height="44" rx="10" fill="url(#argCapBands)" stroke="#003870" strokeWidth="3.5" />
              <rect x="-70" y="-17" width="140" height="34" rx="7" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="6,4" />
              {/* Central 'C' Seal */}
              <circle cx="0" cy="0" r="16" fill="#003870" stroke="#FEF08A" strokeWidth="2.5" />
              <text x="0" y="7" textAnchor="middle" fill="#FEF08A" fontSize="20" fontWeight="900" fontFamily="sans-serif">C</text>
              <text x="-44" y="4" textAnchor="middle" fill="#003870" fontSize="9" fontWeight="900">CAPITÁN</text>
              <text x="44" y="4" textAnchor="middle" fill="#003870" fontSize="9" fontWeight="900">2026</text>
            </g>
          </svg>
        );

      // 02. HELENA VERCELLONE - VICEPRESIDENTA (LEGENDARIA)
      // Símbolo: Medalla de Liderazgo + Brújula de Estrategia de 8 puntas + Banda Subcapitana
      case 2:
        return (
          <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-lg" aria-label="Insignia de Estrategia y Liderazgo">
            <defs>
              <linearGradient id="goldHelenaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="35%" stopColor="#FBBF24" />
                <stop offset="70%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
            </defs>

            <circle cx="100" cy="105" r="75" fill="#FEF08A" opacity="0.3" />

            {/* Grand Strategic Medallion */}
            <g transform="translate(100, 100)">
              {/* Outer Golden Ring */}
              <circle cx="0" cy="0" r="70" fill="#003870" stroke="url(#goldHelenaGrad)" strokeWidth="5" />
              <circle cx="0" cy="0" r="58" fill="none" stroke="#74ACDF" strokeWidth="2.5" strokeDasharray="5,4" />

              {/* 8-point Strategy Star */}
              <polygon points="0,-52 11,-14 52,0 11,14 0,52 -11,14 -52,0 -11,-14" fill="url(#goldHelenaGrad)" stroke="#003870" strokeWidth="2" />
              <polygon points="0,-40 8,-10 40,0 8,10 0,40 -8,10 -40,0 -8,-10" fill="#FFF9C4" />

              {/* Center Monogram */}
              <circle cx="0" cy="0" r="22" fill="#003870" stroke="#FEF08A" strokeWidth="2.5" />
              <text x="0" y="7" textAnchor="middle" fill="#FEF08A" fontSize="16" fontWeight="900">VC</text>

              {/* Stars on cardinals */}
              <text x="0" y="-32" textAnchor="middle" fill="#D4AF37" fontSize="12">★</text>
              <text x="0" y="42" textAnchor="middle" fill="#D4AF37" fontSize="12">★</text>
              <text x="-36" y="4" textAnchor="middle" fill="#D4AF37" fontSize="12">★</text>
              <text x="36" y="4" textAnchor="middle" fill="#D4AF37" fontSize="12">★</text>
            </g>

            {/* Bottom Strategic Ribbon */}
            <g transform="translate(100, 198)">
              <rect x="-70" y="-18" width="140" height="38" rx="10" fill="#74ACDF" stroke="#003870" strokeWidth="3.5" />
              <text x="0" y="5" textAnchor="middle" fill="#003870" fontSize="11" fontWeight="900" letterSpacing="1">
                ESTRATEGIA & GESTIÓN
              </text>
            </g>
          </svg>
        );

      // 03. ANGELINA VERCELLONE - PRENSA Y DIFUSIÓN (ÉPICA)
      // Símbolo: Cámara de Prensa Réflex Profesional + Lente Azul Brillante + Flash de Noticia
      case 3:
        return (
          <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md" aria-label="Cámara de Prensa">
            <defs>
              <linearGradient id="lensReflex" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#003870" />
              </linearGradient>
            </defs>

            {/* Flash Beams */}
            <path d="M 55 35 L 35 15 M 100 25 L 100 5 M 145 35 L 165 15" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />

            {/* Camera Body */}
            <g transform="translate(100, 115)">
              <rect x="-75" y="-50" width="150" height="96" rx="18" fill="#1E293B" stroke="#74ACDF" strokeWidth="4" />
              {/* Viewfinder Prism */}
              <path d="M -32 -50 L -20 -74 L 20 -74 L 32 -50 Z" fill="#0F172A" stroke="#74ACDF" strokeWidth="3" />
              {/* Flash / Sensor Dot */}
              <circle cx="52" cy="-28" r="6" fill="#EF4444" />
              <rect x="-60" y="-62" width="18" height="10" rx="3" fill="#74ACDF" />

              {/* Big Lens */}
              <circle cx="0" cy="0" r="42" fill="#334155" stroke="#74ACDF" strokeWidth="3.5" />
              <circle cx="0" cy="0" r="32" fill="url(#lensReflex)" />
              <circle cx="-10" cy="-10" r="9" fill="#FFFFFF" opacity="0.5" />

              {/* Badge */}
              <rect x="-62" y="24" width="34" height="14" rx="4" fill="#74ACDF" />
              <text x="-45" y="34" textAnchor="middle" fill="#003870" fontSize="8" fontWeight="900">PRENSA</text>
            </g>

            {/* Bottom Banner */}
            <g transform="translate(100, 200)">
              <rect x="-65" y="-15" width="130" height="30" rx="15" fill="#003870" stroke="#74ACDF" strokeWidth="2.5" />
              <circle cx="-42" cy="0" r="4" fill="#EF4444" />
              <text x="5" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900" letterSpacing="1">
                COBERTURA EN VIVO
              </text>
            </g>
          </svg>
        );

      // 04. AMPARO ARANDA - PRENSA Y DIFUSIÓN (ÉPICA)
      // Símbolo: Megáfono de Comunicación Escolar + Ondas Sonoras Expansivas
      case 4:
        return (
          <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md" aria-label="Megáfono de Difusión">
            <defs>
              <linearGradient id="megaBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#74ACDF" />
                <stop offset="100%" stopColor="#003870" />
              </linearGradient>
            </defs>

            {/* Bold Sound Waves */}
            <g stroke="#38BDF8" strokeWidth="4.5" fill="none" strokeLinecap="round">
              <path d="M 130 70 A 40 40 0 0 1 130 150" />
              <path d="M 150 55 A 60 60 0 0 1 150 165" />
              <path d="M 170 40 A 80 80 0 0 1 170 180" />
            </g>

            {/* Megaphone Body */}
            <g transform="translate(75, 110)">
              {/* Cone */}
              <polygon points="50,-48 50,48 -22,20 -22,-20" fill="url(#megaBlue)" stroke="#003870" strokeWidth="4" />
              {/* Front Rim */}
              <ellipse cx="50" cy="0" rx="12" ry="48" fill="#FEF08A" stroke="#003870" strokeWidth="3.5" />
              {/* Back Grip */}
              <path d="M -22 -20 L -42 -15 C -50 -15 -52 -6 -52 0 C -52 6 -50 15 -42 15 L -22 20 Z" fill="#003870" stroke="#74ACDF" strokeWidth="2.5" />
              {/* Handle */}
              <path d="M -28 16 L -38 60 C -39 66 -32 70 -26 70 L -16 70 C -10 70 -8 66 -10 60 L -16 16 Z" fill="#003870" stroke="#74ACDF" strokeWidth="2.5" />
              {/* White Band Accent */}
              <rect x="0" y="-30" width="18" height="60" fill="#FFFFFF" opacity="0.9" />
            </g>

            {/* Bottom Tag */}
            <g transform="translate(100, 200)">
              <rect x="-65" y="-15" width="130" height="30" rx="15" fill="#003870" stroke="#74ACDF" strokeWidth="2.5" />
              <text x="0" y="4" textAnchor="middle" fill="#FEF08A" fontSize="10" fontWeight="900" letterSpacing="1">
                DIFUSIÓN & REDES
              </text>
            </g>
          </svg>
        );

      // 05. TAMARA LUNA - DEPORTES (ÉPICA)
      // Símbolo: Gran Balón de Fútbol Clásico + Laureles de Campeones
      case 5:
        return (
          <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md" aria-label="Balón de Fútbol y Deportes">
            <g stroke="#10B981" strokeWidth="3" fill="none" opacity="0.85">
              <path d="M 38 160 C 20 115 28 65 65 38" />
              <path d="M 162 160 C 180 115 172 65 135 38" />
              <circle cx="28" cy="110" r="5" fill="#10B981" />
              <circle cx="42" cy="70" r="5" fill="#10B981" />
              <circle cx="172" cy="110" r="5" fill="#10B981" />
              <circle cx="158" cy="70" r="5" fill="#10B981" />
            </g>

            {/* Soccer Ball */}
            <g transform="translate(100, 105)">
              <circle cx="0" cy="0" r="54" fill="#FFFFFF" stroke="#003870" strokeWidth="4" />
              {/* Pentagons & Lines */}
              <polygon points="0,-20 19,-6 12,17 -12,17 -19,-6" fill="#003870" />
              <line x1="0" y1="-20" x2="0" y2="-54" stroke="#003870" strokeWidth="3" />
              <line x1="19" y1="-6" x2="48" y2="-18" stroke="#003870" strokeWidth="3" />
              <line x1="12" y1="17" x2="32" y2="44" stroke="#003870" strokeWidth="3" />
              <line x1="-12" y1="17" x2="-32" y2="44" stroke="#003870" strokeWidth="3" />
              <line x1="-19" y1="-6" x2="-48" y2="-18" stroke="#003870" strokeWidth="3" />
            </g>

            {/* Bottom Tag */}
            <g transform="translate(100, 198)">
              <rect x="-65" y="-16" width="130" height="32" rx="10" fill="#003870" stroke="#10B981" strokeWidth="2.5" />
              <text x="0" y="4" textAnchor="middle" fill="#FEF08A" fontSize="10" fontWeight="900" letterSpacing="1">
                TORNEOS & MUNDIALITO
              </text>
            </g>
          </svg>
        );

      // 06. SALVADOR GRUMELLI - DEPORTES (ÉPICA)
      // Símbolo: Silbato Plateado + Pizarra Táctica con Estrategia
      case 6:
        return (
          <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md" aria-label="Silbato y Estrategia">
            <defs>
              <linearGradient id="whistleMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F8FAFC" />
                <stop offset="50%" stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
            </defs>

            {/* Tactical Pitch Board */}
            <g transform="translate(100, 85)">
              <rect x="-70" y="-55" width="140" height="95" rx="10" fill="#047857" stroke="#CBD5E1" strokeWidth="3.5" />
              <circle cx="0" cy="-7" r="22" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.7" />
              <line x1="-70" y1="-7" x2="70" y2="-7" stroke="#FFFFFF" strokeWidth="2" opacity="0.7" />
              <text x="-42" y="-22" fill="#FEF08A" fontSize="16" fontWeight="900">X</text>
              <text x="-16" y="-35" fill="#FEF08A" fontSize="16" fontWeight="900">X</text>
              <text x="38" y="-22" fill="#FFFFFF" fontSize="16" fontWeight="900">O</text>
              <path d="M -16 -22 Q 0 -8 22 -20" stroke="#FEF08A" strokeWidth="2.5" fill="none" strokeDasharray="4,3" />
            </g>

            {/* Whistle */}
            <g transform="translate(100, 142)">
              <circle cx="-18" cy="0" r="24" fill="url(#whistleMetal)" stroke="#003870" strokeWidth="3" />
              <rect x="-18" y="-14" width="52" height="28" rx="5" fill="url(#whistleMetal)" stroke="#003870" strokeWidth="3" />
              <rect x="24" y="-16" width="12" height="32" rx="3" fill="#1E293B" />
              <circle cx="-18" cy="0" r="8" fill="#003870" />
              <circle cx="-42" cy="0" r="7" fill="none" stroke="#D4AF37" strokeWidth="3" />
            </g>

            {/* Bottom Tag */}
            <g transform="translate(100, 198)">
              <rect x="-65" y="-16" width="130" height="32" rx="10" fill="#003870" stroke="#10B981" strokeWidth="2.5" />
              <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900" letterSpacing="1">
                COORDINACIÓN TÁCTICA
              </text>
            </g>
          </svg>
        );

      // 07. LAUTARO PIVETTA - FINANZAS (ÉPICA)
      // Símbolo: Balanza de la Transparencia + Monedas de Oro + Gráficos
      case 7:
        return (
          <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md" aria-label="Balanza de Transparencia">
            <defs>
              <linearGradient id="goldFinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>
            </defs>

            {/* Bars in background */}
            <g transform="translate(100, 75)" opacity="0.35">
              <rect x="-60" y="10" width="20" height="35" rx="3" fill="#F59E0B" />
              <rect x="-32" y="-5" width="20" height="50" rx="3" fill="#F59E0B" />
              <rect x="-4" y="-20" width="20" height="65" rx="3" fill="#F59E0B" />
              <rect x="24" y="-38" width="20" height="83" rx="3" fill="#F59E0B" />
            </g>

            {/* Golden Balance */}
            <g transform="translate(100, 105)">
              <rect x="-5" y="-38" width="10" height="76" fill="#003870" />
              <polygon points="0,-45 -12,-38 12,-38" fill="url(#goldFinGrad)" />
              <path d="M -28 38 L 28 38 L 34 50 L -34 50 Z" fill="#003870" />
              <line x1="-60" y1="-26" x2="60" y2="-26" stroke="url(#goldFinGrad)" strokeWidth="5" strokeLinecap="round" />

              {/* Left Pan */}
              <line x1="-60" y1="-26" x2="-75" y2="12" stroke="#003870" strokeWidth="2" />
              <line x1="-60" y1="-26" x2="-45" y2="12" stroke="#003870" strokeWidth="2" />
              <path d="M -80 12 C -80 30 -40 30 -40 12 Z" fill="url(#goldFinGrad)" stroke="#003870" strokeWidth="2.5" />
              <circle cx="-60" cy="8" r="8" fill="#FEF08A" stroke="#B45309" strokeWidth="2" />

              {/* Right Pan */}
              <line x1="60" y1="-26" x2="45" y2="12" stroke="#003870" strokeWidth="2" />
              <line x1="60" y1="-26" x2="75" y2="12" stroke="#003870" strokeWidth="2" />
              <path d="M 40 12 C 40 30 80 30 80 12 Z" fill="url(#goldFinGrad)" stroke="#003870" strokeWidth="2.5" />
              <circle cx="60" cy="8" r="8" fill="#FEF08A" stroke="#B45309" strokeWidth="2" />
            </g>

            {/* Bottom Tag */}
            <g transform="translate(100, 198)">
              <rect x="-65" y="-16" width="130" height="32" rx="10" fill="#003870" stroke="#F59E0B" strokeWidth="2.5" />
              <text x="0" y="4" textAnchor="middle" fill="#FEF08A" fontSize="10" fontWeight="900" letterSpacing="1">
                TRANSPARENCIA & CONTROL
              </text>
            </g>
          </svg>
        );

      // 08. FELIPE BUFFA - FINANZAS (ÉPICA)
      // Símbolo: Calculadora Financiera + Planilla de Presupuesto Abierto
      case 8:
        return (
          <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md" aria-label="Calculadora y Presupuesto">
            <g transform="translate(100, 85)">
              <rect x="-70" y="-48" width="140" height="92" rx="8" fill="#F8FAFC" stroke="#003870" strokeWidth="3.5" />
              <rect x="-60" y="-38" width="120" height="14" fill="#E2E8F0" rx="3" />
              <line x1="-60" y1="-10" x2="60" y2="-10" stroke="#CBD5E1" strokeWidth="2.5" />
              <line x1="-60" y1="12" x2="60" y2="12" stroke="#CBD5E1" strokeWidth="2.5" />
              <line x1="-60" y1="32" x2="60" y2="32" stroke="#CBD5E1" strokeWidth="2.5" />
              <line x1="0" y1="-20" x2="0" y2="40" stroke="#CBD5E1" strokeWidth="2.5" />
            </g>

            {/* Calculator */}
            <g transform="translate(100, 138)">
              <rect x="-46" y="-44" width="92" height="88" rx="12" fill="#1E293B" stroke="#F59E0B" strokeWidth="3" />
              <rect x="-36" y="-34" width="72" height="22" rx="5" fill="#6EE7B7" stroke="#047857" strokeWidth="2" />
              <text x="30" y="-18" textAnchor="end" fill="#064E3B" fontSize="13" fontWeight="900" fontFamily="monospace">100.00%</text>

              {/* Buttons */}
              <g fill="#334155">
                <rect x="-36" y="-6" width="14" height="12" rx="2" />
                <rect x="-18" y="-6" width="14" height="12" rx="2" />
                <rect x="0" y="-6" width="14" height="12" rx="2" />
                <rect x="18" y="-6" width="18" height="12" rx="2" fill="#F59E0B" />

                <rect x="-36" y="10" width="14" height="12" rx="2" />
                <rect x="-18" y="10" width="14" height="12" rx="2" />
                <rect x="0" y="10" width="14" height="12" rx="2" />
                <rect x="18" y="10" width="18" height="12" rx="2" fill="#10B981" />

                <rect x="-36" y="26" width="32" height="12" rx="2" />
                <rect x="0" y="26" width="14" height="12" rx="2" />
                <rect x="18" y="26" width="18" height="12" rx="2" fill="#3B82F6" />
              </g>
            </g>

            {/* Bottom Tag */}
            <g transform="translate(100, 200)">
              <rect x="-65" y="-15" width="130" height="30" rx="15" fill="#003870" stroke="#F59E0B" strokeWidth="2.5" />
              <text x="0" y="4" textAnchor="middle" fill="#FEF08A" fontSize="10" fontWeight="900" letterSpacing="1">
                PRESUPUESTO ABIERTO
              </text>
            </g>
          </svg>
        );

      // 09. DANA FERREYRA - ACTAS (ÉPICA)
      // Símbolo: Libro de Actas Encuadernado + Pluma Dorada + Sello Oficial
      case 9:
        return (
          <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md" aria-label="Libro Oficial de Actas">
            <defs>
              <linearGradient id="bookCoverDana" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#003870" />
                <stop offset="100%" stopColor="#001830" />
              </linearGradient>
            </defs>

            {/* Open Book */}
            <g transform="translate(100, 105)">
              <path d="M -80 -48 L 0 -38 L 80 -48 L 76 48 L 0 58 L -76 48 Z" fill="url(#bookCoverDana)" stroke="#D4AF37" strokeWidth="3.5" />
              <path d="M -72 -40 L -4 -32 L -4 50 L -68 42 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
              <path d="M 4 -32 L 72 -40 L 68 42 L 4 50 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />

              <line x1="-62" y1="-20" x2="-16" y2="-16" stroke="#64748B" strokeWidth="2.5" />
              <line x1="-62" y1="-4" x2="-16" y2="0" stroke="#64748B" strokeWidth="2.5" />
              <line x1="-62" y1="12" x2="-16" y2="16" stroke="#64748B" strokeWidth="2.5" />
              <line x1="-62" y1="28" x2="-28" y2="32" stroke="#64748B" strokeWidth="2.5" />

              <line x1="16" y1="-16" x2="62" y2="-20" stroke="#64748B" strokeWidth="2.5" />
              <line x1="16" y1="0" x2="62" y2="-4" stroke="#64748B" strokeWidth="2.5" />

              {/* Red Wax Seal */}
              <circle cx="40" cy="22" r="16" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
              <text x="40" y="27" textAnchor="middle" fill="#FEF08A" fontSize="12" fontWeight="900">LS</text>
            </g>

            {/* Golden Quill */}
            <g transform="translate(145, 65) rotate(-28)">
              <path d="M 0 -50 Q 14 -22 0 50 Q -12 22 0 -50 Z" fill="#F59E0B" stroke="#003870" strokeWidth="2" />
              <line x1="0" y1="-45" x2="0" y2="45" stroke="#78350F" strokeWidth="2" />
            </g>

            {/* Bottom Tag */}
            <g transform="translate(100, 198)">
              <rect x="-65" y="-16" width="130" height="32" rx="10" fill="#003870" stroke="#74ACDF" strokeWidth="2.5" />
              <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900" letterSpacing="1">
                REGISTRO OFICIAL
              </text>
            </g>
          </svg>
        );

      // 10. LUNA PERREN - ACTAS (ÉPICA)
      // Símbolo: Portapapeles con Checklist Verificado + Sello Aprobado
      case 10:
        return (
          <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md" aria-label="Portapapeles de Resoluciones">
            <g transform="translate(100, 105)">
              <rect x="-60" y="-65" width="120" height="125" rx="14" fill="#1E293B" stroke="#74ACDF" strokeWidth="3.5" />
              {/* Metal Clip */}
              <rect x="-26" y="-76" width="52" height="22" rx="6" fill="#CBD5E1" stroke="#003870" strokeWidth="2.5" />
              <circle cx="0" cy="-65" r="4" fill="#003870" />

              {/* Paper Sheet */}
              <rect x="-48" y="-52" width="96" height="104" rx="5" fill="#FFFFFF" />

              {/* 3 Checklist Items */}
              <rect x="-38" y="-36" width="12" height="12" rx="2" fill="#10B981" />
              <polyline points="-35,-30 -32,-27 -28,-34" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="-20" y1="-30" x2="36" y2="-30" stroke="#64748B" strokeWidth="3" />

              <rect x="-38" y="-14" width="12" height="12" rx="2" fill="#10B981" />
              <polyline points="-35,-8 -32,-5 -28,-12" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="-20" y1="-8" x2="36" y2="-8" stroke="#64748B" strokeWidth="3" />

              <rect x="-38" y="8" width="12" height="12" rx="2" fill="#10B981" />
              <polyline points="-35,14 -32,17 -28,10" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="-20" y1="14" x2="36" y2="14" stroke="#64748B" strokeWidth="3" />

              {/* Stamp */}
              <rect x="-2" y="26" width="42" height="16" rx="4" fill="#DC2626" />
              <text x="19" y="38" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="900">APROBADO</text>
            </g>

            {/* Bottom Tag */}
            <g transform="translate(100, 198)">
              <rect x="-65" y="-16" width="130" height="32" rx="10" fill="#003870" stroke="#74ACDF" strokeWidth="2.5" />
              <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900" letterSpacing="1">
                SEGUIMIENTO & ACTAS
              </text>
            </g>
          </svg>
        );

      // 11. LUCIA BARZOLA - CULTURA Y RRHH (ÉPICA)
      // Símbolo: Paleta de Pintura Artística + Pinceles + Notas Musicales
      case 11:
        return (
          <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md" aria-label="Paleta de Arte y Cultura">
            <defs>
              <linearGradient id="paletteWoodLucia" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>

            {/* Floating Music Notes */}
            <g fill="#9333EA">
              <text x="30" y="55" fontSize="26" fontWeight="900">♪</text>
              <text x="145" y="65" fontSize="30" fontWeight="900">♫</text>
              <text x="160" y="115" fontSize="22" fontWeight="900">♩</text>
            </g>

            {/* Wooden Palette */}
            <g transform="translate(100, 115)">
              <path
                d="M -65 -32 C -65 -60 -10 -60 22 -44 C 55 -28 70 0 70 28 C 70 55 38 60 0 55 C -32 50 -44 28 -32 10 C -22 -6 -65 -6 -65 -32 Z"
                fill="url(#paletteWoodLucia)"
                stroke="#003870"
                strokeWidth="4"
              />
              <ellipse cx="-22" cy="20" rx="9" ry="11" fill="#FFFFFF" stroke="#003870" strokeWidth="2.5" />

              {/* Paint Colors */}
              <circle cx="-38" cy="-32" r="9" fill="#3B82F6" />
              <circle cx="-6" cy="-44" r="9" fill="#EF4444" />
              <circle cx="28" cy="-32" r="9" fill="#10B981" />
              <circle cx="48" cy="-6" r="9" fill="#FEF08A" />
              <circle cx="48" cy="22" r="9" fill="#9333EA" />

              {/* Crossing Brush */}
              <g transform="rotate(35)">
                <rect x="-5" y="-75" width="10" height="130" rx="4" fill="#78350F" stroke="#003870" strokeWidth="1.5" />
                <rect x="-6" y="-80" width="12" height="18" fill="#CBD5E1" />
                <path d="M -6 -80 Q 0 -96 6 -80 Z" fill="#EF4444" />
              </g>
            </g>

            {/* Bottom Tag */}
            <g transform="translate(100, 198)">
              <rect x="-65" y="-16" width="130" height="32" rx="10" fill="#003870" stroke="#9333EA" strokeWidth="2.5" />
              <text x="0" y="4" textAnchor="middle" fill="#FEF08A" fontSize="10" fontWeight="900" letterSpacing="1">
                ARTE & EXPRESIÓN
              </text>
            </g>
          </svg>
        );

      // 12. ERNESTINA SÁNCHEZ - CULTURA Y RRHH (ÉPICA)
      // Símbolo: Micrófono Vintage de Escenario + Máscaras Teatrales de Convivencia
      case 12:
        return (
          <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md" aria-label="Micrófono y Teatro">
            <defs>
              <linearGradient id="vintageMicErne" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
            </defs>

            {/* Drama Masks */}
            <g transform="translate(48, 78) rotate(-15)" opacity="0.8">
              <path d="M -24 -26 C -24 -42 24 -42 24 -26 C 24 6 16 26 0 26 C -16 26 -24 6 -24 -26 Z" fill="#F8FAFC" stroke="#9333EA" strokeWidth="2.5" />
              <circle cx="-8" cy="-16" r="3.5" fill="#9333EA" />
              <circle cx="8" cy="-16" r="3.5" fill="#9333EA" />
              <path d="M -11 6 Q 0 18 11 6" stroke="#9333EA" strokeWidth="2.5" fill="none" />
            </g>
            <g transform="translate(152, 78) rotate(15)" opacity="0.8">
              <path d="M -24 -26 C -24 -42 24 -42 24 -26 C 24 6 16 26 0 26 C -16 26 -24 6 -24 -26 Z" fill="#F8FAFC" stroke="#9333EA" strokeWidth="2.5" />
              <circle cx="-8" cy="-16" r="3.5" fill="#9333EA" />
              <circle cx="8" cy="-16" r="3.5" fill="#9333EA" />
              <path d="M -11 14 Q 0 4 11 14" stroke="#9333EA" strokeWidth="2.5" fill="none" />
            </g>

            {/* Vintage Stage Mic */}
            <g transform="translate(100, 115)">
              <rect x="-26" y="-48" width="52" height="70" rx="26" fill="url(#vintageMicErne)" stroke="#003870" strokeWidth="3.5" />
              <line x1="-22" y1="-26" x2="22" y2="-26" stroke="#003870" strokeWidth="2.5" />
              <line x1="-24" y1="-10" x2="24" y2="-10" stroke="#003870" strokeWidth="2.5" />
              <line x1="-22" y1="6" x2="22" y2="6" stroke="#003870" strokeWidth="2.5" />
              <line x1="0" y1="-48" x2="0" y2="22" stroke="#003870" strokeWidth="3" />

              {/* Stand */}
              <path d="M -32 -10 L -32 22 C -32 38 32 38 32 22 L 32 -10" fill="none" stroke="#D4AF37" strokeWidth="4" />
              <rect x="-7" y="34" width="14" height="26" fill="#003870" />
              <path d="M -28 60 L 28 60 L 34 68 L -34 68 Z" fill="#003870" stroke="#D4AF37" strokeWidth="2" />
            </g>

            {/* Bottom Tag */}
            <g transform="translate(100, 198)">
              <rect x="-65" y="-16" width="130" height="32" rx="10" fill="#003870" stroke="#9333EA" strokeWidth="2.5" />
              <text x="0" y="4" textAnchor="middle" fill="#FEF08A" fontSize="10" fontWeight="900" letterSpacing="1">
                CULTURA & VÍNCULOS
              </text>
            </g>
          </svg>
        );

      // 13. CAMILO ITURRUSGARAY - RECREACIÓN (ÉPICA)
      // Símbolo: Dados Dorados 3D + Cartas de Juego de Mesa
      case 13:
        return (
          <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md" aria-label="Dados y Cartas Recreativas">
            <defs>
              <linearGradient id="diceGoldCamilo" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>

            {/* Cards Behind */}
            <g transform="translate(72, 78) rotate(-18)">
              <rect x="-26" y="-38" width="52" height="76" rx="7" fill="#FFFFFF" stroke="#003870" strokeWidth="3" />
              <text x="-18" y="-18" fill="#EF4444" fontSize="15" fontWeight="900">A</text>
              <text x="0" y="12" textAnchor="middle" fill="#EF4444" fontSize="24">♥</text>
            </g>
            <g transform="translate(128, 78) rotate(18)">
              <rect x="-26" y="-38" width="52" height="76" rx="7" fill="#FFFFFF" stroke="#003870" strokeWidth="3" />
              <text x="-18" y="-18" fill="#003870" fontSize="15" fontWeight="900">10</text>
              <text x="0" y="12" textAnchor="middle" fill="#003870" fontSize="24">♠</text>
            </g>

            {/* 3D Golden Dice */}
            <g transform="translate(100, 136)">
              <polygon points="0,-28 32,-12 0,6 -32,-12" fill="url(#diceGoldCamilo)" stroke="#003870" strokeWidth="2.5" />
              <polygon points="0,6 32,-12 32,28 0,44" fill="#D97706" stroke="#003870" strokeWidth="2.5" />
              <polygon points="0,6 -32,-12 -32,28 0,44" fill="#B45309" stroke="#003870" strokeWidth="2.5" />

              <circle cx="0" cy="-11" r="4" fill="#003870" />
              <circle cx="16" cy="7" r="3.5" fill="#FEF08A" />
              <circle cx="16" cy="25" r="3.5" fill="#FEF08A" />
              <circle cx="-16" cy="7" r="3.5" fill="#FEF08A" />
              <circle cx="-16" cy="25" r="3.5" fill="#FEF08A" />
              <circle cx="0" cy="25" r="3.5" fill="#FEF08A" />
            </g>

            {/* Bottom Tag */}
            <g transform="translate(100, 198)">
              <rect x="-65" y="-16" width="130" height="32" rx="10" fill="#003870" stroke="#F43F5E" strokeWidth="2.5" />
              <text x="0" y="4" textAnchor="middle" fill="#FEF08A" fontSize="10" fontWeight="900" letterSpacing="1">
                JUEGOS & DIVERSIÓN
              </text>
            </g>
          </svg>
        );

      // 14. CLARA DE OLIVEIRA - RECREACIÓN (ÉPICA)
      // Símbolo: Tablero de Juegos de Mesa + Banderines Festivos + Fichas Meeples
      case 14:
        return (
          <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md" aria-label="Tablero de Juegos y Convivencia">
            {/* Bunting Flags */}
            <g stroke="#003870" strokeWidth="2.5">
              <path d="M 25 38 Q 100 68 175 38" fill="none" />
              <polygon points="42,44 58,47 50,66" fill="#EF4444" />
              <polygon points="74,53 90,55 82,74" fill="#FEF08A" />
              <polygon points="106,55 122,53 114,74" fill="#10B981" />
              <polygon points="138,47 154,44 146,66" fill="#9333EA" />
            </g>

            {/* Isometric Board */}
            <g transform="translate(100, 120)">
              <polygon points="0,-44 72,-6 0,34 -72,-6" fill="#0284C7" stroke="#003870" strokeWidth="3.5" />
              <polygon points="-44,-11 -22,-22 0,-11 -22,0" fill="#FFFFFF" stroke="#003870" strokeWidth="2" />
              <polygon points="0,-11 22,-22 44,-11 22,0" fill="#FEF08A" stroke="#003870" strokeWidth="2" />
              <polygon points="-22,0 0,-11 22,0 0,11" fill="#EF4444" stroke="#003870" strokeWidth="2" />

              {/* Meeple 1 */}
              <g transform="translate(-22, -16)">
                <circle cx="0" cy="-20" r="7" fill="#003870" stroke="#FFFFFF" strokeWidth="2" />
                <path d="M -9 -11 L 9 -11 L 11 6 L -11 6 Z" fill="#003870" stroke="#FFFFFF" strokeWidth="2" />
              </g>
              {/* Meeple 2 */}
              <g transform="translate(16, -10)">
                <circle cx="0" cy="-20" r="7" fill="#F59E0B" stroke="#003870" strokeWidth="2" />
                <path d="M -9 -11 L 9 -11 L 11 6 L -11 6 Z" fill="#F59E0B" stroke="#003870" strokeWidth="2" />
              </g>
            </g>

            {/* Bottom Tag */}
            <g transform="translate(100, 198)">
              <rect x="-65" y="-16" width="130" height="32" rx="10" fill="#003870" stroke="#F43F5E" strokeWidth="2.5" />
              <text x="0" y="4" textAnchor="middle" fill="#FEF08A" fontSize="10" fontWeight="900" letterSpacing="1">
                DINÁMICAS & ENCUENTRO
              </text>
            </g>
          </svg>
        );

      default:
        return (
          <div className="w-full h-full flex items-center justify-center p-2">
            <ScalonetaEmblem size={size === 'sm' ? 'sm' : 'md'} />
          </div>
        );
    }
  };

  return (
    <div
      className={`relative flex items-center justify-center select-none overflow-hidden ${containerSizes} ${className}`}
    >
      {renderSymbolContent()}
    </div>
  );
};
