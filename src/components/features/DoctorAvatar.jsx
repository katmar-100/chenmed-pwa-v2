import React from 'react';

// SVG doctor avatar illustrations - each has unique features
const avatarStyles = {
  'female-1': { skin: '#E8B89D', hair: '#2D2B55', hairStyle: 'long', glasses: false, accessory: 'stethoscope' },
  'female-2': { skin: '#C68E6A', hair: '#1a1a1a', hairStyle: 'bun', glasses: true, accessory: 'none' },
  'female-3': { skin: '#F5D0B5', hair: '#5C3A21', hairStyle: 'short', glasses: false, accessory: 'stethoscope' },
  'male-1': { skin: '#D4A574', hair: '#2D2B55', hairStyle: 'short-m', glasses: false, accessory: 'stethoscope' },
  'male-2': { skin: '#E8B89D', hair: '#8B6914', hairStyle: 'parted', glasses: true, accessory: 'none' },
};

export default function DoctorAvatar({ type = 'female-1', size = 72 }) {
  const style = avatarStyles[type] || avatarStyles['female-1'];

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} className="rounded-full" style={{ backgroundColor: 'var(--color-teal-pale)' }}>
      {/* Background circle */}
      <circle cx="40" cy="40" r="40" fill="var(--color-teal-pale)" />

      {/* Coat */}
      <path d="M20 70 Q20 52 40 48 Q60 52 60 70" fill="white" />
      <path d="M35 48 L35 58 L40 62 L45 58 L45 48" fill="white" />

      {/* Neck */}
      <rect x="35" y="42" width="10" height="8" rx="2" fill={style.skin} />

      {/* Head */}
      <ellipse cx="40" cy="34" rx="14" ry="16" fill={style.skin} />

      {/* Hair */}
      {style.hairStyle === 'long' && (
        <path d="M26 30 Q26 16 40 14 Q54 16 54 30 L54 38 Q52 30 40 28 Q28 30 26 38 Z" fill={style.hair} />
      )}
      {style.hairStyle === 'bun' && (
        <>
          <path d="M26 32 Q26 16 40 14 Q54 16 54 32 L52 28 Q48 22 40 20 Q32 22 28 28 Z" fill={style.hair} />
          <circle cx="40" cy="16" r="6" fill={style.hair} />
        </>
      )}
      {style.hairStyle === 'short' && (
        <path d="M26 32 Q26 16 40 14 Q54 16 54 32 L52 26 Q48 20 40 18 Q32 20 28 26 Z" fill={style.hair} />
      )}
      {style.hairStyle === 'short-m' && (
        <path d="M26 30 Q26 16 40 14 Q54 16 54 30 L52 24 Q48 18 40 17 Q32 18 28 24 Z" fill={style.hair} />
      )}
      {style.hairStyle === 'parted' && (
        <path d="M28 30 Q26 16 40 14 Q54 16 54 30 L52 24 Q48 17 40 16 Q34 17 30 22 Z" fill={style.hair} />
      )}

      {/* Eyes */}
      <circle cx="34" cy="33" r="2" fill="#2D2B55" />
      <circle cx="46" cy="33" r="2" fill="#2D2B55" />
      <circle cx="34.5" cy="32.5" r="0.6" fill="white" />
      <circle cx="46.5" cy="32.5" r="0.6" fill="white" />

      {/* Glasses */}
      {style.glasses && (
        <>
          <circle cx="34" cy="33" r="5" fill="none" stroke="#2D2B55" strokeWidth="1.2" />
          <circle cx="46" cy="33" r="5" fill="none" stroke="#2D2B55" strokeWidth="1.2" />
          <line x1="39" y1="33" x2="41" y2="33" stroke="#2D2B55" strokeWidth="1" />
        </>
      )}

      {/* Smile */}
      <path d="M36 38 Q40 42 44 38" fill="none" stroke="#2D2B55" strokeWidth="1.2" strokeLinecap="round" />

      {/* Stethoscope */}
      {style.accessory === 'stethoscope' && (
        <>
          <path d="M32 52 Q30 60 35 62" fill="none" stroke="var(--color-teal)" strokeWidth="1.5" />
          <circle cx="35" cy="63" r="2.5" fill="none" stroke="var(--color-teal)" strokeWidth="1.5" />
        </>
      )}
    </svg>
  );
}
