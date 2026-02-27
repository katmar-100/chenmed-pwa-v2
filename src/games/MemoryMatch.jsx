import React, { useState, useEffect, useMemo } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import { Heart, Apple, Sun, Droplets, Leaf, Smile, Star, Moon } from 'lucide-react';
import { useSunny } from '../context/SunnyContext';

const iconSet = [
  { Icon: Heart, color: '#E91E63' },
  { Icon: Apple, color: '#4CAF50' },
  { Icon: Sun, color: '#F5B731' },
  { Icon: Droplets, color: '#2196F3' },
  { Icon: Leaf, color: '#0D7C7C' },
  { Icon: Smile, color: '#9B4DCA' },
  { Icon: Star, color: '#FF9800' },
  { Icon: Moon, color: '#3F51B5' },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MemoryMatch() {
  const { triggerCelebration } = useSunny();
  const cards = useMemo(() => {
    const pairs = iconSet.map((icon, i) => [
      { id: i * 2, pairId: i, ...icon },
      { id: i * 2 + 1, pairId: i, ...icon },
    ]).flat();
    return shuffle(pairs);
  }, []);

  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (matched.length === iconSet.length && matched.length > 0) {
      triggerCelebration('big');
    }
  }, [matched.length]);

  const handleFlip = (id) => {
    if (disabled || flipped.includes(id) || matched.includes(cards.find(c => c.id === id)?.pairId)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      setDisabled(true);
      const [first, second] = newFlipped.map(fid => cards.find(c => c.id === fid));
      if (first.pairId === second.pairId) {
        setMatched(prev => [...prev, first.pairId]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 800);
      }
    }
  };

  const isFlipped = (id) => flipped.includes(id) || matched.includes(cards.find(c => c.id === id)?.pairId);
  const allMatched = matched.length === iconSet.length;

  const restart = () => {
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setDisabled(false);
  };

  return (
    <div>
      <h2 className="font-semibold mb-2" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>Memory Match</h2>
      <p className="mb-1" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
        Flip two cards to find matching pairs!
      </p>
      <p className="mb-4" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)' }}>
        Moves: {moves} &bull; Pairs found: {matched.length}/{iconSet.length}
      </p>

      <div className="grid grid-cols-4 gap-2 max-w-[320px] mx-auto mb-4">
        {cards.map(card => {
          const showing = isFlipped(card.id);
          const Icon = card.Icon;
          return (
            <motion.button
              key={card.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleFlip(card.id)}
              className="aspect-square rounded-xl flex items-center justify-center min-h-[48px]"
              style={{
                backgroundColor: showing ? 'var(--color-card)' : 'var(--color-teal)',
                border: `2px solid ${showing ? 'var(--color-surface-muted)' : 'var(--color-teal)'}`,
                boxShadow: '0 1px 3px var(--color-shadow)',
              }}
            >
              {showing ? (
                <motion.div initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} transition={{ duration: 0.2 }}>
                  <Icon size={28} color={card.color} />
                </motion.div>
              ) : (
                <span className="font-semibold" style={{ color: 'white', fontSize: 'var(--font-size-lg)' }}>?</span>
              )}
            </motion.button>
          );
        })}
      </div>

      {allMatched && (
        <div className="rounded-2xl p-4 mb-4 text-center" style={{ backgroundColor: 'var(--color-teal-pale)' }}>
          <p className="font-semibold" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-teal)' }}>
            You matched them all in {moves} moves!
          </p>
        </div>
      )}

      <Button onClick={restart} variant="ghost" fullWidth>Start Over</Button>
    </div>
  );
}
