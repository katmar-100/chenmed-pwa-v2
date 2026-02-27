import React, { useEffect, useState } from 'react';

const colors = ['#0D7C7C', '#9B4DCA', '#F5B731', '#1A9E8F', '#C77DBA', '#2D2B55'];

export default function Confetti({ trigger }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!trigger) return;
    const p = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 1.5 + Math.random() * 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 6,
      rotation: Math.random() * 360,
    }));
    setParticles(p);
    const timer = setTimeout(() => setParticles([]), 3500);
    return () => clearTimeout(timer);
  }, [trigger]);

  if (!particles.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: '-10px',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}
