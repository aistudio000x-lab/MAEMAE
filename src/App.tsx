/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  initialCoupleProfile,
} from './data/initialData';
import {
  CoupleProfile,
} from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { PersonalizeModal } from './components/PersonalizeModal';
import { CanvasPetals } from './components/CanvasPetals';
import { BunnySignIn } from './components/BunnySignIn';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('bunny_unlocked') === 'true';
  });

  const [profile, setProfile] = useState<CoupleProfile>(() => {
    const saved = localStorage.getItem('anniversary_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure default partnerName reflects MaeMae and senderName reflects Jojo
        if (parsed.partnerName === 'Maya') {
          parsed.partnerName = 'MaeMae';
        }
        if (parsed.senderName === 'Alex') {
          parsed.senderName = 'Jojo';
        }
        return parsed;
      } catch {
        // fallback
      }
    }
    return initialCoupleProfile;
  });

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState(false);

  // Persistence helpers
  const handleSaveProfile = (newProfile: CoupleProfile) => {
    setProfile(newProfile);
    localStorage.setItem('anniversary_profile', JSON.stringify(newProfile));
  };

  const handleResetDefaults = () => {
    setProfile(initialCoupleProfile);
    localStorage.clear();
  };

  const handleLockSite = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('bunny_unlocked');
  };

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-[#FAF7F2] text-stone-800 font-sans selection:bg-rose-200 selection:text-rose-900">
        <CanvasPetals active={true} />
        <BunnySignIn
          onSuccess={() => {
            setIsAuthenticated(true);
            localStorage.setItem('bunny_unlocked', 'true');
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-stone-800 font-sans selection:bg-rose-200 selection:text-rose-900">
      {/* Ambient Petal & Confetti Canvas */}
      <CanvasPetals active={true} />

      {/* Top Bar Contract (1 line wordmark - single-line links - 1 primary action) */}
      <Navbar
        onOpenPersonalize={() => setIsPersonalizeOpen(true)}
        onLockSite={handleLockSite}
        isMusicPlaying={isMusicPlaying}
        setIsMusicPlaying={setIsMusicPlaying}
        partnerName={profile.partnerName}
      />

      <main>
        {/* Hero Section with Live Counter & Visual */}
        <Hero
          partnerName={profile.partnerName}
          senderName={profile.senderName}
          startDate={profile.startDate}
          relationshipNote={profile.relationshipNote}
        />
      </main>

      {/* Clean Romantic Footer */}
      <Footer
        partnerName={profile.partnerName}
        senderName={profile.senderName}
      />

      {/* Personalization Modal */}
      <PersonalizeModal
        isOpen={isPersonalizeOpen}
        onClose={() => setIsPersonalizeOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
