import React from 'react';
import { motion } from 'framer-motion';

const avatarDesigns = {
  'flower-pink': { bg: '#FCE4EC', content: (
    <g><circle cx="24" cy="24" r="8" fill="#E91E63"/>{[0,60,120,180,240,300].map(a=><circle key={a} cx={24+12*Math.cos(a*Math.PI/180)} cy={24+12*Math.sin(a*Math.PI/180)} r="6" fill="#F48FB1"/>)}<circle cx="24" cy="24" r="5" fill="#FFF176"/></g>
  )},
  'flower-blue': { bg: '#E3F2FD', content: (
    <g><circle cx="24" cy="24" r="8" fill="#1976D2"/>{[0,72,144,216,288].map(a=><circle key={a} cx={24+12*Math.cos(a*Math.PI/180)} cy={24+12*Math.sin(a*Math.PI/180)} r="7" fill="#90CAF9"/>)}<circle cx="24" cy="24" r="5" fill="#FFF176"/></g>
  )},
  'bird-teal': { bg: '#E0F2F1', content: (
    <g><ellipse cx="24" cy="26" rx="12" ry="10" fill="#0D7C7C"/><circle cx="24" cy="20" r="8" fill="#0D7C7C"/><circle cx="27" cy="18" r="2" fill="white"/><circle cx="27.5" cy="18" r="1" fill="#2D2B55"/><path d="M20 22 L16 20 L20 21" fill="#F5B731"/><path d="M18 30 Q24 36 30 30" fill="none" stroke="#0D7C7C" strokeWidth="2"/></g>
  )},
  'sun-happy': { bg: '#F9E8F4', content: (
    <g>{[0,45,90,135,180,225,270,315].map(a=><line key={a} x1="24" y1="24" x2={24+18*Math.cos(a*Math.PI/180)} y2={24+18*Math.sin(a*Math.PI/180)} stroke="#F5B731" strokeWidth="2" strokeLinecap="round"/>)}<circle cx="24" cy="24" r="12" fill="#FFD54F"/><circle cx="20" cy="22" r="1.5" fill="#2D2B55"/><circle cx="28" cy="22" r="1.5" fill="#2D2B55"/><path d="M20 27 Q24 31 28 27" fill="none" stroke="#2D2B55" strokeWidth="1.5" strokeLinecap="round"/></g>
  )},
  'cat-purple': { bg: '#F3E5F5', content: (
    <g><circle cx="24" cy="26" r="12" fill="#9B4DCA"/><polygon points="14,18 18,8 22,18" fill="#9B4DCA"/><polygon points="26,18 30,8 34,18" fill="#9B4DCA"/><circle cx="20" cy="24" r="2" fill="white"/><circle cx="28" cy="24" r="2" fill="white"/><circle cx="20" cy="24" r="1" fill="#2D2B55"/><circle cx="28" cy="24" r="1" fill="#2D2B55"/><ellipse cx="24" cy="28" rx="1.5" ry="1" fill="#F48FB1"/><path d="M20 30 Q24 33 28 30" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6"/></g>
  )},
  'butterfly': { bg: '#E8F5E9', content: (
    <g><ellipse cx="24" cy="24" rx="2" ry="10" fill="#2D2B55"/><ellipse cx="16" cy="20" rx="8" ry="6" fill="#9B4DCA" opacity="0.8"/><ellipse cx="32" cy="20" rx="8" ry="6" fill="#0D7C7C" opacity="0.8"/><ellipse cx="16" cy="30" rx="6" ry="5" fill="#C77DBA" opacity="0.8"/><ellipse cx="32" cy="30" rx="6" ry="5" fill="#1A9E8F" opacity="0.8"/><circle cx="16" cy="20" r="2" fill="white" opacity="0.4"/><circle cx="32" cy="20" r="2" fill="white" opacity="0.4"/></g>
  )},
  'tree-green': { bg: '#E8F5E9', content: (
    <g><rect x="22" y="28" width="4" height="12" rx="1" fill="#795548"/><circle cx="24" cy="22" r="10" fill="#4CAF50"/><circle cx="18" cy="26" r="7" fill="#388E3C"/><circle cx="30" cy="26" r="7" fill="#388E3C"/><circle cx="24" cy="18" r="3" fill="#66BB6A"/></g>
  )},
  'star-gold': { bg: '#F9E8F4', content: (
    <g><polygon points="24,6 28,18 42,18 31,26 35,38 24,30 13,38 17,26 6,18 20,18" fill="#F5B731"/><circle cx="22" cy="22" r="1.5" fill="#2D2B55"/><circle cx="28" cy="22" r="1.5" fill="#2D2B55"/><path d="M22 26 Q24 29 28 26" fill="none" stroke="#2D2B55" strokeWidth="1.2" strokeLinecap="round"/></g>
  )},
};

export default function AvatarPicker({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {Object.entries(avatarDesigns).map(([key, { bg, content }]) => (
        <motion.button
          key={key}
          whileTap={{ scale: 0.9 }}
          onClick={() => onSelect(key)}
          className="relative rounded-2xl p-2 min-h-[48px] min-w-[48px]"
          style={{
            backgroundColor: bg,
            border: selected === key ? '3px solid var(--color-teal)' : '3px solid transparent',
            boxShadow: selected === key ? '0 0 0 2px var(--color-teal-pale)' : 'none',
          }}
        >
          <svg viewBox="0 0 48 48" width="100%" height="100%">{content}</svg>
        </motion.button>
      ))}
    </div>
  );
}

export function AvatarDisplay({ avatarKey, size = 120 }) {
  const design = avatarDesigns[avatarKey];
  if (!design) {
    // Default avatar - friendly face
    return (
      <div className="rounded-full flex items-center justify-center" style={{ width: size, height: size, background: 'linear-gradient(135deg, var(--color-teal-pale), var(--color-purple-pale))' }}>
        <svg viewBox="0 0 48 48" width={size * 0.6} height={size * 0.6}>
          <circle cx="24" cy="20" r="10" fill="var(--color-teal)" opacity="0.3" />
          <circle cx="24" cy="20" r="8" fill="var(--color-teal)" opacity="0.2" />
          <circle cx="21" cy="18" r="1.5" fill="var(--color-navy)" />
          <circle cx="27" cy="18" r="1.5" fill="var(--color-navy)" />
          <path d="M20 23 Q24 27 28 23" fill="none" stroke="var(--color-navy)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M14 34 Q14 28 24 26 Q34 28 34 34" fill="var(--color-teal)" opacity="0.3" />
        </svg>
      </div>
    );
  }
  return (
    <div className="rounded-full overflow-hidden flex items-center justify-center" style={{ width: size, height: size, backgroundColor: design.bg }}>
      <svg viewBox="0 0 48 48" width={size * 0.65} height={size * 0.65}>{design.content}</svg>
    </div>
  );
}
