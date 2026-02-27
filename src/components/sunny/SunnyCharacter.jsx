import React from 'react';
import { motion } from 'framer-motion';

// Expression types:
// idle/happy - neutral happy face, small smile, eyes open
// waving - happy crescents for eyes, open mouth (existing)
// thinking - eyes look up-right, small mouth
// browsing-up - eyes looking up (user scrolling down)
// browsing-down - eyes looking down (user scrolling up)
// blinking - eyes closed (thin lines)
// celebrating - big smile, happy crescent eyes
// bigCelebrating - huge smile, sparkle eyes
// sleeping - closed eyes (curved down), peaceful mouth

export default function SunnyCharacter({ expression = 'happy', size = 52 }) {
  const isHappy = expression === 'happy' || expression === 'idle';
  const isBrowsingUp = expression === 'browsing-up';
  const isBrowsingDown = expression === 'browsing-down';
  const isBlinking = expression === 'blinking';
  const isCelebrating = expression === 'celebrating';
  const isBigCelebrating = expression === 'bigCelebrating';
  const isSleeping = expression === 'sleeping';
  const isThinking = expression === 'thinking';
  const isWaving = expression === 'waving';

  return (
    <motion.div style={{ width: size, height: size }}>
      <svg viewBox="0 0 60 60" width={size} height={size}>
        {/* Rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="30" y1="30"
            x2={30 + Math.cos((angle * Math.PI) / 180) * 28}
            y2={30 + Math.sin((angle * Math.PI) / 180) * 28}
            stroke="#F5B731"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity={isSleeping ? 0.3 : 0.6}
          />
        ))}

        {/* Body */}
        <defs>
          <radialGradient id="sunGrad" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="100%" stopColor="#F5B731" />
          </radialGradient>
        </defs>
        <circle cx="30" cy="30" r="18" fill="url(#sunGrad)" />

        {/* Cheeks */}
        <circle cx="22" cy="33" r="3.5" fill="#FFCC80" opacity={(isCelebrating || isBigCelebrating) ? 0.7 : 0.5} />
        <circle cx="38" cy="33" r="3.5" fill="#FFCC80" opacity={(isCelebrating || isBigCelebrating) ? 0.7 : 0.5} />

        {/* ===== EYES ===== */}

        {/* Happy / Idle — neutral open eyes */}
        {isHappy && (
          <>
            <circle cx="24" cy="27" r="2.5" fill="#2D2B55" />
            <circle cx="36" cy="27" r="2.5" fill="#2D2B55" />
            <circle cx="25" cy="26" r="0.8" fill="white" />
            <circle cx="37" cy="26" r="0.8" fill="white" />
          </>
        )}

        {/* Waving — happy crescent eyes */}
        {isWaving && (
          <>
            <path d="M22 27 Q24 24 26 27" fill="none" stroke="#2D2B55" strokeWidth="2" strokeLinecap="round" />
            <path d="M34 27 Q36 24 38 27" fill="none" stroke="#2D2B55" strokeWidth="2" strokeLinecap="round" />
          </>
        )}

        {/* Browsing Up — eyes looking upward */}
        {isBrowsingUp && (
          <>
            <circle cx="24" cy="26" r="2.5" fill="#2D2B55" />
            <circle cx="36" cy="26" r="2.5" fill="#2D2B55" />
            <circle cx="24.5" cy="24.5" r="0.8" fill="white" />
            <circle cx="36.5" cy="24.5" r="0.8" fill="white" />
          </>
        )}

        {/* Browsing Down — eyes looking downward */}
        {isBrowsingDown && (
          <>
            <circle cx="24" cy="28" r="2.5" fill="#2D2B55" />
            <circle cx="36" cy="28" r="2.5" fill="#2D2B55" />
            <circle cx="24.5" cy="29.5" r="0.8" fill="white" />
            <circle cx="36.5" cy="29.5" r="0.8" fill="white" />
          </>
        )}

        {/* Blinking — eyes as thin lines */}
        {isBlinking && (
          <>
            <line x1="21" y1="27" x2="27" y2="27" stroke="#2D2B55" strokeWidth="2" strokeLinecap="round" />
            <line x1="33" y1="27" x2="39" y2="27" stroke="#2D2B55" strokeWidth="2" strokeLinecap="round" />
          </>
        )}

        {/* Celebrating — happy crescent eyes */}
        {isCelebrating && (
          <>
            <path d="M22 27 Q24 23 26 27" fill="none" stroke="#2D2B55" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M34 27 Q36 23 38 27" fill="none" stroke="#2D2B55" strokeWidth="2.2" strokeLinecap="round" />
          </>
        )}

        {/* Big Celebrating — sparkle crescent eyes with star highlights */}
        {isBigCelebrating && (
          <>
            <path d="M22 27 Q24 23 26 27" fill="none" stroke="#2D2B55" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M34 27 Q36 23 38 27" fill="none" stroke="#2D2B55" strokeWidth="2.2" strokeLinecap="round" />
            {/* Sparkle stars near eyes */}
            <g opacity="0.9">
              <path d="M20 23 L20.8 21 L21.6 23 L23.6 23 L22 24.2 L22.6 26 L20.8 24.8 L19 26 L19.6 24.2 L18 23Z" fill="#F5B731" />
              <path d="M38 23 L38.8 21 L39.6 23 L41.6 23 L40 24.2 L40.6 26 L38.8 24.8 L37 26 L37.6 24.2 L36 23Z" fill="#F5B731" />
            </g>
          </>
        )}

        {/* Thinking — eyes look up and right */}
        {isThinking && (
          <>
            <circle cx="25" cy="26" r="2.5" fill="#2D2B55" />
            <circle cx="37" cy="26" r="2.5" fill="#2D2B55" />
            <circle cx="26" cy="25" r="0.8" fill="white" />
            <circle cx="38" cy="25" r="0.8" fill="white" />
          </>
        )}

        {/* Sleeping — closed eyes as gentle downward curves */}
        {isSleeping && (
          <>
            <path d="M22 27 Q24 29 26 27" fill="none" stroke="#2D2B55" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M34 27 Q36 29 38 27" fill="none" stroke="#2D2B55" strokeWidth="1.8" strokeLinecap="round" />
          </>
        )}

        {/* ===== MOUTH ===== */}

        {/* Happy / Idle — small smile */}
        {isHappy && (
          <path d="M25 34 Q30 39 35 34" fill="none" stroke="#2D2B55" strokeWidth="1.8" strokeLinecap="round" />
        )}

        {/* Waving — open circle mouth */}
        {isWaving && (
          <circle cx="30" cy="35" r="2.5" fill="#2D2B55" opacity="0.8" />
        )}

        {/* Browsing — slight smile */}
        {(isBrowsingUp || isBrowsingDown) && (
          <path d="M26 34 Q30 37 34 34" fill="none" stroke="#2D2B55" strokeWidth="1.5" strokeLinecap="round" />
        )}

        {/* Blinking — small smile */}
        {isBlinking && (
          <path d="M27 34 Q30 36 33 34" fill="none" stroke="#2D2B55" strokeWidth="1.5" strokeLinecap="round" />
        )}

        {/* Celebrating — big smile */}
        {isCelebrating && (
          <path d="M24 33 Q30 40 36 33" fill="none" stroke="#2D2B55" strokeWidth="2" strokeLinecap="round" />
        )}

        {/* Big Celebrating — huge open smile */}
        {isBigCelebrating && (
          <>
            <path d="M23 33 Q30 42 37 33" fill="#2D2B55" opacity="0.15" />
            <path d="M23 33 Q30 42 37 33" fill="none" stroke="#2D2B55" strokeWidth="2" strokeLinecap="round" />
          </>
        )}

        {/* Thinking — small "o" mouth offset right */}
        {isThinking && (
          <circle cx="32" cy="35" r="2" fill="#2D2B55" opacity="0.6" />
        )}

        {/* Sleeping — peaceful tiny smile */}
        {isSleeping && (
          <path d="M28 35 Q30 36.5 32 35" fill="none" stroke="#2D2B55" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        )}

        {/* Sleeping Zzz */}
        {isSleeping && (
          <g opacity="0.6" fill="#2D2B55">
            <text x="42" y="20" fontSize="8" fontWeight="bold" fontFamily="Nunito, sans-serif">z</text>
            <text x="46" y="14" fontSize="6" fontWeight="bold" fontFamily="Nunito, sans-serif">z</text>
            <text x="49" y="9" fontSize="4.5" fontWeight="bold" fontFamily="Nunito, sans-serif">z</text>
          </g>
        )}
      </svg>
    </motion.div>
  );
}
