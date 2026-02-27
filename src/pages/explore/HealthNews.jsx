import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../../components/ui/PageShell';
import Card from '../../components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, TrendingUp, Shield, Brain, Activity, Phone, Heart, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { healthNews } from '../../data/mockData';
import ReturnCapsules from '../../components/ui/ReturnCapsules';

const iconMap = {
  trending: { Icon: TrendingUp, color: '#0D7C7C', bg: '#E8F5F3' },
  shield: { Icon: Shield, color: '#5C6BC0', bg: '#E8EAF6' },
  brain: { Icon: Brain, color: '#9B4DCA', bg: '#F3EBF8' },
  activity: { Icon: Activity, color: '#E5A100', bg: '#FFF8E1' },
  phone: { Icon: Phone, color: '#0097A7', bg: '#E0F7FA' },
  heart: { Icon: Heart, color: '#D94F4F', bg: '#FDE8E8' },
};

export default function HealthNews() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);

  return (
    <PageShell title="Health News" subtitle="Good news and breakthroughs in senior healthcare.">
      <button
        onClick={() => navigate('/explore')}
        className="flex items-center gap-2 mb-4 min-h-[48px]"
        style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-teal)', fontWeight: 600 }}
      >
        <ArrowLeft size={20} /> Back to Explore
      </button>

      {/* Featured banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-5 mb-5"
        style={{
          background: 'linear-gradient(135deg, var(--color-teal), var(--color-teal-light, #2EC4B6))',
          boxShadow: '0 4px 12px rgba(13, 124, 124, 0.2)',
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={18} style={{ color: 'rgba(255,255,255,0.9)' }} />
          <span className="font-semibold" style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.9)' }}>
            Positive Health Headlines
          </span>
        </div>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
          Curated news about advances in senior healthcare, Medicare improvements, and wellness&nbsp;breakthroughs.
        </p>
      </motion.div>

      {/* News cards */}
      <div className="space-y-3">
        {healthNews.map((item, i) => {
          const iconInfo = iconMap[item.icon] || iconMap.trending;
          const IconComponent = iconInfo.Icon;
          const isExpanded = expandedId === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Card
                animate={false}
                padding="p-0"
                className="overflow-hidden"
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: iconInfo.bg }}
                    >
                      <IconComponent size={20} style={{ color: iconInfo.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)', lineHeight: 1.4 }}>
                        {item.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                          {item.source}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                          {new Date(item.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-teal)' }}>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        <span>{isExpanded ? 'Show less' : 'Read summary'}</span>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--color-surface-muted)' }}>
                          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', lineHeight: 1.7 }}>
                            {item.excerpt}&nbsp;
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <ReturnCapsules sectionName="Explore" sectionPath="/explore" />
    </PageShell>
  );
}
