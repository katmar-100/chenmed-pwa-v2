import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Lightbulb, TrendingUp, Play } from 'lucide-react';

const slides = [
  {
    id: 'context',
    label: 'Context',
    icon: null,
    heading: `I built\u00A0something.`,
    body: `Before I show you, let me set the\u00A0stage.\n\nThere\u2019s a massive growth opportunity sitting at the intersection of marketing, patient experience, and retention\u00A0\u2014 and no one\u2019s going after\u00A0it.`,
    accent: 'var(--color-navy)',
  },
  {
    id: 'problem',
    label: 'Problem',
    icon: Lightbulb,
    heading: 'Seniors are\u00A0underserved.',
    bullets: [
      `ChenMed\u2019s patients are seniors\u00A0\u2014 65 years old and\u00A0older.`,
      `Today, they manage their health through paper handouts, phone calls, and family members. It\u2019s\u00A0fragmented.`,
      `Every major health system is going digital\u00A0\u2014 but they\u2019re all building for younger, tech-savvy\u00A0users.`,
      `No one is building something truly designed for seniors. Something simple, beautiful, and actually enjoyable to\u00A0use.`,
    ],
    footer: `That\u2019s the\u00A0gap.`,
    accent: '#E0598B',
  },
  {
    id: 'opportunity',
    label: 'Opportunity',
    icon: TrendingUp,
    heading: 'What if seniors loved their health\u00A0app?',
    intro: `Picture an app seniors actually want to open\u00A0\u2014 one that helps them take their meds, understand their vitals, and feel connected to their care team. Three things\u00A0happen:`,
    numbered: [
      {
        title: 'Patients\u00A0stay.',
        detail: 'Engaged patients don\u2019t switch doctors. Retention goes\u00A0up.',
      },
      {
        title: 'Outcomes\u00A0improve.',
        detail: 'Medication adherence is one of the biggest levers in senior care. Even a 10% improvement is\u00A0massive.',
      },
      {
        title: 'Patients become\u00A0promoters.',
        detail: `\u201CYou have to see this app my doctor gave\u00A0me.\u201D That\u2019s word-of-mouth growth. That\u2019s brand\u00A0love.`,
      },
    ],
    accent: 'var(--color-purple)',
  },
  {
    id: 'demo',
    label: 'Demo',
    icon: Play,
    heading: 'See it in\u00A0action.',
    body: 'I built a working prototype to show what this could look and feel\u00A0like. Take a\u00A0look.',
    cta: true,
    accent: 'var(--color-teal)',
  },
];

export default function IntroSlides({ onComplete }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const contentRef = useRef(null);
  const slide = slides[current];

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  }, [current]);
  const isLast = current === slides.length - 1;
  const isFirst = current === 0;

  const goNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setDirection(1);
      setCurrent(c => c + 1);
    }
  };

  const goPrev = () => {
    if (!isFirst) {
      setDirection(-1);
      setCurrent(c => c - 1);
    }
  };

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 pt-8 pb-2 px-6">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all"
            style={{
              backgroundColor: i === current ? slide.accent : 'var(--color-surface-muted)',
              color: i === current ? 'white' : 'var(--color-text-muted)',
              fontSize: '13px',
              fontWeight: i === current ? 600 : 400,
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Slide content */}
      <div ref={contentRef} className="flex-1 flex flex-col px-6 py-6 overflow-y-auto">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex-1 flex flex-col"
          >
            {/* Icon */}
            {slide.icon && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', damping: 12 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: slide.accent + '18' }}
              >
                <slide.icon size={28} style={{ color: slide.accent }} />
              </motion.div>
            )}

            {/* Heading */}
            <h1
              className="font-bold leading-tight mb-4"
              style={{
                fontSize: 'var(--font-size-2xl)',
                color: 'var(--color-text-heading)',
              }}
            >
              {slide.heading}
            </h1>

            {/* Body text */}
            {slide.body && (
              <div style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text)', lineHeight: '1.7' }}>
                {slide.body.split('\n\n').map((para, i) => (
                  <p key={i} className={i > 0 ? 'mt-4' : ''}>
                    {para}
                  </p>
                ))}
              </div>
            )}

            {/* Bullet points */}
            {slide.bullets && (
              <div className="space-y-4">
                {slide.bullets.map((bullet, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.1 }}
                    className="flex gap-3"
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-2.5"
                      style={{ backgroundColor: slide.accent }}
                    />
                    <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text)', lineHeight: '1.6' }}>
                      {bullet}
                    </p>
                  </motion.div>
                ))}
                {slide.footer && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="font-semibold mt-6"
                    style={{ fontSize: 'var(--font-size-lg)', color: slide.accent }}
                  >
                    {slide.footer}
                  </motion.p>
                )}
              </div>
            )}

            {/* Numbered list */}
            {slide.intro && (
              <div>
                <p className="mb-5" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text)', lineHeight: '1.6' }}>
                  {slide.intro}
                </p>
                <div className="space-y-4">
                  {slide.numbered.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.15 }}
                      className="rounded-2xl p-4"
                      style={{ backgroundColor: 'var(--color-card)', boxShadow: '0 2px 8px var(--color-shadow)' }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold"
                          style={{ backgroundColor: slide.accent + '18', color: slide.accent, fontSize: '15px' }}
                        >
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>
                            {item.title}
                          </p>
                          <p className="mt-1" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA on last slide */}
            {slide.cta && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex-1 flex items-end mt-8"
              >
                <button
                  onClick={onComplete}
                  className="w-full flex items-center justify-center gap-3 rounded-2xl shadow-lg min-h-[56px] font-semibold"
                  style={{
                    padding: '16px 24px',
                    background: 'linear-gradient(135deg, var(--color-teal), var(--color-teal-light))',
                    color: 'white',
                    fontSize: 'var(--font-size-base)',
                    border: 'none',
                  }}
                >
                  <Play size={20} fill="white" />
                  Let's go!
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation bar */}
      <div className="flex items-center justify-between px-6 pb-8 pt-2">
        <button
          onClick={goPrev}
          disabled={isFirst}
          className="flex items-center gap-1 min-h-[48px] px-4 rounded-xl font-semibold transition-opacity"
          style={{
            fontSize: 'var(--font-size-sm)',
            color: isFirst ? 'var(--color-surface-muted)' : 'var(--color-text-muted)',
          }}
        >
          <ChevronLeft size={18} /> Back
        </button>

        {/* Skip option */}
        <button
          onClick={onComplete}
          className="min-h-[48px] px-4"
          style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}
        >
          Skip intro
        </button>

        {!isLast && (
          <button
            onClick={goNext}
            className="flex items-center gap-1 min-h-[48px] px-5 py-2 rounded-xl font-semibold"
            style={{
              fontSize: 'var(--font-size-sm)',
              backgroundColor: slide.accent,
              color: 'white',
            }}
          >
            Next <ChevronRight size={18} />
          </button>
        )}
        {isLast && <div style={{ width: '88px' }} />}
      </div>
    </div>
  );
}
