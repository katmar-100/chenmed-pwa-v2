import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useSunny } from '../context/SunnyContext';

// Simple 4x4 Sudoku for seniors
const puzzles = [
  {
    initial: [
      [1, 0, 0, 4],
      [0, 4, 1, 0],
      [0, 1, 4, 0],
      [4, 0, 0, 1],
    ],
    solution: [
      [1, 3, 2, 4],
      [2, 4, 1, 3],
      [3, 1, 4, 2],
      [4, 2, 3, 1],
    ],
  },
];

export default function Sudoku() {
  const { triggerCelebration } = useSunny();
  const puzzle = puzzles[0];
  const [grid, setGrid] = useState(puzzle.initial.map(row => [...row]));
  const [errors, setErrors] = useState([]);
  const [solved, setSolved] = useState(false);

  const handleChange = (r, c, val) => {
    const num = parseInt(val) || 0;
    if (num < 0 || num > 4) return;
    const newGrid = grid.map(row => [...row]);
    newGrid[r][c] = num;
    setGrid(newGrid);
    setErrors([]);
    setSolved(false);
  };

  const checkAnswer = () => {
    const errs = [];
    let correct = true;
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (grid[r][c] !== puzzle.solution[r][c]) {
          errs.push(`${r}-${c}`);
          correct = false;
        }
      }
    }
    setErrors(errs);
    if (correct) {
      setSolved(true);
      triggerCelebration('big');
    }
  };

  const reset = () => {
    setGrid(puzzle.initial.map(row => [...row]));
    setErrors([]);
    setSolved(false);
  };

  return (
    <div>
      <h2 className="font-semibold mb-2" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>Sudoku</h2>
      <p className="mb-4" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
        Fill each row, column, and 2×2 box with the numbers 1-4. Each number can only appear once!
      </p>

      <Card animate={false} className="mb-4">
        <div className="grid grid-cols-4 gap-1 max-w-[280px] mx-auto">
          {grid.map((row, r) =>
            row.map((cell, c) => {
              const isFixed = puzzle.initial[r][c] !== 0;
              const hasError = errors.includes(`${r}-${c}`);
              return (
                <div
                  key={`${r}-${c}`}
                  className={`flex items-center justify-center rounded-lg ${r % 2 === 0 && c % 2 === 0 || r % 2 === 1 && c % 2 === 1 ? '' : ''}`}
                  style={{
                    width: '60px', height: '60px',
                    backgroundColor: hasError ? '#FEE2E2' : isFixed ? 'var(--color-surface-muted)' : 'var(--color-card)',
                    border: `2px solid ${hasError ? 'var(--color-danger)' : 'var(--color-surface-muted)'}`,
                    borderRight: c === 1 ? '3px solid var(--color-text-muted)' : undefined,
                    borderBottom: r === 1 ? '3px solid var(--color-text-muted)' : undefined,
                  }}
                >
                  {isFixed ? (
                    <span className="font-semibold" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>{cell}</span>
                  ) : (
                    <input
                      type="number"
                      min="1" max="4"
                      value={cell || ''}
                      onChange={e => handleChange(r, c, e.target.value)}
                      className="w-full h-full text-center font-semibold bg-transparent"
                      style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-teal)', border: 'none', outline: 'none' }}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </Card>

      {solved && (
        <div className="rounded-2xl p-4 mb-4 text-center" style={{ backgroundColor: 'var(--color-teal-pale)' }}>
          <p className="font-semibold" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-teal)' }}>
            Wonderful! You solved it!
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <Button onClick={checkAnswer} fullWidth>Check Answer</Button>
        <Button onClick={reset} variant="ghost" fullWidth>Start Over</Button>
      </div>
    </div>
  );
}
