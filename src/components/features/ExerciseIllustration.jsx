import React from 'react';

// Clean, professional pictogram-style illustrations for senior chair exercises
// Uses simple geometric shapes with friendly rounded styling

// Seated Arm Raises — person seated with arms raised overhead
function SeatedArmRaises() {
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" fill="none">
      {/* Chair */}
      <rect x="35" y="72" width="50" height="5" rx="2.5" fill="#C5CAE9" />
      <rect x="80" y="38" width="5" height="39" rx="2.5" fill="#C5CAE9" />
      <line x1="38" y1="77" x2="34" y2="100" stroke="#C5CAE9" strokeWidth="4" strokeLinecap="round" />
      <line x1="82" y1="77" x2="86" y2="100" stroke="#C5CAE9" strokeWidth="4" strokeLinecap="round" />

      {/* Person - torso seated */}
      <circle cx="60" cy="30" r="11" fill="#FFCC80" />
      {/* Smile */}
      <path d="M55,32 Q60,37 65,32" stroke="#8D6E63" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Eyes */}
      <circle cx="56" cy="28" r="1.5" fill="#5D4037" />
      <circle cx="64" cy="28" r="1.5" fill="#5D4037" />

      {/* Body */}
      <line x1="60" y1="41" x2="60" y2="72" stroke="#7B1FA2" strokeWidth="4" strokeLinecap="round" />

      {/* Left arm raised */}
      <line x1="60" y1="48" x2="42" y2="20" stroke="#7B1FA2" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="42" cy="20" r="4" fill="#FFCC80" />

      {/* Right arm raised */}
      <line x1="60" y1="48" x2="78" y2="20" stroke="#7B1FA2" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="78" cy="20" r="4" fill="#FFCC80" />

      {/* Legs seated */}
      <line x1="60" y1="72" x2="48" y2="72" stroke="#7B1FA2" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="48" y1="72" x2="42" y2="95" stroke="#7B1FA2" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="60" y1="72" x2="68" y2="72" stroke="#7B1FA2" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="68" y1="72" x2="72" y2="95" stroke="#7B1FA2" strokeWidth="3.5" strokeLinecap="round" />

      {/* Arrow indicators */}
      <path d="M36,28 L36,10" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" />
      <path d="M36,10 L32,16 M36,10 L40,16" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" />
      <path d="M84,28 L84,10" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" />
      <path d="M84,10 L80,16 M84,10 L88,16" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Chair Squats — person mid-rise from chair
function ChairSquats() {
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" fill="none">
      {/* Chair */}
      <rect x="45" y="72" width="45" height="5" rx="2.5" fill="#C5CAE9" />
      <rect x="85" y="38" width="5" height="39" rx="2.5" fill="#C5CAE9" />
      <line x1="48" y1="77" x2="44" y2="100" stroke="#C5CAE9" strokeWidth="4" strokeLinecap="round" />
      <line x1="87" y1="77" x2="91" y2="100" stroke="#C5CAE9" strokeWidth="4" strokeLinecap="round" />

      {/* Person - slightly risen, leaning forward */}
      <circle cx="52" cy="28" r="11" fill="#FFCC80" />
      {/* Smile */}
      <path d="M47,30 Q52,35 57,30" stroke="#8D6E63" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Eyes */}
      <circle cx="48" cy="26" r="1.5" fill="#5D4037" />
      <circle cx="56" cy="26" r="1.5" fill="#5D4037" />

      {/* Body - slight lean */}
      <line x1="52" y1="39" x2="58" y2="66" stroke="#7B1FA2" strokeWidth="4" strokeLinecap="round" />

      {/* Arms forward for balance */}
      <line x1="54" y1="46" x2="36" y2="42" stroke="#7B1FA2" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="36" cy="42" r="4" fill="#FFCC80" />
      <line x1="54" y1="46" x2="38" y2="52" stroke="#7B1FA2" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="38" cy="52" r="4" fill="#FFCC80" />

      {/* Legs - knees bent */}
      <line x1="58" y1="66" x2="46" y2="78" stroke="#7B1FA2" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="46" y1="78" x2="42" y2="98" stroke="#7B1FA2" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="58" y1="66" x2="64" y2="78" stroke="#7B1FA2" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="64" y1="78" x2="62" y2="98" stroke="#7B1FA2" strokeWidth="3.5" strokeLinecap="round" />

      {/* Up arrow */}
      <path d="M52,22 L52,6" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" />
      <path d="M52,6 L48,12 M52,6 L56,12" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Ankle Circles — person seated, one foot extended with circular motion
