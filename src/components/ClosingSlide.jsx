import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Heart, Users, Shield, ArrowLeft, Rocket, Zap, Target, ChevronRight, ChevronLeft, Mail, MessageCircle, RotateCcw } from 'lucide-react';

const metrics = [
  {
    value: '94%',
    label: 'Medication Adherence',
    detail: 'Up from 67% national average for\u00A0seniors',
    icon: Heart,
  },
  {
    value: '3.2x',
    label: 'Weekly App Opens',
    detail: 'Average patient opens the app 3.2x per\u00A0day',
    icon: TrendingUp,
  },
  {
    value: '0%',
    label: 'Appointment No-Shows',
    detail: 'Down from 12% prior to app launch',
    icon: Users,
  },
  {
    value: '91',
    label: 'Patient NPS Score',
    detail: '"I love this app my doctor gave me."',
    icon: Shield,
  },
];

const phases = [
  {
    phase: 'Phase 1',
    timeline: 'Next 30 Days',
    icon: Target,
    items: [
      'Refine the prototype based on leadership feedback',
      'Run usability tests with 5–10 actual patients',
      'Build the business case with projected impact',
    ],
  },
  {
    phase: 'Phase 2',
    timeline: '60–90 Days',
    icon: Zap,
    items: [
      'With one developer partner, build the real version',
      'Connected to our systems, HIPAA-compliant',
      'Ready for a small pilot at one center',
    ],
  },
  {
    phase: 'Phase 3',
    timeline: '6 Months',
    icon: Rocket,
    items: [
      'Roll out across ChenMed',
      'Measure real-world impact',
      'Iterate based on patient data',
    ],
  },
];

// Slide transition variants
const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? '-100%' : '100%', opacity: 0 }),
};

// ===== PAGE 1: Metrics =====
function Page1() {
  return (
    <div className="flex-1 flex flex-col justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-center mb-8"
      >
        <p className="font-bold mb-2" style={{
          fontSize: 'clamp(22px, 6vw, 32px)',
          color: 'white',
          lineHeight: 1.2,
          letterSpacing: '0.02em',
        }}>
          What if every ChenMed patient had this in their&nbsp;pocket?
        </p>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
          Projected impact based on industry&nbsp;benchmarks
        </p>
      </motion.div>

      <div className="space-y-3">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.2, duration: 0.8 }}
              className="rounded-2xl p-4"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
            >
              <div style={{ textAlign: 'center' }}>
                <div className="font-bold" style={{ fontSize: 'clamp(28px, 8vw, 36px)', color: 'white', lineHeight: 1, marginBottom: '6px' }}>{m.value}</div>
                <div className="font-semibold" style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.9)', marginBottom: '3px' }}>{m.label}</div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.55)' }}>{m.detail}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ===== PAGE 2: $12M Quote =====
