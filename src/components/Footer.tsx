import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { triggerLoveBurst } from './CanvasPetals';
import { romanticAudio } from '../utils/audioPlayer';

interface FooterProps {
  partnerName: string;
  senderName: string;
}

export const Footer: React.FC<FooterProps> = ({ partnerName, senderName }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    romanticAudio.playTenderChime();
    triggerLoveBurst();
  };

  return (
    <footer className="border-t border-stone-200 bg-[#FAF7F2] py-12 text-center text-xs text-stone-500">
      <div className="mx-auto max-w-7xl px-6 flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="font-serif-display font-medium text-stone-900">
            100 Days of Us
          </span>
          <span aria-hidden="true">·</span>
          <span>Celebrating {senderName} &amp; {partnerName}</span>
          <span aria-hidden="true">·</span>
          <span>Day 100 and counting</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              triggerLoveBurst();
              romanticAudio.playTenderChime();
            }}
            className="group flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-3.5 py-1.5 text-stone-700 transition-colors hover:border-rose-300 hover:text-rose-600 shadow-xs"
          >
            <Heart className="h-3.5 w-3.5 text-rose-500 transition-transform group-hover:scale-125" />
            <span>Send Love</span>
          </button>

          <button
            onClick={scrollToTop}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-600 transition-colors hover:border-stone-400 hover:text-stone-900 shadow-xs"
            aria-label="Scroll to top"
            title="Back to top"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
