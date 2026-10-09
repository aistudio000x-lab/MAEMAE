import React, { useEffect, useState } from 'react';

interface BunnyCharacterProps {
  angerLevel: number;
  isSuccess: boolean;
  isShaking: boolean;
  speechText: string;
}

export const BunnyCharacter: React.FC<BunnyCharacterProps> = ({
  angerLevel,
  isSuccess,
  isShaking,
  speechText,
}) => {
  const [blink, setBlink] = useState(false);

  // Gentle natural blinking when not in raging beast mode
  useEffect(() => {
    if (angerLevel >= 3 || isSuccess) return;
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 160);
    }, 3200 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, [angerLevel, isSuccess]);

  // Determine stage visual styles
  const isDemon = angerLevel >= 4;
  const isFurious = angerLevel === 3;
  const isAnnoyed = angerLevel === 2;
  const isSuspicious = angerLevel === 1;

  // Fur color based on rage
  const furFill = isSuccess
    ? '#FFFDF9'
    : isDemon
    ? '#2D1B22' // Corrupted dark demon rabbit fur
    : isFurious
    ? '#FFEBEB' // Flushed angry red-tinted fur
    : isAnnoyed
    ? '#FFF4F2'
    : '#FFFFFF';

  const furStroke = isDemon ? '#7F1D1D' : isFurious ? '#991B1B' : '#451A03';

  return (
    <div className="relative flex flex-col items-center">
      {/* Dynamic Speech Bubble */}
      <div className="relative mb-6 max-w-sm sm:max-w-md px-6 py-3.5 rounded-2xl bg-white border-2 shadow-lg transition-all text-center">
        <p
          className={`text-sm sm:text-base font-semibold leading-snug ${
            isSuccess
              ? 'text-rose-600 font-serif-display text-lg'
              : isDemon
              ? 'text-red-700 font-bold uppercase tracking-wide'
              : isFurious
              ? 'text-red-600 font-bold'
              : isAnnoyed
              ? 'text-orange-700 font-medium'
              : 'text-stone-800'
          }`}
        >
          {speechText}
        </p>

        {/* Speech Bubble Arrow */}
        <div
          className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-12 ${
            isDemon
              ? 'border-t-red-600'
              : isFurious
              ? 'border-t-red-400'
              : 'border-t-white'
          }`}
        />
      </div>

      {/* Bunny Container with Anger Vibrations & Aura */}
      <div
        className={`relative transition-transform duration-300 ${
          isDemon
            ? 'animate-bunny-tremor animate-evil-aura scale-110'
            : isFurious
            ? 'animate-bunny-tremor scale-105'
            : isShaking
            ? 'animate-bunny-shake'
            : isSuccess
            ? 'animate-bounce'
            : 'animate-float'
        }`}
      >
        {/* Steam Puffs for Stage 2 & 3 */}
        {(isAnnoyed || isFurious) && (
          <div className="absolute -top-6 -right-2 text-2xl animate-pulse select-none">
            💢
          </div>
        )}
        {isAnnoyed && (
          <div className="absolute -top-4 -left-4 text-xl select-none animate-bounce">
            💨
          </div>
        )}

        {/* Dark Red Lightning / Fire for Demon Mode */}
        {isDemon && (
          <div className="absolute -inset-4 rounded-full bg-red-600/20 blur-xl animate-pulse pointer-events-none" />
        )}

        {/* SVG Vector Cartoon Bunny */}
        <svg
          viewBox="0 0 280 320"
          className="w-56 h-64 sm:w-64 sm:h-72 drop-shadow-md transition-all duration-300"
        >
          <defs>
            {/* Red Eye Glow Filter */}
            <filter id="redGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="evilShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#7F1D1D" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* Bunny Shadow */}
          <ellipse
            cx="140"
            cy="305"
            rx={isDemon ? '80' : '65'}
            ry="14"
            fill={isDemon ? 'rgba(153, 27, 27, 0.45)' : 'rgba(0,0,0,0.08)'}
          />

          {/* EARS */}
          {/* Left Ear */}
          <g
            className="transition-transform duration-300 origin-bottom"
            style={{
              transform: isDemon
                ? 'rotate(-25deg) translate(-25px, 20px)'
                : isFurious
                ? 'rotate(-18deg) translate(-15px, 10px)'
                : isSuspicious
                ? 'rotate(-6deg)'
                : 'rotate(0deg)',
              transformOrigin: '90px 140px',
            }}
          >
            {/* Outer Ear */}
            <path
              d={
                isDemon
                  ? 'M 85 140 C 40 80, 20 20, 65 5 C 95 30, 115 80, 110 140 Z'
                  : 'M 90 140 C 60 85, 45 25, 75 10 C 105 25, 115 80, 110 140 Z'
              }
              fill={furFill}
              stroke={furStroke}
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Inner Ear */}
            <path
              d={
                isDemon
                  ? 'M 82 125 C 50 80, 35 35, 68 20 C 88 38, 100 80, 98 125 Z'
                  : 'M 86 125 C 65 80, 55 40, 75 25 C 95 40, 102 80, 98 125 Z'
              }
              fill={isDemon ? '#991B1B' : isFurious ? '#EF4444' : '#FCE7F3'}
            />
            {/* Demon Horn Tip Accent */}
            {isDemon && (
              <polygon points="50,15 65,5 72,25" fill="#EF4444" />
            )}
          </g>

          {/* Right Ear */}
          <g
            className="transition-transform duration-300 origin-bottom"
            style={{
              transform: isDemon
                ? 'rotate(25deg) translate(25px, 20px)'
                : isFurious
                ? 'rotate(18deg) translate(15px, 10px)'
                : isSuspicious
                ? 'rotate(10deg)'
                : 'rotate(0deg)',
              transformOrigin: '190px 140px',
            }}
          >
            {/* Outer Ear */}
            <path
              d={
                isDemon
                  ? 'M 195 140 C 240 80, 260 20, 215 5 C 185 30, 165 80, 170 140 Z'
                  : 'M 190 140 C 220 85, 235 25, 205 10 C 175 25, 165 80, 170 140 Z'
              }
              fill={furFill}
              stroke={furStroke}
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Inner Ear */}
            <path
              d={
                isDemon
                  ? 'M 198 125 C 230 80, 245 35, 212 20 C 192 38, 180 80, 182 125 Z'
                  : 'M 194 125 C 215 80, 225 40, 205 25 C 185 40, 178 80, 182 125 Z'
              }
              fill={isDemon ? '#991B1B' : isFurious ? '#EF4444' : '#FCE7F3'}
            />
            {/* Demon Horn Tip Accent */}
            {isDemon && (
              <polygon points="230,15 215,5 208,25" fill="#EF4444" />
            )}
          </g>

          {/* BODY & BELLY */}
          <path
            d="M 90 230 C 65 260, 75 300, 140 300 C 205 300, 215 260, 190 230 Z"
            fill={furFill}
            stroke={furStroke}
            strokeWidth="4"
          />
          {/* Belly Patch */}
          <ellipse
            cx="140"
            cy="270"
            rx="35"
            ry="24"
            fill={isDemon ? '#450A0A' : '#FFF1F2'}
          />

          {/* HEAD */}
          {/* Chubby Fluffy Cheeks Head Shape */}
          <path
            d="M 85 170 C 60 185, 60 220, 95 240 C 120 252, 160 252, 185 240 C 220 220, 220 185, 195 170 C 185 140, 95 140, 85 170 Z"
            fill={furFill}
            stroke={furStroke}
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* CHEEKS */}
          {isSuccess ? (
            // Heart-shaped happy blush
            <>
              <circle cx="88" cy="215" r="14" fill="#FDA4AF" opacity="0.85" />
              <circle cx="192" cy="215" r="14" fill="#FDA4AF" opacity="0.85" />
            </>
          ) : isDemon ? (
            // Demon black-red marks
            <>
              <path d="M 75 210 L 95 218 L 80 225" stroke="#DC2626" strokeWidth="3" fill="none" />
              <path d="M 205 210 L 185 218 L 200 225" stroke="#DC2626" strokeWidth="3" fill="none" />
            </>
          ) : (
            // Normal blush
            <>
              <ellipse
                cx="90"
                cy="215"
                rx={isFurious ? '16' : '14'}
                ry={isFurious ? '12' : '10'}
                fill={isFurious ? '#EF4444' : isAnnoyed ? '#F87171' : '#FDA4AF'}
                opacity={isFurious ? 0.95 : 0.75}
              />
              <ellipse
                cx="190"
                cy="215"
                rx={isFurious ? '16' : '14'}
                ry={isFurious ? '12' : '10'}
                fill={isFurious ? '#EF4444' : isAnnoyed ? '#F87171' : '#FDA4AF'}
                opacity={isFurious ? 0.95 : 0.75}
              />
            </>
          )}

          {/* EYEBROWS */}
          {isSuccess ? (
            // Cheerful curved high eyebrows
            <>
              <path d="M 100 162 Q 112 155 124 162" stroke="#451A03" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 156 162 Q 168 155 180 162" stroke="#451A03" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          ) : isDemon ? (
            // Sharp jagged evil demon brows
            <>
              <path d="M 95 160 L 128 178" stroke="#DC2626" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M 185 160 L 152 178" stroke="#DC2626" strokeWidth="5" strokeLinecap="round" fill="none" />
            </>
          ) : isFurious ? (
            // Heavy angry brows tilted steep
            <>
              <path d="M 98 165 L 126 177" stroke="#991B1B" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <path d="M 182 165 L 154 177" stroke="#991B1B" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            </>
          ) : isAnnoyed ? (
            // Annoyed furrowed brows
            <>
              <path d="M 100 168 L 125 174" stroke="#451A03" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M 180 168 L 155 174" stroke="#451A03" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </>
          ) : isSuspicious ? (
            // One raised brow, one lowered
            <>
              <path d="M 100 166 Q 112 162 124 168" stroke="#451A03" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 156 160 Q 168 152 180 160" stroke="#451A03" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          ) : (
            // Cute gentle brows
            <>
              <path d="M 102 165 Q 114 160 124 166" stroke="#451A03" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 156 166 Q 166 160 178 165" stroke="#451A03" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* EYES */}
          {blink ? (
            // Blinking happy closed eyes
            <>
              <path d="M 102 185 Q 115 195 125 185" stroke={furStroke} strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M 155 185 Q 165 195 178 185" stroke={furStroke} strokeWidth="4" strokeLinecap="round" fill="none" />
            </>
          ) : isSuccess ? (
            // Glowing Pink Heart Eyes for MaeMae!
            <>
              <g transform="translate(100, 172) scale(0.9)">
                <path
                  d="M 12 5 C 12 0, 0 0, 0 10 C 0 18, 12 25, 12 25 C 12 25, 24 18, 24 10 C 24 0, 12 0, 12 5 Z"
                  fill="#EC4899"
                />
                <circle cx="8" cy="8" r="3" fill="#FFFFFF" />
              </g>
              <g transform="translate(156, 172) scale(0.9)">
                <path
                  d="M 12 5 C 12 0, 0 0, 0 10 C 0 18, 12 25, 12 25 C 12 25, 24 18, 24 10 C 24 0, 12 0, 12 5 Z"
                  fill="#EC4899"
                />
                <circle cx="8" cy="8" r="3" fill="#FFFFFF" />
              </g>
            </>
          ) : isDemon ? (
            // Glowing Fiery Red Eyes with Slit Beast Pupils (Stage 4)
            <>
              {/* Left Eye */}
              <ellipse
                cx="112"
                cy="186"
                rx="18"
                ry="18"
                fill="#FF0000"
                filter="url(#redGlow)"
                stroke="#7F1D1D"
                strokeWidth="2"
              />
              {/* Black Slit Pupil */}
              <ellipse cx="112" cy="186" rx="4" ry="16" fill="#000000" />
              <circle cx="108" cy="180" r="2.5" fill="#FFFFFF" />

              {/* Right Eye */}
              <ellipse
                cx="168"
                cy="186"
                rx="18"
                ry="18"
                fill="#FF0000"
                filter="url(#redGlow)"
                stroke="#7F1D1D"
                strokeWidth="2"
              />
              {/* Black Slit Pupil */}
              <ellipse cx="168" cy="186" rx="4" ry="16" fill="#000000" />
              <circle cx="164" cy="180" r="2.5" fill="#FFFFFF" />
            </>
          ) : isFurious ? (
            // Crimson Red Eyes (Stage 3)
            <>
              {/* Left Eye */}
              <circle
                cx="114"
                cy="187"
                r="15"
                fill="#DC2626"
                filter="url(#redGlow)"
              />
              <ellipse cx="114" cy="187" rx="5" ry="13" fill="#450A0A" />
              <circle cx="110" cy="182" r="3" fill="#FFFFFF" />

              {/* Right Eye */}
              <circle
                cx="166"
                cy="187"
                r="15"
                fill="#DC2626"
                filter="url(#redGlow)"
              />
              <ellipse cx="166" cy="187" rx="5" ry="13" fill="#450A0A" />
              <circle cx="162" cy="182" r="3" fill="#FFFFFF" />
            </>
          ) : isAnnoyed ? (
            // Squinting Glaring Dark Eyes
            <>
              <ellipse cx="114" cy="188" rx="14" ry="10" fill="#291207" />
              <circle cx="111" cy="185" r="4" fill="#FFFFFF" />
              <ellipse cx="166" cy="188" rx="14" ry="10" fill="#291207" />
              <circle cx="163" cy="185" r="4" fill="#FFFFFF" />
            </>
          ) : (
            // Huge Sparkly Cute Anime Eyes (Stage 0 & 1)
            <>
              {/* Left Eye */}
              <circle cx="113" cy="186" r="16" fill="#291207" />
              <circle cx="109" cy="180" r="6" fill="#FFFFFF" />
              <circle cx="118" cy="192" r="2.5" fill="#FFFFFF" />
              <ellipse cx="113" cy="194" rx="7" ry="2" fill="#831843" opacity="0.6" />

              {/* Right Eye */}
              <circle cx="167" cy="186" r="16" fill="#291207" />
              <circle cx="163" cy="180" r="6" fill="#FFFFFF" />
              <circle cx="172" cy="192" r="2.5" fill="#FFFFFF" />
              <ellipse cx="167" cy="194" rx="7" ry="2" fill="#831843" opacity="0.6" />
            </>
          )}

          {/* NOSE */}
          <polygon
            points="136,197 144,197 140,203"
            fill={isDemon ? '#991B1B' : '#F43F5E'}
          />

          {/* MOUTH & FANGS */}
          {isSuccess ? (
            // Big Beaming Happy Smile
            <g>
              <path
                d="M 124 204 Q 140 230 156 204 Z"
                fill="#BE123C"
                stroke="#451A03"
                strokeWidth="3"
              />
              {/* Cute front buck teeth */}
              <rect x="134" y="204" width="6" height="7" rx="1" fill="#FFFFFF" stroke="#451A03" strokeWidth="1" />
              <rect x="140" y="204" width="6" height="7" rx="1" fill="#FFFFFF" stroke="#451A03" strokeWidth="1" />
              {/* Pink tongue */}
              <path d="M 130 220 Q 140 215 150 220 Q 140 230 130 220" fill="#FB7185" />
            </g>
          ) : isDemon ? (
            // DEMON BEAST MOUTH WITH LARGE WICKED FANGS (STAGE 4)
            <g>
              {/* Wide open dark gaping maw */}
              <path
                d="M 112 205 Q 140 195 168 205 Q 166 238 140 242 Q 114 238 112 205 Z"
                fill="#450A0A"
                stroke="#991B1B"
                strokeWidth="3.5"
              />
              {/* Dark Tongue */}
              <path d="M 126 234 Q 140 224 154 234 Q 140 242 126 234" fill="#881337" />

              {/* LEFT GIANT PROMINENT FANG */}
              <path
                d="M 116 204 L 126 204 L 121 248 Z"
                fill="#FFFFFF"
                stroke="#7F1D1D"
                strokeWidth="2"
              />

              {/* RIGHT GIANT PROMINENT FANG */}
              <path
                d="M 154 204 L 164 204 L 159 248 Z"
                fill="#FFFFFF"
                stroke="#7F1D1D"
                strokeWidth="2"
              />

              {/* Sharp bottom fangs pointing up */}
              <polygon points="128,238 132,238 130,224" fill="#FFFFFF" stroke="#7F1D1D" strokeWidth="1.5" />
              <polygon points="148,238 152,238 150,224" fill="#FFFFFF" stroke="#7F1D1D" strokeWidth="1.5" />
            </g>
          ) : isFurious ? (
            // Stage 3 Growling Mouth showing emerging pointed fangs
            <g>
              <path
                d="M 120 206 Q 140 198 160 206 Q 158 226 140 228 Q 122 226 120 206 Z"
                fill="#591313"
                stroke="#991B1B"
                strokeWidth="3"
              />
              {/* Left Pointy Fang */}
              <polygon points="123,205 131,205 127,222" fill="#FFFFFF" stroke="#450A0A" strokeWidth="1" />
              {/* Right Pointy Fang */}
              <polygon points="149,205 157,205 153,222" fill="#FFFFFF" stroke="#450A0A" strokeWidth="1" />
            </g>
          ) : isAnnoyed ? (
            // Stage 2 Annoyed Gritting Teeth Frown
            <g>
              <path
                d="M 124 207 Q 140 201 156 207 Q 154 218 140 219 Q 126 218 124 207 Z"
                fill="#3B1206"
                stroke="#451A03"
                strokeWidth="2.5"
              />
              {/* Clenched teeth line */}
              <line x1="126" y1="212" x2="154" y2="212" stroke="#FFFFFF" strokeWidth="2.5" />
            </g>
          ) : isSuspicious ? (
            // Stage 1 Wavy skeptical mouth
            <path
              d="M 125 210 Q 134 205 142 211 Q 150 207 155 211"
              stroke="#451A03"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            // Stage 0 Cute 'ω' Bunny Cat Smile
            <g>
              <path
                d="M 126 205 Q 133 212 140 205 Q 147 212 154 205"
                stroke="#451A03"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              {/* Tiny front teeth peeking */}
              <rect x="136" y="206" width="3.5" height="4.5" rx="1" fill="#FFFFFF" stroke="#451A03" strokeWidth="0.8" />
              <rect x="140.5" y="206" width="3.5" height="4.5" rx="1" fill="#FFFFFF" stroke="#451A03" strokeWidth="0.8" />
            </g>
          )}

          {/* PAWS */}
          <ellipse
            cx="105"
            cy="245"
            rx="14"
            ry="11"
            fill={furFill}
            stroke={furStroke}
            strokeWidth="3.5"
          />
          <ellipse
            cx="175"
            cy="245"
            rx="14"
            ry="11"
            fill={furFill}
            stroke={furStroke}
            strokeWidth="3.5"
          />
        </svg>
      </div>
    </div>
  );
};
