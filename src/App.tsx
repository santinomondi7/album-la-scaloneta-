/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveSection, Sticker } from './types';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useGamification } from './hooks/useGamification';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { AlbumCover } from './components/AlbumCover';
import { MenuView } from './views/MenuView';
import { EquipoView } from './views/EquipoView';
import { SecretariasView } from './views/SecretariasView';
import { PropuestasView } from './views/PropuestasView';
import { EspecialesView } from './views/EspecialesView';
import { MiAlbumView } from './views/MiAlbumView';
import { SobresView } from './views/SobresView';
import { JuegosView } from './views/JuegosView';
import { PerfilView } from './views/PerfilView';
import { LogrosView } from './views/LogrosView';
import { StickerModal } from './components/StickerModal';
import { ShareModal } from './components/ShareModal';
import { QRCodeModal } from './components/QRCodeModal';
import { CelebrationModal } from './components/CelebrationModal';
import { PointsToast } from './components/PointsToast';
import { LegendaryStickerModal } from './components/LegendaryStickerModal';
import { OnboardingProfileModal } from './components/OnboardingProfileModal';
import { soundManager } from './utils/audio';

function AlbumApp() {
  const { userProfile, isLoading: isAuthLoading } = useAuth();
  const [activeSection, setActiveSection] = useState<ActiveSection>('portada');
  const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  // Gamification & Unified Album State Engine with Firestore Sync
  const {
    unlockedIds,
    unlockedCount,
    totalCount,
    percentage,
    duplicateCounts,
    totalDuplicates,
    totalObtained,
    isUnlocked,
    resetProgress,
    // Pack Cooldown & Open
    isPackReady,
    formattedCountdown,
    openPack,
    packsOpenedCount,
    packHistory,
    legendaryPull,
    closeLegendaryModal,
    // Points & Levels
    points,
    currentLevel,
    nextLevel,
    levelProgressPercentage,
    // Daily Streak
    isDailyBonusReady,
    streakDays,
    claimDailyBonus,
    // Minigames
    recordGameResult,
    getPlaysToday,
    gamesPlayedCount,
    penaltyGoalsCount,
    // Achievements & Celebration
    unlockedAchievements,
    showCelebration,
    setShowCelebration,
    toasts,
    customDescriptions,
    updateCustomDescription
  } = useGamification();

  // Scroll to top on section change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  const handleOpenAlbum = () => {
    soundManager.playClick();
    setActiveSection('menu');
  };

  const handleSelectSticker = (sticker: Sticker) => {
    setSelectedSticker(sticker);
  };

  const handleCloseStickerModal = () => {
    setSelectedSticker(null);
  };

  return (
    <div className="min-h-screen bento-bg text-[#1E293B] flex flex-col selection:bg-[#74ACDF] selection:text-white pb-20 md:pb-8">
      {/* Toast Notifications */}
      <PointsToast toasts={toasts} />

      {/* Top Header Navigation */}
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        unlockedCount={unlockedCount}
        totalCount={totalCount}
        percentage={percentage}
        points={points}
        isPackReady={isPackReady}
        formattedCountdown={formattedCountdown}
        onOpenPackModal={() => setActiveSection('sobres')}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        onOpenQRModal={() => setIsQRModalOpen(true)}
      />

      {/* Main Screen Router */}
      <main className="flex-1 flex flex-col">
        {activeSection === 'portada' && (
          <AlbumCover
            onOpenAlbum={handleOpenAlbum}
            onOpenPackModal={() => setActiveSection('sobres')}
            unlockedCount={unlockedCount}
            totalCount={totalCount}
            percentage={percentage}
            points={points}
            currentLevel={currentLevel}
            streakDays={streakDays}
            isPackReady={isPackReady}
            formattedCountdown={formattedCountdown}
            setActiveSection={setActiveSection}
          />
        )}

        {activeSection === 'menu' && (
          <MenuView
            setActiveSection={setActiveSection}
            unlockedCount={unlockedCount}
            totalCount={totalCount}
            percentage={percentage}
            points={points}
            currentLevel={currentLevel}
            streakDays={streakDays}
            isPackReady={isPackReady}
            formattedCountdown={formattedCountdown}
            onOpenShareModal={() => setIsShareModalOpen(true)}
          />
        )}

        {activeSection === 'sobres' && (
          <SobresView
            onBack={() => setActiveSection('menu')}
            onNavigateToAlbum={() => setActiveSection('mialbum')}
            onOpenStickerModal={handleSelectSticker}
            isPackReady={isPackReady}
            formattedCountdown={formattedCountdown}
            openPack={openPack}
            packsOpenedCount={packsOpenedCount}
            packHistory={packHistory}
          />
        )}

        {activeSection === 'juegos' && (
          <JuegosView
            onBack={() => setActiveSection('menu')}
            recordGameResult={recordGameResult}
            getPlaysToday={getPlaysToday}
            points={points}
          />
        )}

        {activeSection === 'equipo' && (
          <EquipoView
            onBack={() => setActiveSection('menu')}
            isUnlocked={isUnlocked}
            duplicateCounts={duplicateCounts}
            onSelectSticker={handleSelectSticker}
            setActiveSection={setActiveSection}
          />
        )}

        {activeSection === 'secretarias' && (
          <SecretariasView
            onBack={() => setActiveSection('menu')}
            isUnlocked={isUnlocked}
            duplicateCounts={duplicateCounts}
            onSelectSticker={handleSelectSticker}
          />
        )}

        {activeSection === 'propuestas' && (
          <PropuestasView
            onBack={() => setActiveSection('menu')}
            isUnlocked={isUnlocked}
            duplicateCounts={duplicateCounts}
            onSelectSticker={handleSelectSticker}
          />
        )}

        {activeSection === 'especiales' && (
          <EspecialesView
            onBack={() => setActiveSection('menu')}
            isUnlocked={isUnlocked}
            duplicateCounts={duplicateCounts}
            onSelectSticker={handleSelectSticker}
          />
        )}

        {activeSection === 'mialbum' && (
          <MiAlbumView
            onBack={() => setActiveSection('menu')}
            isUnlocked={isUnlocked}
            duplicateCounts={duplicateCounts}
            totalDuplicates={totalDuplicates}
            totalObtained={totalObtained}
            onSelectSticker={handleSelectSticker}
            unlockedCount={unlockedCount}
            totalCount={totalCount}
            percentage={percentage}
            onGoToSobres={() => setActiveSection('sobres')}
            onResetProgress={resetProgress}
          />
        )}

        {activeSection === 'perfil' && (
          <PerfilView
            onBack={() => setActiveSection('menu')}
            onNavigateToLogros={() => setActiveSection('logros')}
            onNavigateToAlbum={() => setActiveSection('mialbum')}
            points={points}
            currentLevel={currentLevel}
            nextLevel={nextLevel}
            levelProgressPercentage={levelProgressPercentage}
            isDailyBonusReady={isDailyBonusReady}
            streakDays={streakDays}
            claimDailyBonus={claimDailyBonus}
            unlockedCount={unlockedCount}
            totalCount={totalCount}
            totalDuplicates={totalDuplicates}
            packsOpenedCount={packsOpenedCount}
            gamesPlayedCount={gamesPlayedCount}
            penaltyGoalsCount={penaltyGoalsCount}
            unlockedAchievements={unlockedAchievements}
            onResetProgress={resetProgress}
          />
        )}

        {activeSection === 'logros' && (
          <LogrosView
            onBack={() => setActiveSection('menu')}
            unlockedAchievements={unlockedAchievements}
            points={points}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t-2 border-slate-300 py-6 px-4 text-center text-xs text-slate-500 bg-white/70 backdrop-blur-xs mt-8">
        <div className="max-w-md mx-auto space-y-1">
          <p className="font-heading text-sm font-black text-[#003870] uppercase tracking-wider">
            LA SCALONETA • CENTRO DE ESTUDIANTES 2026
          </p>
          <p className="text-[11px] text-[#74ACDF] font-bold">
            Completá el equipo. Conocé nuestras propuestas. Viví la campaña.
          </p>
          <p className="text-[10px] text-slate-400 font-semibold">
            Álbum oficial interactivo • {unlockedCount}/{totalCount} figuritas únicas ({percentage}%) • {totalDuplicates} repetidas • {points} puntos
          </p>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        unlockedCount={unlockedCount}
        totalCount={totalCount}
        isPackReady={isPackReady}
      />

      {/* Onboarding Profile Modal for First Time Visitors */}
      <OnboardingProfileModal
        isOpen={!isAuthLoading && !userProfile}
      />

      {/* Modals */}
      <StickerModal
        sticker={selectedSticker}
        isOpen={!!selectedSticker}
        onClose={handleCloseStickerModal}
        isUnlocked={selectedSticker ? isUnlocked(selectedSticker.id) : false}
        onGoToSobres={() => setActiveSection('sobres')}
        customDescription={selectedSticker ? customDescriptions[selectedSticker.id] : undefined}
        onSaveCustomDescription={updateCustomDescription}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        unlockedCount={unlockedCount}
        totalCount={totalCount}
        percentage={percentage}
        onOpenQR={() => setIsQRModalOpen(true)}
      />

      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />

      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        onOpenShare={() => {
          setShowCelebration(false);
          setIsShareModalOpen(true);
        }}
        totalCount={totalCount}
      />

      <LegendaryStickerModal
        sticker={legendaryPull}
        onClose={closeLegendaryModal}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AlbumApp />
    </AuthProvider>
  );
}

