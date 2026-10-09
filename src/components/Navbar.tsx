import React from 'react';
import { Settings, Music, VolumeX, Heart, Lock } from 'lucide-react';
import { romanticAudio } from '../utils/audioPlayer';

interface NavbarProps {
  onOpenPersonalize: () => void;
  onLockSite: () => void;
  isMusicPlaying: boolean;
  setIsMusicPlaying: (playing: boolean) => void;
  partnerName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPersonalize,
  onLockSite,
  isMusicPlaying,
  setIsMusicPlaying,
  partnerName,
}) => {
  const toggleMusic = () => {
    const newState = romanticAudio.toggleAmbientMelody((playing) => {
      setIsMusicPlaying(playing);
    });
    setIsMusicPlaying(newState);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-[#FAF7F2]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-stone-900 transition-opacity hover:opacity-85 whitespace-nowrap shrink-0"
        >
          <span className="font-serif-display text-xl text-rose-700">100 Days</span>
          <span className="text-stone-400 font-light">with</span>
          <span className="font-serif-display italic text-stone-900">{partnerName}</span>
        </a>

        {/* Zone 2: clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <a
            href="#"
            className="hover:text-rose-700 transition-colors whitespace-nowrap shrink-0"
          >
            Celebration
          </a>
        </nav>

        {/* Zone 3: 1 primary action + subtle sound toggle + bunny lock */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={toggleMusic}
            title={isMusicPlaying ? 'Mute ambient melody' : 'Play ambient music box melody'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 transition-colors hover:border-rose-300 hover:text-rose-700 shadow-xs"
            aria-label="Toggle ambient music"
          >
            {isMusicPlaying ? (
              <Music className="h-4 w-4 text-rose-600 animate-pulse" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </button>

          <button
            onClick={onLockSite}
            title="Lock site & play with bunny character"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 transition-colors hover:border-rose-300 hover:text-rose-700 shadow-xs"
            aria-label="Lock site and open bunny gatekeeper"
          >
            <Lock className="h-4 w-4" />
          </button>

          <button
            onClick={onOpenPersonalize}
            className="flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-stone-800 hover:shadow-md whitespace-nowrap shrink-0"
          >
            <Settings className="h-3.5 w-3.5 text-rose-300" />
            <span>Personalize</span>
          </button>
        </div>
      </div>
    </header>
  );
};
