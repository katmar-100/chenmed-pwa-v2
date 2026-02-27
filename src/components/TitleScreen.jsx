import React from 'react';
import { motion } from 'framer-motion';

export default function TitleScreen({ onContinue }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onClick={onContinue}
      className="min-h-screen flex flex-col items-center justify-center cursor-pointer relative overflow-hidden"
    >
      {/* Animated gradient background */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 0%; }
          20% { background-position: 100% 0%; }
          40% { background-position: 100% 100%; }
          60% { background-position: 0% 100%; }
          80% { background-position: 50% 0%; }
          100% { background-position: 0% 0%; }
        }
      `}</style>
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #2D2B55, #0D7C7C, #9B4DCA, #0D7C7C, #2D2B55)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 16s ease-in-out infinite',
        }}
      />

      {/* Subtle animated glow orbs */}
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute rounded-full"
        style={{
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
          top: '15%',
          left: '-10%',
        }}
      />
      <motion.div
        animate={{ x: [0, -25, 15, 0], y: [0, 25, -10, 0], scale: [1, 0.85, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute rounded-full"
        style={{
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          bottom: '10%',
          right: '-15%',
        }}
      />

      {/* Title text */}
      <div className="text-center px-8 relative z-10">
        <motion.img
          src="/chenmed-bug-white.png"
          alt="ChenMed"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          className="mx-auto mb-5"
          style={{ width: '48px', height: 'auto' }}
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          className="font-bold tracking-widest mb-3"
          style={{
            fontSize: 'clamp(28px, 7vw, 42px)',
            color: 'white',
            letterSpacing: '0.15em',
            lineHeight: 1.2,
          }}
        >
          EXPERIENCE
          <br />
          INNOVATION
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}
          className="mx-auto mb-4"
          style={{
            width: '60px',
            height: '2px',
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
          style={{
            fontSize: 'clamp(14px, 3.5vw, 18px)',
            color: 'rgba(255,255,255,0.8)',
            fontWeight: 400,
            letterSpacing: '0.08em',
          }}
        >
          Patient Companion&nbsp;App
        </motion.p>
      </div>

      {/* Tap to continue */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6, ease: 'easeOut' }}
        className="absolute bottom-10 px-5 py-2 rounded-full"
        style={{
          backgroundColor: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <p style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.8)',
          letterSpacing: '0.1em',
        }}>
          tap to&nbsp;continue
        </p>
      </motion.div>
    </motion.div>
  );
}
