import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../../components/ui/PageShell';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Sudoku from '../../games/Sudoku';
import WordSearch from '../../games/WordSearch';
import Trivia from '../../games/Trivia';
import MemoryMatch from '../../games/MemoryMatch';
import { ArrowLeft, Grid3x3, Search, HelpCircle, Layers, ChevronDown, ChevronUp } from 'lucide-react';
import ReturnCapsules from '../../components/ui/ReturnCapsules';
import { motion, AnimatePresence } from 'framer-motion';

const games = [
  { id: 'sudoku', name: 'Sudoku', icon: Grid3x3, desc: 'Fill in the grid with numbers', bg: '#CCF0F6', iconColor: '#0097A7', learnMore: "Sudoku exercises your logical thinking and concentration. Studies show that regular puzzle-solving can help maintain cognitive function as we age." },
  { id: 'wordsearch', name: 'Word Search', icon: Search, desc: 'Find hidden health words', bg: '#E2D5F0', iconColor: '#7B1FA2', learnMore: "Word searches improve pattern recognition and vocabulary recall. They're a fun way to keep your visual scanning skills sharp!" },
  { id: 'trivia', name: 'Daily Trivia', icon: HelpCircle, desc: '5 health trivia questions', bg: '#FFF3E0', iconColor: '#E65100', learnMore: "Learning new health facts helps you make better decisions about your wellness. Plus, it's a great conversation starter with friends!" },
  { id: 'memory', name: 'Memory Match', icon: Layers, desc: 'Match pairs of health icons', bg: '#E8F5E9', iconColor: '#2E7D32', learnMore: "Memory games strengthen your short-term recall and attention span. Even 10 minutes a day can make a difference!" },
];

export default function Games() {
  const navigate = useNavigate();
  const [activeGame, setActiveGame] = useState(null);
  const [expandedInfo, setExpandedInfo] = useState(null);

  if (activeGame) {
    const GameComponent = { sudoku: Sudoku, wordsearch: WordSearch, trivia: Trivia, memory: MemoryMatch }[activeGame];
    return (
      <PageShell>
        <button onClick={() => setActiveGame(null)} className="flex items-center gap-2 mb-4 min-h-[48px]" style={{ color: 'var(--color-teal)' }}>
          <ArrowLeft size={20} /> Back to Games
        </button>
        <GameComponent />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <button onClick={() => navigate('/explore')} className="flex items-center gap-2 mb-4 min-h-[48px]" style={{ color: 'var(--color-teal)' }}>
        <ArrowLeft size={20} /> Back to Explore
      </button>
      <h1 className="font-semibold mb-1" style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text-heading)' }}>Games</h1>
      <p className="mb-5" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>Keep your mind sharp and have&nbsp;fun!</p>

      <div className="space-y-3">
        {games.map(game => {
          const Icon = game.icon;
          return (
            <div key={game.id}>
              <Card animate={false} padding="p-0" className="overflow-hidden">
                <button
                  onClick={() => setActiveGame(game.id)}
                  className="w-full flex items-center gap-4 p-4 min-h-[48px] text-left"
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: game.bg }}>
                    <Icon size={22} style={{ color: game.iconColor }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>{game.name}</p>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{game.desc}&nbsp;</p>
                  </div>
                </button>
                <button
                  onClick={() => setExpandedInfo(expandedInfo === game.id ? null : game.id)}
                  className="w-full flex items-center gap-2 px-4 pb-3 min-h-[36px]"
                  style={{ color: 'var(--color-purple)', fontSize: 'var(--font-size-xs)' }}
                >
                  Learn More {expandedInfo === game.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                <AnimatePresence>
                  {expandedInfo === game.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 border-t pt-3" style={{ borderColor: 'var(--color-surface-muted)' }}>
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)' }}>{game.learnMore}&nbsp;</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </div>
          );
        })}
      </div>

      <ReturnCapsules sectionName="Explore" sectionPath="/explore" />
    </PageShell>
  );
}