function Page2() {
  return (
    <div className="flex-1 flex flex-col justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1.2 }}
        className="text-center"
      >
        <div className="mx-auto mb-8" style={{ width: '60px', height: '60px' }}>
          <div className="w-full h-full rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
            <TrendingUp size={28} style={{ color: 'white' }} />
          </div>
        </div>

        <p className="italic mb-4" style={{
          fontSize: 'clamp(18px, 5vw, 24px)',
          color: 'white',
          lineHeight: 1.5,
          fontWeight: 600,
        }}>
          "10% improvement in medication adherence alone could save ChenMed an estimated <span style={{ color: '#7DDFCA' }}>$12M annually</span> in reduced hospitalizations."
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="mx-auto my-6" style={{ width: '40px', height: '2px', backgroundColor: 'rgba(255,255,255,0.25)' }} />
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.5)' }}>
            Based on CMS data for Medicare Advantage populations
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ===== PAGE 3: The Proposal =====
function Page3() {
  return (
    <div className="flex-1 flex flex-col justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-center"
      >
        <p className="font-bold mb-6" style={{
          fontSize: 'clamp(24px, 7vw, 36px)',
          color: 'white',
          lineHeight: 1.2,
          letterSpacing: '0.02em',
        }}>
          The Proposal
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="rounded-2xl p-6 mb-6 text-center"
          style={{ backgroundColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}
        >
          <p style={{ fontSize: 'var(--font-size-base)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}>
            I built this in a weekend with AI tools and my design background. It's a working prototype — not production-ready, but it demonstrates the experience, the vision, and the&nbsp;feasibility.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="font-bold"
          style={{
            fontSize: 'clamp(20px, 5.5vw, 28px)',
            color: 'white',
            lineHeight: 1.3,
          }}
        >
          I want to own this&nbsp;project.
        </motion.p>
      </motion.div>
    </div>
  );
}

// ===== PAGE 4: Rollout Plan =====
function Page4() {
  return (
    <div className="flex-1 flex flex-col justify-center px-6">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="font-bold text-center mb-6"
        style={{
          fontSize: 'clamp(22px, 6vw, 30px)',
          color: 'white',
          lineHeight: 1.2,
          letterSpacing: '0.02em',
        }}
      >
        The Rollout
      </motion.p>

      <div className="space-y-3">
        {phases.map((phase, i) => {
          const Icon = phase.icon;
          return (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.3, duration: 0.8 }}
              className="rounded-2xl p-4"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                  <Icon size={18} style={{ color: 'white' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-bold" style={{ fontSize: 'var(--font-size-sm)', color: 'white' }}>{phase.phase}</span>
                    <span className="px-2 py-0.5 rounded-full" style={{
                      fontSize: '10px', fontWeight: 600,
                      backgroundColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)',
                      letterSpacing: '0.03em',
                    }}>
                      {phase.timeline}
                    </span>
                  </div>
                  {phase.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-1.5 mb-1">
                      <ChevronRight size={12} className="flex-shrink-0 mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }} />
                      <p style={{ fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ===== PAGE 5: The Ask =====
function Page5() {
  return (
    <div className="flex-1 flex flex-col justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <div
          className="rounded-2xl p-6 mb-6 text-center"
          style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <p style={{ fontSize: 'var(--font-size-base)', color: 'rgba(255,255,255,0.9)', lineHeight: 1.8 }}>
            I'm not asking for a huge team or a massive budget to start. I'm asking for the green light to take this from prototype to&nbsp;pilot.
          </p>
          <p className="mt-4" style={{ fontSize: 'var(--font-size-base)', color: 'rgba(255,255,255,0.9)', lineHeight: 1.8 }}>
            I've already proven I can move fast and think about this holistically — from the UX to the health outcomes to the marketing&nbsp;angle.
          </p>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="text-center font-bold"
          style={{
            fontSize: 'clamp(18px, 5vw, 24px)',
            color: 'white',
            lineHeight: 1.4,
          }}
        >
          This isn't just a tech project — it's a <span style={{ color: '#7DDFCA' }}>patient experience</span> project, and that's where my strengths&nbsp;are.
        </motion.p>
      </motion.div>
    </div>
  );
}

// ===== PAGE 6: Contact =====
function Page6() {
  return (
    <div className="flex-1 flex flex-col justify-center px-6" style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-center"
        style={{ overflow: 'hidden' }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
            <MessageCircle size={30} style={{ color: 'white' }} />
          </div>
          <p className="font-bold mb-2" style={{
            fontSize: 'clamp(24px, 7vw, 36px)',
            color: 'white',
            lineHeight: 1.2,
          }}>
            Questions? Ideas?
          </p>
          <p className="font-bold" style={{
            fontSize: 'clamp(24px, 7vw, 36px)',
            color: '#7DDFCA',
            lineHeight: 1.2,
          }}>
            Let's talk.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="rounded-2xl p-5"
          style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', overflow: 'hidden' }}
        >
          <img
            src="/chenmed-bug-white.png"
            alt="ChenMed"
            className="mx-auto mb-4"
            style={{ width: '32px', height: 'auto', opacity: 0.6 }}
          />
          <p className="font-bold mb-1" style={{ fontSize: 'var(--font-size-lg)', color: 'white' }}>
            Katherine Atmar
          </p>
          <p className="mb-4" style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.7)' }}>
            Creative Director
          </p>
          <a
            href="mailto:katherine.atmar@chenmed.com"
            className="flex items-center justify-center gap-2 py-3 rounded-full font-semibold min-h-[48px]"
            style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              color: 'white',
              fontSize: 'clamp(11px, 3vw, 14px)',
              textDecoration: 'none',
              width: '100%',
              boxSizing: 'border-box',
              overflow: 'hidden',
            }}
          >
            <Mail size={16} className="flex-shrink-0" /> katherine.atmar@chenmed.com
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-8"
        >
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = '/';
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold min-h-[48px]"
            style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              color: 'white',
              fontSize: 'var(--font-size-sm)',
              border: '1px solid rgba(255,255,255,0.25)',
            }}
          >
            <RotateCcw size={16} /> Restart Demo
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ===== MAIN COMPONENT =====
const pages = [Page1, Page2, Page3, Page4, Page5, Page6];

export default function ClosingSlide({ onBack }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (newPage) => {
    if (newPage < 0 || newPage >= pages.length || newPage === currentPage) return;
    setDirection(newPage > currentPage ? 1 : -1);
    setCurrentPage(newPage);
  };

  const handleSwipe = (e, info) => {
    const swipe = info.offset.x;
    const velocity = info.velocity.x;
    if (swipe < -50 || velocity < -500) {
      goTo(currentPage + 1);
    } else if (swipe > 50 || velocity > 500) {
      goTo(currentPage - 1);
    }
  };

  const CurrentPage = pages[currentPage];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated gradient background */}
      <style>{`
        @keyframes closingGradient {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
      `}</style>
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #2D2B55, #0D7C7C, #9B4DCA, #0D7C7C, #2D2B55)',
          backgroundSize: '400% 400%',
          animation: 'closingGradient 16s ease-in-out infinite',
        }}
      />

      {/* Top bar: back button only */}
      <div className="relative z-10 flex items-center px-4 pt-8 pb-2">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onBack}
          className="flex items-center gap-1.5 min-h-[48px] px-2"
          style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'var(--font-size-sm)' }}
        >
          <ArrowLeft size={16} /> Back
        </motion.button>
      </div>

      {/* Page content with swipe */}
      <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleSwipe}
            className="flex-1 flex flex-col"
          >
            <CurrentPage />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom nav arrows */}
      <div className="relative z-10 flex items-center justify-center gap-4 pb-10 pt-4">
        <button
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage === 0}
          className="w-12 h-12 min-h-[48px] rounded-full flex items-center justify-center"
          style={{
            backgroundColor: currentPage === 0 ? 'transparent' : 'rgba(255,255,255,0.1)',
            color: currentPage === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)',
          }}
        >
          <ChevronLeft size={24} />
        </button>
        <span style={{ fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.5)' }}>
          {currentPage + 1} / {pages.length}
        </span>
        <button
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage === pages.length - 1}
          className="w-12 h-12 min-h-[48px] rounded-full flex items-center justify-center"
          style={{
            backgroundColor: currentPage === pages.length - 1 ? 'transparent' : 'rgba(255,255,255,0.1)',
            color: currentPage === pages.length - 1 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)',
          }}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
