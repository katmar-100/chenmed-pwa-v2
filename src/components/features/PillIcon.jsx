import React from 'react';

const pillStyles = {
  'round-white': { type: 'round', color1: '#F5F5F5', color2: '#E0E0E0', stroke: '#BDBDBD' },
  'capsule-blue': { type: 'capsule', color1: '#2196F3', color2: '#E3F2FD', stroke: '#1976D2' },
  'oval-yellow': { type: 'oval', color1: '#FFF176', color2: '#F9A825', stroke: '#F57F17' },
  'round-small': { type: 'round-sm', color1: '#FFFFFF', color2: '#F5F5F5', stroke: '#BDBDBD' },
  'capsule-green': { type: 'capsule', color1: '#4CAF50', color2: '#FFF176', stroke: '#388E3C' },
};

export default function PillIcon({ type = 'round-white', size = 48 }) {
  const style = pillStyles[type] || pillStyles['round-white'];

  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      {style.type === 'round' && (
        <>
          <circle cx="24" cy="24" r="16" fill={style.color1} stroke={style.stroke} strokeWidth="1.5" />
          <line x1="12" y1="24" x2="36" y2="24" stroke={style.stroke} strokeWidth="0.8" opacity="0.5" />
          <ellipse cx="20" cy="20" rx="4" ry="3" fill="white" opacity="0.4" />
        </>
      )}
      {style.type === 'round-sm' && (
        <>
          <circle cx="24" cy="24" r="12" fill={style.color1} stroke={style.stroke} strokeWidth="1.5" />
          <line x1="16" y1="24" x2="32" y2="24" stroke={style.stroke} strokeWidth="0.8" opacity="0.5" />
          <ellipse cx="21" cy="21" rx="3" ry="2" fill="white" opacity="0.4" />
        </>
      )}
      {style.type === 'capsule' && (
        <>
          <rect x="8" y="14" width="32" height="20" rx="10" fill={style.color2} stroke={style.stroke} strokeWidth="1.5" />
          <rect x="8" y="14" width="16" height="20" rx="10" fill={style.color1} stroke="none" />
          <rect x="8" y="14" width="32" height="20" rx="10" fill="none" stroke={style.stroke} strokeWidth="1.5" />
          <ellipse cx="16" cy="20" rx="3" ry="2" fill="white" opacity="0.3" />
        </>
      )}
      {style.type === 'oval' && (
        <>
          <ellipse cx="24" cy="24" rx="18" ry="12" fill={style.color1} stroke={style.stroke} strokeWidth="1.5" />
          <line x1="24" y1="12" x2="24" y2="36" stroke={style.stroke} strokeWidth="0.8" opacity="0.4" />
          <ellipse cx="18" cy="20" rx="5" ry="3" fill="white" opacity="0.3" />
        </>
      )}
    </svg>
  );
}
