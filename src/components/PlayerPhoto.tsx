import React from 'react';
import { StickerRarity } from '../types';
import { StickerSymbol } from './StickerSymbol';

interface PlayerPhotoProps {
  src?: string;
  alt: string;
  rarity: StickerRarity;
  numberTag?: string;
  stickerNumber?: number;
  isUnlocked: boolean;
  size?: 'sm' | 'md' | 'lg' | 'modal';
  className?: string;
}

/**
 * PlayerPhoto Adapter
 * As per project specifications: No faces, photos or human avatars.
 * All members are represented exclusively by bespoke role insignias and sports symbols.
 */
export const PlayerPhoto: React.FC<PlayerPhotoProps> = ({
  alt,
  rarity,
  stickerNumber = 1,
  isUnlocked,
  size = 'md',
  className = ''
}) => {
  if (!isUnlocked) {
    return null;
  }

  // Derive sticker number from alt or prop if available
  let num = stickerNumber;
  if (!num) {
    if (alt.includes('Santino')) num = 1;
    else if (alt.includes('Helena')) num = 2;
    else if (alt.includes('Angelina')) num = 3;
    else if (alt.includes('Amparo')) num = 4;
    else if (alt.includes('Tamara')) num = 5;
    else if (alt.includes('Salvador')) num = 6;
    else if (alt.includes('Lautaro')) num = 7;
    else if (alt.includes('Felipe')) num = 8;
    else if (alt.includes('Dana')) num = 9;
    else if (alt.includes('Luna')) num = 10;
    else if (alt.includes('Lucia') || alt.includes('Lucía')) num = 11;
    else if (alt.includes('Ernestina')) num = 12;
    else if (alt.includes('Camilo')) num = 13;
    else if (alt.includes('Clara')) num = 14;
    else num = 1;
  }

  return (
    <StickerSymbol
      stickerNumber={num}
      rarity={rarity}
      size={size}
      className={className}
      isUnlocked={isUnlocked}
    />
  );
};
