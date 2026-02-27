import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { exercises } from '../../data/mockData';
import PageShell from '../../components/ui/PageShell';
import Card from '../../components/ui/Card';
import ProgressRing from '../../components/ui/ProgressRing';
import ReturnCapsules from '../../components/ui/ReturnCapsules';
import { ArrowLeft, ChevronDown, ChevronUp, Footprints, MoveUp, Armchair, RotateCcw, PersonStanding, TreePine, Sunrise, Timer, MapPin } from 'lucide-react';

const chairIcons = {
  'ex-1': { Icon: MoveUp, color: '#0097A7', bg: '#CCF0F6' },
  'ex-2': { Icon: Armchair, color: '#7B1FA2', bg: '#E2D5F0' },
  'ex-3': { Icon: RotateCcw, color: '#E65100', bg: '#FFF3E0' },
  'ex-4': { Icon: PersonStanding, color: '#2E7D32', bg: '#E8F5E9' },
};

const walkingIcons = {
  'wk-1': { Icon: Timer, color: '#0097A7', bg: '#CCF0F6' },
  'wk-2': { Icon: MapPin, color: '#2E7D32', bg: '#E8F5E9' },
  'wk-3': { Icon: TreePine, color: '#7B1FA2', bg: '#E2D5F0' },
};

const stretchIcons = {
  'st-1': { Icon: Sunrise, color: '#E65100', bg: '#FFF3E0' },
  'st-2': { Icon: PersonStanding, color: '#0097A7', bg: '#CCF0F6' },
};

export default function Exercise() {
  const navigate = useNavigate();
  const [expandedEx, setExpandedEx] = useState(null);
  const steps = 3245;
  const goal = 5000;

  return (
    <PageShell>
      <button onClick={() => navigate('/explore')} className="flex items-center gap-2 mb-4 min-h-[48px]" style={{ color: 'var(--color-teal)' }}>
        <ArrowLeft size={20} /> Back to Explore
      </button>
      <h1 className="font-semibold mb-1" style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text-heading)' }}>Exercise</h1>
      <p className="mb-5" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>Move a little, feel a lot&nbsp;better.</p>

      {/* Steps Tracker */}
      <Card animate={false} className="mb-5">
        <div className="flex items-center gap-4">
          <ProgressRing value={steps} max={goal} size={80} strokeWidth={12}>
            <Footprints size={24} style={{ color: 'var(--color-teal)' }} />
          </ProgressRing>
          <div>
            <p className="font-semibold" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>{steps.toLocaleString()} steps</p>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
              You're {Math.round((steps / goal) * 100)}% to your daily&nbsp;goal!
            </p>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)' }}>
              A short walk after lunch will get you&nbsp;there.
            </p>
          </div>
        </div>
      </Card>

      {/* Chair Exercises */}
      <h2 className="font-semibold mb-3" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>Chair Exercises</h2>
      <div className="space-y-3 mb-6">
        {exercises.chair.map(ex => {
          const iconData = chairIcons[ex.id];
          const ExIcon = iconData?.Icon || Armchair;
          return (
            <Card key={ex.id} animate={false} padding="p-0" className="overflow-hidden">
              <button onClick={() => setExpandedEx(expandedEx === ex.id ? null : ex.id)} className="w-full text-left p-4 min-h-[48px]">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: iconData?.bg }}>
                      <ExIcon size={22} style={{ color: iconData?.color }} />
                    </div>
                    <div>
                      <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>{ex.name}</p>
                      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{ex.duration} — {ex.difficulty}&nbsp;</p>
                    </div>
                  </div>
                  {expandedEx === ex.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>
              {expandedEx === ex.id && (
                <div className="px-4 pb-4 border-t" style={{ borderColor: 'var(--color-surface-muted)' }}>
                  <p className="mt-3 mb-1" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{ex.desc}&nbsp;</p>
                  <div className="space-y-2">
                    {ex.instructions.map((step, i) => (
                      <p key={i} style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)' }}>
                        <span className="font-semibold" style={{ color: 'var(--color-teal)' }}>{i + 1}.</span>&nbsp;{step}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Walking Programs */}
      <h2 className="font-semibold mb-3" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>Walking Programs</h2>
      <div className="space-y-3 mb-6">
        {exercises.walking.map(wk => {
          const iconData = walkingIcons[wk.id];
          const WkIcon = iconData?.Icon || Footprints;
          return (
            <Card key={wk.id} animate={false} padding="p-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: iconData?.bg }}>
                  <WkIcon size={22} style={{ color: iconData?.color }} />
                </div>
                <div>
                  <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>{wk.name}</p>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)' }}>{wk.desc}&nbsp;</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Stretching */}
      <h2 className="font-semibold mb-3" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>Stretching Routines</h2>
      <div className="space-y-3">
        {exercises.stretching.map(st => {
          const iconData = stretchIcons[st.id];
          const StIcon = iconData?.Icon || PersonStanding;
          return (
            <Card key={st.id} animate={false} padding="p-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: iconData?.bg }}>
                  <StIcon size={22} style={{ color: iconData?.color }} />
                </div>
                <div>
                  <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>{st.name}</p>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{st.duration} — {st.desc}&nbsp;</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <ReturnCapsules sectionName="Explore" sectionPath="/explore" />
    </PageShell>
  );
}
