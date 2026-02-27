import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useSunny } from '../../context/SunnyContext';
import { longevityTips, healthArticles } from '../../data/mockData';
import PageShell from '../../components/ui/PageShell';
import Card from '../../components/ui/Card';
import ProgressRing from '../../components/ui/ProgressRing';
import Toggle from '../../components/ui/Toggle';
import ReturnCapsules from '../../components/ui/ReturnCapsules';
import { ArrowLeft, Lightbulb, BookOpen, Droplets, Footprints, Salad, Moon, Pill, Heart } from 'lucide-react';

const habitItems = [
  { key: 'water', label: 'Drank 6+ glasses of water', Icon: Droplets, color: '#0097A7' },
  { key: 'walk', label: 'Took a walk today', Icon: Footprints, color: '#2E7D32' },
  { key: 'veggies', label: 'Ate a serving of vegetables', Icon: Salad, color: '#558B2F' },
  { key: 'sleep', label: 'Got 7+ hours of sleep', Icon: Moon, color: '#5C6BC0' },
  { key: 'meds', label: 'Took all medications', Icon: Pill, color: '#7B1FA2' },
  { key: 'gratitude', label: 'Practiced gratitude', Icon: Heart, color: '#E91E63' },
];

export default function Longevity() {
  const navigate = useNavigate();
  const { habits, updateHabits, medications } = useApp();
  const { triggerCelebration } = useSunny();

  const allMedsTaken = medications.every(m => m.takenToday);
  const effectiveHabits = { ...habits, meds: allMedsTaken };
  const completedCount = Object.values(effectiveHabits).filter(Boolean).length;
  const score = Math.round((completedCount / habitItems.length) * 100);
  const allComplete = score >= 100;
  const prevCompleteRef = useRef(allComplete);

  useEffect(() => {
    if (allComplete && !prevCompleteRef.current) {
      triggerCelebration('big');
    }
    prevCompleteRef.current = allComplete;
  }, [allComplete, triggerCelebration]);

  // Daily tip - rotate by day
  const dayIndex = new Date().getDate() % longevityTips.length;
  const tip = longevityTips[dayIndex];

  return (
    <PageShell>
      <button onClick={() => navigate('/explore')} className="flex items-center gap-2 mb-4 min-h-[48px]" style={{ color: 'var(--color-teal)' }}>
        <ArrowLeft size={20} /> Back to Explore
      </button>
      <h1 className="font-semibold mb-1" style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text-heading)' }}>Longevity</h1>
      <p className="mb-5" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>Small habits, big&nbsp;impact.</p>

      {/* Wellness Score */}
      <Card animate={false} className="mb-5">
        <div className="flex items-center gap-4">
          <ProgressRing value={score} max={100} size={100} strokeWidth={14} complete={allComplete}>
            <span className="font-semibold" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-teal)' }}>{score}</span>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>/100</span>
          </ProgressRing>
          <div>
            <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>Daily Wellness Score</p>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)' }}>
              {score >= 80 ? "You're doing amazing! Keep it\u00A0up!" : score >= 50 ? "Good progress! A few more habits will boost your\u00A0score." : "Every small step counts. Let's check off a few\u00A0habits!"}
            </p>
          </div>
        </div>
      </Card>

      {/* Habit Tracker */}
      <h2 className="font-semibold mb-3" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>Today's Habits</h2>
      <Card animate={false} className="mb-5">
        <div className="space-y-3">
          {habitItems.map(({ key, label, Icon, color }) => (
            <Toggle
              key={key}
              label={label}
              icon={<Icon size={18} style={{ color }} />}
              checked={key === 'meds' ? allMedsTaken : habits[key] || false}
              onChange={(val) => {
                if (key === 'meds') return; // auto-synced
                updateHabits({ ...habits, [key]: val });
                if (val) triggerCelebration('small');
              }}
              description={key === 'meds' ? 'Auto-synced from Medications' : undefined}
            />
          ))}
        </div>
      </Card>

      {/* Weekly Streak */}
      <Card animate={false} className="mb-5">
        <p className="font-semibold mb-3" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>This Week</p>
        <div className="flex justify-between">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => {
            const today = new Date().getDay();
            const adjustedToday = today === 0 ? 6 : today - 1;
            const filled = i <= adjustedToday && i >= adjustedToday - 2;
            return (
              <div key={d} className="flex flex-col items-center gap-1">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: filled ? 'var(--color-teal)' : 'var(--color-surface-muted)',
                    color: filled ? 'white' : 'var(--color-text-muted)',
                  }}
                >
                  {filled ? '✓' : ''}
                </div>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{d}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Daily Tip */}
      <Card animate={false} className="mb-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-teal-pale)' }}>
            <Lightbulb size={18} style={{ color: 'var(--color-teal)' }} />
          </div>
          <div>
            <p className="font-semibold mb-1" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>Daily Tip</p>
            <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text)' }}>{tip}&nbsp;</p>
          </div>
        </div>
      </Card>

      {/* Articles */}
      <h2 className="font-semibold mb-3" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>Health Articles</h2>
      <div className="space-y-3">
        {healthArticles.map(art => (
          <Card key={art.id} animate={false} padding="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-purple-pale)' }}>
                <BookOpen size={18} style={{ color: 'var(--color-purple)' }} />
              </div>
              <div>
                <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>{art.title}</p>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)' }}>{art.summary}</p>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{art.readTime}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <ReturnCapsules sectionName="Explore" sectionPath="/explore" />
    </PageShell>
  );
}
