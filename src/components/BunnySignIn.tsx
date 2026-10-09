import React, { useState } from 'react';
import { BunnyCharacter } from './BunnyCharacter';
import { Heart, Sparkles, ArrowRight, RotateCcw, AlertTriangle } from 'lucide-react';
import { romanticAudio } from '../utils/audioPlayer';
import { triggerLoveBurst } from './CanvasPetals';

interface BunnySignInProps {
  onSuccess: () => void;
}

export const BunnySignIn: React.FC<BunnySignInProps> = ({ onSuccess }) => {
  const [inputName, setInputName] = useState('');
  const [mistakes, setMistakes] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [lastAttempt, setLastAttempt] = useState('');

  // Dialogues for each anger level
  const getSpeechText = () => {
    if (isSuccess) {
      return 'MAEMAE!! ❤️ It really is you!! Welcome to our 100 days surprise! Jojo made this just for you! ✨';
    }

    if (mistakes === 0) {
      return 'Hello there! 🐰 I am the 100-Day Gatekeeper... Who are you?';
    } else if (mistakes === 1) {
      return `Wait a second... "${lastAttempt}"?! That's NOT who Jojo has been talking to for 100 days! Who are you really?! 🤔`;
    } else if (mistakes === 2) {
      return `Hey!! "${lastAttempt}" is DEFINITELY WRONG! Stop trying to fool me! I'm getting annoyed! 😤💨`;
    } else if (mistakes === 3) {
      return `WHO IS "${lastAttempt}"?! 😡 MY EYES ARE TURNING RED!! One more wrong name and I'm losing my temper! 🔥`;
    } else {
      return `ROAAARRR!! 👿🐰 YOU ARE AN IMPOSTOR! MY FANGS ARE OUT! I ONLY ANSWER TO MAEMAE!! RAWRRR! ⚡🩸`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = inputName.trim().toLowerCase().replace(/[\s\-_❤️]/g, '');

    if (!cleaned) return;

    if (cleaned === 'maemae') {
      // Correct!
      setIsSuccess(true);
      romanticAudio.playHappyFanfare();
      triggerLoveBurst();
      setTimeout(() => {
        onSuccess();
      }, 1600);
    } else {
      // Incorrect name
      setLastAttempt(inputName.trim());
      const nextMistakes = mistakes + 1;
      setMistakes(nextMistakes);
      setIsShaking(true);
      romanticAudio.playAngryBunnyGrowl(nextMistakes);

      setTimeout(() => {
        setIsShaking(false);
      }, 500);
    }
  };

  const handleResetBunny = () => {
    setMistakes(0);
    setInputName('');
    setLastAttempt('');
    romanticAudio.playTenderChime();
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-500 ${
        mistakes >= 4
          ? 'bg-gradient-to-b from-stone-950 via-red-950 to-stone-900 text-stone-100'
          : mistakes === 3
          ? 'bg-gradient-to-b from-[#FAF7F2] via-red-50 to-rose-100 text-stone-800'
          : 'bg-[#FAF7F2] text-stone-800'
      }`}
    >
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        {/* Top Header Badge */}
        <div className="mb-4 flex items-center gap-2 text-xs font-medium tracking-wider uppercase">
          <span className={mistakes >= 4 ? 'text-red-400' : 'text-rose-700'}>
            100 Days Celebration Gatekeeper
          </span>
          <span aria-hidden="true" className="opacity-40">·</span>
          <span className="opacity-75">Identify Yourself</span>
        </div>

        {/* The Animated Bunny Character */}
        <div className="my-2">
          <BunnyCharacter
            angerLevel={mistakes}
            isSuccess={isSuccess}
            isShaking={isShaking}
            speechText={getSpeechText()}
          />
        </div>

        {/* Rage Stage Progress Indicator (when angry) */}
        {mistakes > 0 && !isSuccess && (
          <div className="w-full mt-4 mb-2 px-6">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span
                className={`font-medium ${
                  mistakes >= 4 ? 'text-red-400 font-bold' : mistakes === 3 ? 'text-red-600 font-semibold' : 'text-stone-600'
                }`}
              >
                {mistakes === 1 && 'Bunny is Suspicious'}
                {mistakes === 2 && 'Bunny is Grumpy & Annoyed'}
                {mistakes === 3 && 'DANGER: Bunny Eyes Turned RED!'}
                {mistakes >= 4 && 'EXTREME: Full Demon Beast with Giant Fangs!'}
              </span>
              <span className="font-mono text-xs opacity-75">
                Rage: {Math.min(mistakes, 4)} / 4
              </span>
            </div>

            {/* Rage Meter Bar */}
            <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  mistakes >= 4
                    ? 'bg-red-600 w-full animate-pulse'
                    : mistakes === 3
                    ? 'bg-red-500 w-3/4'
                    : mistakes === 2
                    ? 'bg-orange-500 w-1/2'
                    : 'bg-amber-400 w-1/4'
                }`}
              />
            </div>
          </div>
        )}

        {/* Input Form Card */}
        <div
          className={`w-full mt-4 rounded-3xl p-6 sm:p-8 transition-all ${
            mistakes >= 4
              ? 'bg-stone-900/90 border-2 border-red-600 shadow-2xl shadow-red-950/80'
              : 'bg-white border border-stone-200/90 shadow-xl'
          } ${isShaking ? 'animate-bunny-shake' : ''}`}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="girlfriend-name"
                className={`block text-xs font-semibold mb-1.5 ${
                  mistakes >= 4 ? 'text-stone-300' : 'text-stone-700'
                }`}
              >
                Enter your name:
              </label>

              <div className="relative">
                <input
                  id="girlfriend-name"
                  type="text"
                  autoComplete="off"
                  disabled={isSuccess}
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="Who are you?"
                  className={`w-full rounded-2xl px-4 py-3.5 text-base sm:text-lg transition-all focus:outline-hidden ${
                    mistakes >= 4
                      ? 'bg-stone-800 text-white border-2 border-red-500 placeholder:text-stone-500 focus:border-red-400'
                      : mistakes >= 2
                      ? 'bg-rose-50/50 text-stone-900 border-2 border-rose-300 placeholder:text-stone-400 focus:border-rose-500'
                      : 'bg-[#FAF7F2] text-stone-900 border border-stone-300 placeholder:text-stone-400 focus:border-rose-400 focus:bg-white'
                  }`}
                />

                {isSuccess && (
                  <div className="absolute right-3.5 top-3.5 text-rose-600">
                    <Heart className="h-6 w-6 fill-rose-600 animate-ping" />
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSuccess || !inputName.trim()}
              className={`w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 px-6 font-semibold text-sm transition-all shadow-md active:scale-98 disabled:opacity-50 ${
                isSuccess
                  ? 'bg-emerald-600 text-white'
                  : mistakes >= 4
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-900/50'
                  : 'bg-stone-900 hover:bg-stone-800 text-white hover:shadow-lg'
              }`}
            >
              {isSuccess ? (
                <>
                  <Heart className="h-4 w-4 fill-white" />
                  <span>Verified: MaeMae! Entering...</span>
                </>
              ) : (
                <>
                  <span>Submit Answer</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Calming reset */}
          {mistakes > 0 && !isSuccess && (
            <div className="mt-4 pt-4 border-t border-stone-200/50 flex items-center justify-center text-xs">
              <button
                type="button"
                onClick={handleResetBunny}
                className="flex items-center gap-1.5 text-stone-400 hover:text-stone-700 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Calm down the bunny (Reset)</span>
              </button>
            </div>
          )}
        </div>

        {/* Romantic Footer Note */}
        <p className="mt-6 text-xs text-center opacity-60">
          A special 100th-day celebration surprise made with all my love ❤️
        </p>
      </div>
    </div>
  );
};
