import React, { useState, useMemo, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useSunny } from '../context/SunnyContext';

const WORDS = ['HEART', 'WALK', 'WATER', 'SLEEP', 'SMILE', 'HEALTH'];
const SIZE = 8;

function generateGrid(words) {
  const grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(''));
  const placements = [];

  // Place words
  words.forEach(word => {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 100) {
      attempts++;
      const dir = Math.random() > 0.5 ? 'h' : 'v';
      const r = Math.floor(Math.random() * (dir === 'v' ? SIZE - word.length : SIZE));
      const c = Math.floor(Math.random() * (dir === 'h' ? SIZE - word.length : SIZE));

      let canPlace = true;
      const cells = [];
      for (let i = 0; i < word.length; i++) {
        const cr = dir === 'v' ? r + i : r;
        const cc = dir === 'h' ? c + i : c;
        if (grid[cr][cc] !== '' && grid[cr][cc] !== word[i]) { canPlace = false; break; }
        cells.push({ r: cr, c: cc });
      }

      if (canPlace) {
        cells.forEach((pos, i) => { grid[pos.r][pos.c] = word[i]; });
        placements.push({ word, cells });
        placed = true;
      }
    }
  });

  // Fill empty cells
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (grid[r][c] === '') grid[r][c] = letters[Math.floor(Math.random() * 26)];
    }
  }

  return { grid, placements };
}

export default function WordSearch() {
  const { triggerCelebration } = useSunny();
  const { grid, placements } = useMemo(() => generateGrid(WORDS), []);
  const [selected, setSelected] = useState([]);
  const [found, setFound] = useState([]);

  useEffect(() => {
    if (found.length === WORDS.length && found.length > 0) {
      triggerCelebration('big');
    }
  }, [found.length]);

  const toggleCell = (r, c) => {
    const key = `${r}-${c}`;
    let newSelected;
    if (selected.includes(key)) {
      newSelected = selected.filter(s => s !== key);
    } else {
      newSelected = [...selected, key];
    }
    setSelected(newSelected);

    // Check if any word is fully selected
    placements.forEach(({ word, cells }) => {
      if (found.includes(word)) return;
      const allSelected = cells.every(({ r, c }) => newSelected.includes(`${r}-${c}`));
      if (allSelected) {
        setFound(prev => [...prev, word]);
        // Keep those cells selected, clear others
        const wordCells = cells.map(({ r, c }) => `${r}-${c}`);
        setSelected(prev => prev.filter(s => wordCells.includes(s)));
      }
    });
  };

  const isPartOfFound = (r, c) => {
    return placements.some(({ word, cells }) => found.includes(word) && cells.some(cell => cell.r === r && cell.c === c));
  };

  const allFound = found.length === WORDS.length;

  return (
    <div>
      <h2 className="font-semibold mb-2" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>Word Search</h2>
      <p className="mb-4" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
        Tap letters to find these health words!
      </p>

      {/* Word list */}
      <div className="flex flex-wrap gap-2 mb-4">
        {WORDS.map(w => (
          <span
            key={w}
            className="px-3 py-1 rounded-full font-semibold"
            style={{
              fontSize: 'var(--font-size-xs)',
              backgroundColor: found.includes(w) ? 'var(--color-teal-pale)' : 'var(--color-surface-muted)',
              color: found.includes(w) ? 'var(--color-teal)' : 'var(--color-text)',
              textDecoration: found.includes(w) ? 'line-through' : 'none',
            }}
          >
            {w}
          </span>
        ))}
      </div>

      <Card animate={false} className="mb-4">
        <div className="grid gap-1 max-w-[320px] mx-auto" style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }}>
          {grid.map((row, r) =>
            row.map((letter, c) => {
              const isSelected = selected.includes(`${r}-${c}`);
              const isFound = isPartOfFound(r, c);
              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => toggleCell(r, c)}
                  className="aspect-square flex items-center justify-center rounded-lg font-semibold min-h-[36px] transition-colors"
                  style={{
                    fontSize: 'var(--font-size-base)',
                    backgroundColor: isFound ? 'var(--color-teal)' : isSelected ? 'var(--color-purple-pale)' : 'var(--color-surface-muted)',
                    color: isFound ? 'white' : 'var(--color-text-heading)',
                  }}
                >
                  {letter}
                </button>
              );
            })
          )}
        </div>
      </Card>

      {allFound && (
        <div className="rounded-2xl p-4 text-center" style={{ backgroundColor: 'var(--color-teal-pale)' }}>
          <p className="font-semibold" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-teal)' }}>
            You found all the words! Amazing!
          </p>
        </div>
      )}
    </div>
  );
}
