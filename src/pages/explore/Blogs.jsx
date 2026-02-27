import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../../components/ui/PageShell';
import Card from '../../components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Shield, Heart, Apple, Activity, Users, Star, Clock, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import ReturnCapsules from '../../components/ui/ReturnCapsules';
import { blogArticles } from '../../data/mockData';

const iconMap = {
  shield: { Icon: Shield, color: '#0D7C7C', bg: '#E8F5F3' },
  heart: { Icon: Heart, color: '#D94F4F', bg: '#FDE8E8' },
  apple: { Icon: Apple, color: '#43A047', bg: '#E8F5E9' },
  activity: { Icon: Activity, color: '#E5A100', bg: '#FFF8E1' },
  users: { Icon: Users, color: '#5C6BC0', bg: '#E8EAF6' },
  star: { Icon: Star, color: '#F5B731', bg: '#FFF8E1' },
};

const categories = ['All', 'Wellness', 'Patient Stories', 'Preventive Care'];

const categoryColors = {
  'Wellness': { bg: '#E8F5F3', text: '#0D7C7C' },
  'Patient Stories': { bg: '#F3EBF8', text: '#9B4DCA' },
  'Preventive Care': { bg: '#E8EAF6', text: '#5C6BC0' },
};

export default function Blogs() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const filtered = activeCategory === 'All'
    ? blogArticles
    : blogArticles.filter(a => a.category === activeCategory);

  return (
    <PageShell title="Blogs & Articles" subtitle="Stories, tips, and insights from the ChenMed&nbsp;community.">
      <button
        onClick={() => navigate('/explore')}
        className="flex items-center gap-2 mb-4 min-h-[48px]"
        style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-teal)', fontWeight: 600 }}
      >
        <ArrowLeft size={20} /> Back to Explore
      </button>

      {/* Category filters */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-4 py-2 rounded-full font-semibold whitespace-nowrap min-h-[40px]"
            style={{
              fontSize: 'var(--font-size-xs)',
              backgroundColor: activeCategory === cat ? 'var(--color-teal)' : 'var(--color-card)',
              color: activeCategory === cat ? 'white' : 'var(--color-text)',
              boxShadow: activeCategory === cat ? 'none' : '0 1px 3px var(--color-shadow)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles */}
      <div className="space-y-3">
        {filtered.map((article, i) => {
          const iconInfo = iconMap[article.icon] || iconMap.shield;
          const IconComponent = iconInfo.Icon;
          const isExpanded = expandedId === article.id;
          const catColor = categoryColors[article.category] || { bg: '#E8F5F3', text: '#0D7C7C' };

          return (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                animate={false}
                padding="p-0"
                className="overflow-hidden"
                onClick={() => setExpandedId(isExpanded ? null : article.id)}
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
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="px-2 py-0.5 rounded-full font-semibold"
                          style={{ fontSize: '11px', backgroundColor: catColor.bg, color: catColor.text }}
                        >
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1" style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                          <Clock size={10} /> {article.readTime}
                        </span>
                      </div>
                      <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)', lineHeight: 1.4 }}>
                        {article.title}
                      </p>
                      <div className="flex items-center gap-1 mt-1" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-teal)' }}>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        <span>{isExpanded ? 'Read less' : 'Read\u00A0more'}</span>
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
                            {article.excerpt}&nbsp;
                          </p>
                          <p className="mt-2" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                            Published {new Date(article.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
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

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 rounded-2xl p-5 text-center"
        style={{ backgroundColor: 'var(--color-teal-pale)' }}
      >
        <BookOpen size={24} className="mx-auto mb-2" style={{ color: 'var(--color-teal)' }} />
        <p className="font-semibold mb-1" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-teal)' }}>
          More articles coming soon!
        </p>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
          We're always adding new stories and tips from the ChenMed&nbsp;community.
        </p>
      </motion.div>

      <ReturnCapsules sectionName="Explore" sectionPath="/explore" />
    </PageShell>
  );
}
