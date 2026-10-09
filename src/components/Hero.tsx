import React, { useState, useEffect, useRef } from 'react';
import { Heart, Calendar } from 'lucide-react';
import { triggerLoveBurst } from './CanvasPetals';
import { romanticAudio } from '../utils/audioPlayer';
import heroImg from '../assets/images/couple_touching_face_no_collar_1791530754918.jpg';

interface HeroProps {
  partnerName: string;
  senderName: string;
  startDate: string;
  relationshipNote: string;
}

export const Hero: React.FC<HeroProps> = ({
  partnerName,
  senderName,
  startDate,
  relationshipNote,
}) => {
  const [elapsed, setElapsed] = useState({
    days: 100,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [burstCount, setBurstCount] = useState(0);

  // Runaway button state & refs
  const runawayBtnRef = useRef<HTMLButtonElement | null>(null);
  const [runawayOffset, setRunawayOffset] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);
  const lastDodgeTime = useRef<number>(0);

  const dodgeButton = () => {
    const now = Date.now();
    if (now - lastDodgeTime.current < 140) return; // Debounce rapid triggers
    lastDodgeTime.current = now;

    // Pick a new offset far from current
    const angles = [45, 135, 225, 315, 90, 270, 0, 180];
    const angle = angles[Math.floor(Math.random() * angles.length)] * (Math.PI / 180);
    const distance = 120 + Math.random() * 120; // 120px - 240px away

    const newX = Math.max(-220, Math.min(220, Math.cos(angle) * distance));
    const newY = Math.max(-140, Math.min(140, Math.sin(angle) * distance));

    setRunawayOffset({ x: newX, y: newY });
    setDodgeCount((c) => c + 1);
    romanticAudio.playTenderChime();
  };

  // Cursor proximity detection: moves away before the cursor can even reach the button!
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!runawayBtnRef.current) return;
      const rect = runawayBtnRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      // If cursor gets within 85px of the button center, run away!
      if (dist < 85) {
        dodgeButton();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setElapsed({
        days: days === 0 ? 100 : days,
        hours,
        minutes,
        seconds,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  const handleCelebrate = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerLoveBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    romanticAudio.playTenderChime();
    setBurstCount((c) => c + 1);
  };

  const getRunawayLabel = () => {
    if (dodgeCount === 0) return 'if you love me click me';
    if (dodgeCount === 1) return 'Too slow! 😜';
    if (dodgeCount === 2) return 'Almost! Try again! 🏃💨';
    if (dodgeCount === 3) return 'Over here! 😂';
    if (dodgeCount === 4) return 'You really love me that much?! 🥰';
    return 'Nope, can’t catch me! 💖';
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Split Hero Section */}
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12">
          {/* Left Column: Typographic Narrative */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <h1 className="font-serif-display text-4xl leading-tight font-medium text-stone-900 sm:text-5xl lg:text-6xl text-balance">
              100 Days of Talking, Laughing, and Falling for You
            </h1>

            <p className="mt-6 text-base leading-relaxed text-stone-600 sm:text-lg max-w-2xl">
              {relationshipNote ||
                `From that first nervous notification on June 30th to 2,400 hours of continuous warmth, inside jokes, and sleepy midnight calls. Every single conversation with you feels like coming home.`}
            </p>

            {/* Live Accurate Time Counter Card */}
            <div className="mt-8 rounded-2xl border border-stone-200/90 bg-white/80 p-6 shadow-xs backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <span className="text-xs font-semibold tracking-wide text-stone-500 uppercase">
                  Connected & Talking Since Day 1
                </span>
                <span className="flex items-center gap-1 text-xs text-rose-600 font-medium">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{startDate}</span>
                </span>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-3 text-center">
                <div className="rounded-xl bg-[#FAF7F2] p-3 border border-stone-200/60">
                  <span className="block font-serif-display text-2xl font-bold text-stone-900 sm:text-3xl tabular-nums">
                    {elapsed.days}
                  </span>
                  <span className="mt-1 block text-xs text-stone-500 font-medium">Days</span>
                </div>
                <div className="rounded-xl bg-[#FAF7F2] p-3 border border-stone-200/60">
                  <span className="block font-serif-display text-2xl font-bold text-stone-900 sm:text-3xl tabular-nums">
                    {elapsed.hours}
                  </span>
                  <span className="mt-1 block text-xs text-stone-500 font-medium">Hours</span>
                </div>
                <div className="rounded-xl bg-[#FAF7F2] p-3 border border-stone-200/60">
                  <span className="block font-serif-display text-2xl font-bold text-stone-900 sm:text-3xl tabular-nums">
                    {elapsed.minutes}
                  </span>
                  <span className="mt-1 block text-xs text-stone-500 font-medium">Minutes</span>
                </div>
                <div className="rounded-xl bg-[#FAF7F2] p-3 border border-stone-200/60">
                  <span className="block font-serif-display text-2xl font-bold text-rose-700 sm:text-3xl tabular-nums">
                    {elapsed.seconds}
                  </span>
                  <span className="mt-1 block text-xs text-rose-600 font-medium">Seconds</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="relative mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={handleCelebrate}
                className="group flex items-center gap-2 rounded-full bg-rose-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-rose-700 hover:shadow-lg active:scale-95 whitespace-nowrap z-10"
              >
                <Heart className="h-4 w-4 fill-white transition-transform group-hover:scale-115" />
                <span>Celebrate 100 Days!</span>
                {burstCount > 0 && (
                  <span className="ml-1 text-xs text-rose-200">({burstCount}x)</span>
                )}
              </button>

              {/* Playful Runaway Button */}
              <button
                ref={runawayBtnRef}
                onMouseEnter={dodgeButton}
                onMouseOver={dodgeButton}
                onTouchStart={(e) => {
                  e.preventDefault();
                  dodgeButton();
                }}
                onClick={(e) => {
                  e.preventDefault();
                  dodgeButton();
                }}
                style={{
                  transform: `translate(${runawayOffset.x}px, ${runawayOffset.y}px)`,
                }}
                className="relative cursor-pointer rounded-full border-2 border-dashed border-rose-300 bg-white/95 px-6 py-3 text-sm font-medium text-rose-700 shadow-sm transition-transform duration-200 ease-out hover:border-rose-400 select-none whitespace-nowrap z-20"
              >
                <span>{getRunawayLabel()}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Container at Matching Height */}
          <div className="relative flex items-center lg:col-span-5">
            <div className="relative w-full overflow-hidden rounded-3xl border-8 border-white bg-stone-100 shadow-xl transition-transform hover:shadow-2xl">
              <img
                src={heroImg}
                alt="MaeMae and Jojo anime couple illustration"
                referrerPolicy="no-referrer"
                className="h-[440px] w-full object-cover lg:h-[520px]"
              />

              {/* Measured Scrim & Subtle Polarized Note */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 text-white">
                <p className="font-handwriting text-lg text-rose-200 sm:text-xl">
                  &ldquo;100 days of you, and I still fall a little more every day.&rdquo;
                </p>
                <div className="mt-2 flex items-center justify-between text-xs text-stone-300 font-light">
                  <span>{senderName} &amp; {partnerName}</span>
                  <span>Day 100 Forever</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
