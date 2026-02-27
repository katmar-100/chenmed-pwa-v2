import React, { useId, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Sparkle({ cx, cy, delay, size = 3, starColor }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1.2, 1, 0],
      }}
      transition={{
        duration: 1.6,
        delay,
        repeat: Infinity,
        repeatDelay: 1.2,
        ease: 'easeInOut',
      }}
      style={{ originX: `${cx}px`, originY: `${cy}px` }}
    >
      <line x1={cx} y1={cy - size} x2={cx} y2={cy + size} stroke={starColor} strokeWidth="1.5" strokeLinecap="round" />
      <line x1={cx - size} y1={cy} x2={cx + size} y2={cy} stroke={starColor} strokeWidth="1.5" strokeLinecap="round" />
      <line x1={cx - size * 0.6} y1={cy - size * 0.6} x2={cx + size * 0.6} y2={cy + size * 0.6} stroke={starColor} strokeWidth="1" strokeLinecap="round" />
      <line x1={cx + size * 0.6} y1={cy - size * 0.6} x2={cx - size * 0.6} y2={cy + size * 0.6} stroke={starColor} strokeWidth="1" strokeLinecap="round" />
    </motion.g>
  );
}

function useResolvedColor(varName) {
  const [color, setColor] = useState('#888');
  useEffect(() => {
    const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    if (val) setColor(val);
  }, [varName]);
  return color;
}

export default function ProgressRing({ value, max, size = 120, strokeWidth = 14, children, complete = false }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = max > 0 ? value / max : 0;
  const offset = circumference * (1 - progress);
  const gradientId = useId();

  // Resolve CSS variables to actual colors for SVG animate
  const teal = useResolvedColor('--color-teal');
  const tealLight = useResolvedColor('--color-teal-light');
  const purple = useResolvedColor('--color-purple');
  const purpleSoft = useResolvedColor('--color-purple-soft');
  const starColor = useResolvedColor('--color-star');

  // Generate sparkle positions around the ring
  const sparkleCount = 8;
  const sparkleRadius = size / 2 + 6;
  const sparkles = Array.from({ length: sparkleCount }, (_, i) => {
    const angle = (i / sparkleCount) * Math.PI * 2 - Math.PI / 2;
    return {
      cx: size / 2 + Math.cos(angle) * sparkleRadius,
      cy: size / 2 + Math.sin(angle) * sparkleRadius,
      delay: i * 0.2,
      size: i % 2 === 0 ? 4 : 2.5,
    };
  });

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size + 20, height: size + 20 }}>
      <svg width={size + 20} height={size + 20}>
        <g transform={`translate(10, 10)`}>
          {/* Gradient definition for complete state */}
          {complete && (
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={teal}>
                  <animate attributeName="stop-color" values={`${teal};${purple};${tealLight};${teal}`} dur="4s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor={purpleSoft}>
                  <animate attributeName="stop-color" values={`${purpleSoft};${teal};${purple};${purpleSoft}`} dur="4s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor={tealLight}>
                  <animate attributeName="stop-color" values={`${tealLight};${teal};${purpleSoft};${tealLight}`} dur="4s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
          )}

          {/* Background ring */}
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none"
            stroke="var(--color-surface-muted)"
            strokeWidth={strokeWidth}
            transform={`rotate(-90, ${size / 2}, ${size / 2})`}
          />

          {/* Progress ring */}
          <motion.circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none"
            stroke={complete ? `url(#${gradientId})` : 'var(--color-teal)'}
            strokeWidth={complete ? strokeWidth + 2 : strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: 'easeOut' }}
            transform={`rotate(-90, ${size / 2}, ${size / 2})`}
          />

          {/* Glow effect when complete */}
          <AnimatePresence>
            {complete && (
              <motion.circle
                cx={size / 2} cy={size / 2} r={radius}
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth={strokeWidth + 6}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={0}
                opacity={0.2}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.1, 0.25, 0.1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                transform={`rotate(-90, ${size / 2}, ${size / 2})`}
              />
            )}
          </AnimatePresence>

          {/* Sparkles when complete */}
          <AnimatePresence>
            {complete && sparkles.map((s, i) => (
              <Sparkle key={i} cx={s.cx} cy={s.cy} delay={s.delay} size={s.size} starColor={starColor} />
            ))}
          </AnimatePresence>
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