function AnkleCircles() {
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" fill="none">
      {/* Chair */}
      <rect x="35" y="62" width="50" height="5" rx="2.5" fill="#C5CAE9" />
      <rect x="80" y="28" width="5" height="39" rx="2.5" fill="#C5CAE9" />
      <line x1="38" y1="67" x2="34" y2="100" stroke="#C5CAE9" strokeWidth="4" strokeLinecap="round" />
      <line x1="82" y1="67" x2="86" y2="100" stroke="#C5CAE9" strokeWidth="4" strokeLinecap="round" />

      {/* Person */}
      <circle cx="60" cy="20" r="11" fill="#FFCC80" />
      <path d="M55,22 Q60,27 65,22" stroke="#8D6E63" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="56" cy="18" r="1.5" fill="#5D4037" />
      <circle cx="64" cy="18" r="1.5" fill="#5D4037" />

      {/* Body */}
      <line x1="60" y1="31" x2="60" y2="62" stroke="#7B1FA2" strokeWidth="4" strokeLinecap="round" />

      {/* Arms resting on lap */}
      <line x1="60" y1="40" x2="48" y2="56" stroke="#7B1FA2" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="48" cy="56" r="4" fill="#FFCC80" />
      <line x1="60" y1="40" x2="72" y2="56" stroke="#7B1FA2" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="72" cy="56" r="4" fill="#FFCC80" />

      {/* Right leg down */}
      <line x1="64" y1="62" x2="70" y2="62" stroke="#7B1FA2" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="70" y1="62" x2="72" y2="90" stroke="#7B1FA2" strokeWidth="3.5" strokeLinecap="round" />

      {/* Left leg extended */}
      <line x1="56" y1="62" x2="48" y2="62" stroke="#7B1FA2" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="48" y1="62" x2="30" y2="80" stroke="#7B1FA2" strokeWidth="3.5" strokeLinecap="round" />

      {/* Foot circle */}
      <circle cx="26" cy="84" r="4" fill="#FFCC80" />

      {/* Circular arrow around foot */}
      <path d="M18,84 A10,10 0 1,1 26,74" stroke="#0097A7" strokeWidth="2" fill="none" strokeDasharray="4 3" />
      <path d="M26,74 L22,78 M26,74 L30,78" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Seated Marching — person seated with one knee raised high
function SeatedMarching() {
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" fill="none">
      {/* Chair */}
      <rect x="35" y="62" width="50" height="5" rx="2.5" fill="#C5CAE9" />
      <rect x="80" y="28" width="5" height="39" rx="2.5" fill="#C5CAE9" />
      <line x1="38" y1="67" x2="34" y2="100" stroke="#C5CAE9" strokeWidth="4" strokeLinecap="round" />
      <line x1="82" y1="67" x2="86" y2="100" stroke="#C5CAE9" strokeWidth="4" strokeLinecap="round" />

      {/* Person */}
      <circle cx="60" cy="20" r="11" fill="#FFCC80" />
      <path d="M55,22 Q60,27 65,22" stroke="#8D6E63" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="56" cy="18" r="1.5" fill="#5D4037" />
      <circle cx="64" cy="18" r="1.5" fill="#5D4037" />

      {/* Body */}
      <line x1="60" y1="31" x2="60" y2="62" stroke="#7B1FA2" strokeWidth="4" strokeLinecap="round" />

      {/* Left arm up (marching opposite) */}
      <line x1="60" y1="40" x2="44" y2="34" stroke="#7B1FA2" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="44" cy="34" r="4" fill="#FFCC80" />

      {/* Right arm down */}
      <line x1="60" y1="40" x2="74" y2="54" stroke="#7B1FA2" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="74" cy="54" r="4" fill="#FFCC80" />

      {/* Right leg down */}
      <line x1="64" y1="62" x2="70" y2="62" stroke="#7B1FA2" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="70" y1="62" x2="72" y2="90" stroke="#7B1FA2" strokeWidth="3.5" strokeLinecap="round" />

      {/* Left leg raised - knee up */}
      <line x1="56" y1="62" x2="44" y2="52" stroke="#7B1FA2" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="44" y1="52" x2="44" y2="72" stroke="#7B1FA2" strokeWidth="3.5" strokeLinecap="round" />

      {/* Up arrow on raised knee */}
      <path d="M38,58 L38,42" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" />
      <path d="M38,42 L34,48 M38,42 L42,48" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const illustrations = {
  'ex-1': SeatedArmRaises,
  'ex-2': ChairSquats,
  'ex-3': AnkleCircles,
  'ex-4': SeatedMarching,
};

export default function ExerciseIllustration({ exerciseId }) {
  const Illustration = illustrations[exerciseId];
  if (!Illustration) return null;
  return (
    <div className="flex justify-center my-3 rounded-xl p-4" style={{ backgroundColor: 'var(--color-purple-pale)' }}>
      <div style={{ width: 140, height: 140 }}>
        <Illustration />
      </div>
    </div>
  );
}
