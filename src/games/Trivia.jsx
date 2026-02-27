import React, { useState } from 'react';
import { triviaQuestions } from '../data/mockData';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import { useSunny } from '../context/SunnyContext';

export default function Trivia() {
  const { triggerCelebration } = useSunny();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = triviaQuestions[current];

  const handleAnswer = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.answer) setScore(s => s + 1);
  };

  const next = () => {
    if (current + 1 >= triviaQuestions.length) {
      setFinished(true);
      triggerCelebration('big');
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div>
        <h2 className="font-semibold mb-4" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>Daily Trivia</h2>
        <Card animate={false} className="text-center">
          <p className="font-semibold mb-2" style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-teal)' }}>
            {score}/{triviaQuestions.length}
          </p>
          <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>
            {score === triviaQuestions.length ? 'Perfect score! You\'re a health expert!' : score >= 3 ? 'Great job! You know your health facts!' : 'Keep learning — every fact helps!'}
          </p>
        </Card>
        <Button onClick={restart} fullWidth className="mt-4">Play Again</Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-semibold mb-2" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>Daily Trivia</h2>
      <p className="mb-4" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
        Question {current + 1} of {triviaQuestions.length}
      </p>

      <Card animate={false} className="mb-4">
        <p className="font-semibold mb-4" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>
          {q.q}
        </p>
        <div className="space-y-3">
          {q.options.map((opt, i) => {
            let bg = 'var(--color-surface-muted)';
            let color = 'var(--color-text)';
            if (answered) {
              if (i === q.answer) { bg = 'var(--color-teal-pale)'; color = 'var(--color-teal)'; }
              else if (i === selected && i !== q.answer) { bg = '#FEE2E2'; color = 'var(--color-danger)'; }
            } else if (i === selected) {
              bg = 'var(--color-purple-pale)'; color = 'var(--color-purple)';
            }
            return (
              <motion.button
                key={i}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer(i)}
                className="w-full text-left rounded-xl p-4 min-h-[48px] font-semibold transition-colors"
                style={{ backgroundColor: bg, color, fontSize: 'var(--font-size-base)', border: 'none' }}
              >
                {opt}
              </motion.button>
            );
          })}
        </div>
      </Card>

      {answered && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card animate={false} className="mb-4">
            <p className="font-semibold mb-1" style={{ fontSize: 'var(--font-size-sm)', color: selected === q.answer ? 'var(--color-teal)' : 'var(--color-danger)' }}>
              {selected === q.answer ? 'Correct!' : 'Not quite!'}
            </p>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)' }}>{q.fact}</p>
          </Card>
          <Button onClick={next} fullWidth>
            {current + 1 >= triviaQuestions.length ? 'See Results' : 'Next Question'}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
