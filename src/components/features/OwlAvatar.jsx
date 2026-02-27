import React from 'react';
import { motion } from 'framer-motion';

// "Ollie" the Owl — friendly owl face avatar for the AI assistant
// Warm purple tones to complement Sunny's teal/yellow palette

export default function OwlAvatar({ size = 40, animate = false }) {
  const Wrapper = animate ? motion.div : 'div';
  const animProps = animate
    ? {
        animate: { y: [0, -3, 0] },
        transition: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' },
      }
    : {};

  return (
    <Wrapper {...animProps} style={{ width: size, height: size, flexShrink: 0 }}>
      <svg viewBox="0 0 80 80" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Head shape - large round face */}
        <circle cx="40" cy="42" r="32" fill="#9575CD" />

        {/* Ear tufts */}
        <path d="M14,18 L20,6 L26,20" fill="#7E57C2" />
        <path d="M66,18 L60,6 L54,20" fill="#7E57C2" />

        {/* Face disc - heart-shaped owl face */}
        <path d="M40,12 Q58,14 60,38 Q58,58 40,64 Q22,58 20,38 Q22,14 40,12Z" fill="#EDE7F6" />

        {/* Left eye ring */}
        <circle cx="31" cy="34" r="12" fill="white" stroke="#B39DDB" strokeWidth="1.5" />
        {/* Left pupil */}
        <circle cx="32" cy="33" r="6" fill="#4A148C" />
        {/* Left eye shine */}
        <circle cx="34" cy="30" r="2.5" fill="white" />
        <circle cx="30" cy="35" r="1" fill="white" />

        {/* Right eye ring */}
        <circle cx="49" cy="34" r="12" fill="white" stroke="#B39DDB" strokeWidth="1.5" />
        {/* Right pupil */}
        <circle cx="50" cy="33" r="6" fill="#4A148C" />
        {/* Right eye shine */}
        <circle cx="52" cy="30" r="2.5" fill="white" />
        <circle cx="48" cy="35" r="1" fill="white" />

        {/* Beak */}
        <path d="M36,44 L40,52 L44,44" fill="#FFB74D" />
        <path d="M36,44 Q40,47 44,44" fill="#F9A825" />

        {/* Cheek blush */}
        <ellipse cx="20" cy="42" rx="4" ry="3" fill="#CE93D8" opacity="0.45" />
        <ellipse cx="60" cy="42" rx="4" ry="3" fill="#CE93D8" opacity="0.45" />

        {/* Smile below beak */}
        <path d="M35,55 Q40,59 45,55" stroke="#7E57C2" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Feather tufts on top of head */}
        <circle cx="33" cy="16" r="3" fill="#B39DDB" />
        <circle cx="40" cy="13" r="3.5" fill="#B39DDB" />
        <circle cx="47" cy="16" r="3" fill="#B39DDB" />
      </svg>
    </Wrapper>
  );
}
