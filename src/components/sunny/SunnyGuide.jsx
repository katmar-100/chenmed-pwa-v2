import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import SunnyCharacter from './SunnyCharacter';
import { useApp } from '../../context/AppContext';
import { useSunny } from '../../context/SunnyContext';

const IDLE_TIMEOUT = 20000;
const BUBBLE_AUTO_DISMISS = 8000;
const SCROLL_THROTTLE = 200;
const SCROLL_IDLE_DELAY = 1000;

const contextHints = {
  '/': "Tap any card to see more\u00A0details!",
  '/appointments': "Scroll down to see all your upcoming visits, or tap the + button to book a new\u00A0one!",
  '/medications': "Tap the circle next to each medication when you've taken\u00A0it!",
  '/vitals': "Tap any vital category to learn what your numbers\u00A0mean!",
  '/explore': "Pick any topic that interests you — there's so much to discover!",
  '/explore/nutrition': "Browse healthy recipes you can try at\u00A0home!",
  '/explore/games': "Games are a great way to keep your mind\u00A0sharp!",
  '/explore/community': "Join a group to connect with\u00A0others!",
  '/explore/exercise': "Even a short walk makes a big\u00A0difference!",
  '/explore/longevity': "Small daily habits add up to big\u00A0results!",
  '/explore/ai-assistant': "Ask me anything about your\u00A0health!",
  '/settings': "You can customize the app to fit your\u00A0style!",
};

const celebrationMessages = [
  "Way to go! 🎉",
  "You're doing great! ⭐",
  "Awesome job! 🌟",
  "Keep it up! 💪",
  "That's the spirit! ✨",
  "Look at you go! 🙌",
  "Wonderful! Keep shining! ☀️",
  "Yes! Another one done! 🎯",
  "You're on a roll! 🔥",
  "Doing fantastic! 💫",
  "So proud of you! 🥳",
  "One step at a time! 👏",
  "You make it look easy! 😊",
  "Health hero in action! 💚",
  "Gold star for you! 🌟",
];

const bigCelebrationMessages = [
  "Amazing! You're a superstar! 🎉🌟",
  "What an achievement! So proud of you! 🏆",
  "You crushed it! Incredible! 🎊",
  "Standing ovation! You did it all! 👏🎉",
  "Wow — every single one! You're unstoppable! 🌟💪",
  "All done! You should feel SO proud right now! 🥳✨",
  "100%! That's what I'm talking about! 🔥🎯",
  "You're my hero today! What an accomplishment! 💚🏆",
  "Perfection! Every box checked! 🎊⭐",
  "Can you hear me cheering? Because I am! 🎉😄",
];

const tapGreetings = [
  "Hi there! Did you need my help? 😊",
  "Hey! I'm here if you need me! 💛",
  "Need a hand? I'm happy to help! 🌟",
  "What can I help you with? 😄",
  "Hello! Tap a button below or just say hi! 👋",
  "Hey friend! How can I help today? ☀️",
  "I was just thinking about you! 💛",
  "Always happy to see you! What's up? 😊",
];

// Pick a random message that's different from the last one shown
function pickRandom(arr, lastRef) {
  if (arr.length <= 1) return arr[0] || '';
  let msg;
  do {
    msg = arr[Math.floor(Math.random() * arr.length)];
  } while (msg === lastRef.current && arr.length > 1);
  lastRef.current = msg;
  return msg;
}

const quickActions = {
  '/': [
    { label: "Show me around", path: '/explore' },
    { label: "Edit my profile", action: 'profile' },
  ],
  '/appointments': [
    { label: "Book an appointment", path: '/book-appointment' },
    { label: "See my next visit", action: 'scroll-top' },
  ],
  '/medications': [
    { label: "What should I take now?", action: 'scroll-top' },
    { label: "Learn about a medication", action: 'scroll-top' },
  ],
  '/vitals': [
    { label: "What do my numbers mean?", action: 'scroll-top' },
    { label: "Tips to improve", action: 'scroll-top' },
  ],
  '/explore': [
    { label: "What's new?", path: '/explore/longevity' },
    { label: "Play a game", path: '/explore/games' },
  ],
};

// Animated Sunny for the intro — cycles through expressions
function AnimatedSunnyIntro({ size = 120 }) {
  const expressions = [
    { expr: 'waving', duration: 2200 },
    { expr: 'happy', duration: 1800 },
    { expr: 'blinking', duration: 300 },
    { expr: 'happy', duration: 1400 },
    { expr: 'browsing-up', duration: 1200 },
    { expr: 'celebrating', duration: 2000 },
    { expr: 'blinking', duration: 300 },
    { expr: 'thinking', duration: 1800 },
    { expr: 'browsing-down', duration: 1000 },
    { expr: 'happy', duration: 1600 },
    { expr: 'blinking', duration: 300 },
    { expr: 'waving', duration: 2000 },
    { expr: 'bigCelebrating', duration: 2200 },
    { expr: 'blinking', duration: 300 },
    { expr: 'happy', duration: 1200 },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex(prev => (prev + 1) % expressions.length);
    }, expressions[index].duration);
    return () => clearTimeout(timer);
  }, [index]);

  // Gentle floating motion that varies by expression
  const getIntroMotion = () => {
    const expr = expressions[index].expr;
    if (expr === 'celebrating' || expr === 'bigCelebrating') {
      return { y: [0, -10, 0], scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] };
    }
    if (expr === 'thinking') {
      return { y: [0, -3, 0], rotate: [0, 5, 0] };
    }
    if (expr === 'browsing-up') {
      return { y: [0, -6, 0] };
    }
    if (expr === 'browsing-down') {
      return { y: [0, 3, 0] };
    }
    return { y: [0, -5, 0] };
  };

  return (
    <motion.div
      key={expressions[index].expr + '-' + index}
      animate={getIntroMotion()}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <SunnyCharacter expression={expressions[index].expr} size={size} />
    </motion.div>
  );
}

function getQuickActions(pathname) {
  if (quickActions[pathname]) return quickActions[pathname];
  const parent = '/' + pathname.split('/')[1];
  if (quickActions[parent]) return quickActions[parent];
  return quickActions['/'];
}

// Mini confetti particles for big celebrations
function SunnyConfetti({ active }) {
  const colors = ['#0D7C7C', '#9B4DCA', '#F0D4E8', '#1A9E8F', '#C77DBA'];
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible" style={{ width: 52, height: 52 }}>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * 360;
        const rad = (angle * Math.PI) / 180;
        const dist = 30 + Math.random() * 15;
        const x = Math.cos(rad) * dist;
        const y = Math.sin(rad) * dist;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 5 + Math.random() * 3,
              height: 5 + Math.random() * 3,
              backgroundColor: colors[i % colors.length],
              left: '50%',
              top: '50%',
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x, y, opacity: 0, scale: 0.3 }}
            transition={{ duration: 1.2 + Math.random() * 0.5, ease: 'easeOut' }}
          />
        );
      })}
    </div>
  );
}

export default function SunnyGuide() {
  const { settings } = useApp();
  const { mood, triggerBlink, setScrollDirection, returnToIdle } = useSunny();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // UI States
  const [introVisible, setIntroVisible] = useState(false);
  const [introAnimatingOut, setIntroAnimatingOut] = useState(false);
  const [showCornerSunny, setShowCornerSunny] = useState(false);
  const [idleBubble, setIdleBubble] = useState(null);
  const [tapBubble, setTapBubble] = useState(null);
  const [celebrationBubble, setCelebrationBubble] = useState(null);
  const [sunnyTapped, setSunnyTapped] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Sleeping/waking state
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [wakeBubble, setWakeBubble] = useState(null);
  const prevShowSunnyRef = useRef(settings?.showSunny);

  const idleTimerRef = useRef(null);
  const bubbleDismissRef = useRef(null);
  const scrollIdleRef = useRef(null);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);
  const prevPathRef = useRef(pathname);
  const lastCelebrationRef = useRef(null);
  const lastBigCelebrationRef = useRef(null);
  const lastTapRef = useRef(null);

  // ---- FIRST-TIME INTRO ----
  useEffect(() => {
    if (!settings?.showSunny) return;
    const seen = localStorage.getItem('sunnyIntroSeen');
    if (seen) {
      setShowCornerSunny(true);
    } else {
      const t = setTimeout(() => setIntroVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, [settings?.showSunny]);

  const dismissIntro = useCallback(() => {
    setIntroAnimatingOut(true);
    localStorage.setItem('sunnyIntroSeen', 'true');
    setTimeout(() => {
      setIntroVisible(false);
      setIntroAnimatingOut(false);
      setShowCornerSunny(true);
    }, 600);
  }, []);

  // ---- SLEEP / WAKE on Settings toggle ----
  useEffect(() => {
    const prev = prevShowSunnyRef.current;
    const curr = settings?.showSunny;
    prevShowSunnyRef.current = curr;

    if (prev === true && curr === false) {
      // Turning off — sleep animation then hide
      setIsFadingOut(true);
      setTimeout(() => {
        setShowCornerSunny(false);
        setIsFadingOut(false);
      }, 800);
    } else if (prev === false && curr === true) {
      // Turning on — wake up
      const seen = localStorage.getItem('sunnyIntroSeen');
      if (seen) {
        setShowCornerSunny(true);
        setWakeBubble("I'm back! Missed you! 😊");
        setTimeout(() => setWakeBubble(null), 3000);
      }
    }
  }, [settings?.showSunny]);

  // ---- PAGE TRANSITION BLINK ----
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      if (showCornerSunny) {
        triggerBlink();
        setIdleBubble(null);
        setTapBubble(null);
        setCelebrationBubble(null);
      }
    }
  }, [pathname, showCornerSunny, triggerBlink]);

  // ---- CELEBRATION REACTIONS ----
  useEffect(() => {
    if (mood === 'celebrating') {
      const msg = pickRandom(celebrationMessages, lastCelebrationRef);
      setCelebrationBubble(msg);
      setIdleBubble(null);
      setTapBubble(null);
      const t = setTimeout(() => setCelebrationBubble(null), 2500);
      return () => clearTimeout(t);
    } else if (mood === 'bigCelebrating') {
      const msg = pickRandom(bigCelebrationMessages, lastBigCelebrationRef);
      setCelebrationBubble(msg);
      setIdleBubble(null);
      setTapBubble(null);
      setShowConfetti(true);
      const t1 = setTimeout(() => setCelebrationBubble(null), 3500);
      const t2 = setTimeout(() => setShowConfetti(false), 2000);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    } else {
      // Don't clear celebration bubble here — let the timers do it
    }
  }, [mood]);

  // ---- SCROLL DETECTION (throttled) ----
  useEffect(() => {
    if (!settings?.showSunny || !showCornerSunny) return;

    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime.current < SCROLL_THROTTLE) return;
      lastScrollTime.current = now;

      const currentY = window.scrollY;
      const direction = currentY > lastScrollY.current ? 'down' : 'up';
      lastScrollY.current = currentY;

      setScrollDirection(direction);

      // Reset to idle after scroll stops
      if (scrollIdleRef.current) clearTimeout(scrollIdleRef.current);
      scrollIdleRef.current = setTimeout(() => {
        returnToIdle();
      }, SCROLL_IDLE_DELAY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollIdleRef.current) clearTimeout(scrollIdleRef.current);
    };
  }, [settings?.showSunny, showCornerSunny, setScrollDirection, returnToIdle]);

  // ---- IDLE DETECTION ----
  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (idleBubble) setIdleBubble(null);
    idleTimerRef.current = setTimeout(() => {
      if (!tapBubble && !celebrationBubble) {
        const hint = contextHints[pathname] || contextHints['/'];
        setIdleBubble(hint);
      }
    }, IDLE_TIMEOUT);
  }, [pathname, tapBubble, celebrationBubble, idleBubble]);

  useEffect(() => {
    if (!settings?.showSunny || !showCornerSunny) return;
    const events = ['scroll', 'click', 'touchstart', 'touchmove', 'keydown', 'mousemove', 'pointerdown'];
    const handler = () => resetIdleTimer();
    events.forEach(evt => window.addEventListener(evt, handler, { passive: true }));
    resetIdleTimer();
    return () => {
      events.forEach(evt => window.removeEventListener(evt, handler));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [settings?.showSunny, showCornerSunny, resetIdleTimer]);

  useEffect(() => {
    if (showCornerSunny) resetIdleTimer();
  }, [pathname]);

  // Auto-dismiss idle bubble
  useEffect(() => {
    if (idleBubble) {
      bubbleDismissRef.current = setTimeout(() => setIdleBubble(null), BUBBLE_AUTO_DISMISS);
      return () => clearTimeout(bubbleDismissRef.current);
    }
  }, [idleBubble]);

  const dismissBubbles = useCallback(() => {
    setIdleBubble(null);
    setTapBubble(null);
    setCelebrationBubble(null);
  }, []);

  const handleSunnyTap = useCallback((e) => {
    e.stopPropagation();
    setSunnyTapped(true);
    setTimeout(() => setSunnyTapped(false), 400);
    if (tapBubble) {
      setTapBubble(null);
    } else {
      setIdleBubble(null);
      setCelebrationBubble(null);
      const greeting = pickRandom(tapGreetings, lastTapRef);
      setTapBubble(greeting);
    }
  }, [tapBubble]);

  const handleQuickAction = useCallback((action) => {
    setTapBubble(null);
    if (action.path) navigate(action.path);
    else if (action.action === 'scroll-top') window.scrollTo({ top: 0, behavior: 'smooth' });
    else if (action.action === 'profile') navigate('/');
  }, [navigate]);

  // Don't render if sunny is off (and not fading out)
  if (!settings?.showSunny && !isFadingOut) return null;

  // Determine expression based on mood and UI state
  const getExpression = () => {
    if (isFadingOut) return 'sleeping';
    if (wakeBubble) return 'celebrating';
    if (mood === 'celebrating') return 'celebrating';
    if (mood === 'bigCelebrating') return 'bigCelebrating';
    if (mood === 'blinking') return 'blinking';
    if (mood === 'browsing-up') return 'browsing-up';
    if (mood === 'browsing-down') return 'browsing-down';
    if (mood === 'thinking') return 'thinking';
    if (mood === 'sleeping') return 'sleeping';
    if (tapBubble) return 'waving';
    if (idleBubble) return 'waving';
    return 'happy';
  };

  const activeBubbleText = celebrationBubble || wakeBubble || tapBubble || idleBubble;
  const isTapMode = !!tapBubble && !celebrationBubble && !wakeBubble;
  const actions = isTapMode ? getQuickActions(pathname) : [];
  const isCelebrationMood = mood === 'celebrating' || mood === 'bigCelebrating';

  // Movement animations based on mood
  const getMovementAnimation = () => {
    if (mood === 'bigCelebrating') {
      return { y: [0, -12, 0], rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] };
    }
    if (mood === 'celebrating') {
      return { y: [0, -8, 0], scale: [1, 1.1, 1] };
    }
    if (mood === 'blinking') {
      return { y: [0, -3, 0] };
    }
    // Default gentle bob
    return { y: [0, -4, 0] };
  };

  const getMovementTransition = () => {
    if (isCelebrationMood) {
      return { duration: 0.5, ease: 'easeOut' };
    }
    if (mood === 'blinking') {
      return { duration: 0.3, ease: 'easeInOut' };
    }
    return { duration: 3, repeat: Infinity, ease: 'easeInOut' };
  };

  return (
    <>
      {/* ========== FULL-SCREEN INTRO ========== */}
      <AnimatePresence>
        {introVisible && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: introAnimatingOut ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={dismissIntro}
            style={{ backgroundColor: 'rgba(0,0,0,0.72)' }}
          >
            {/* X button — outside animated content so it stays fixed */}
            <button
              onClick={dismissIntro}
              className="fixed top-6 right-6 z-[201] w-12 h-12 min-h-[48px] min-w-[48px] flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
              aria-label="Close Sunny intro"
            >
              <X size={24} color="white" />
            </button>
            <motion.div
              className="flex flex-col items-center gap-4 px-6"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.3, opacity: 0 }}
              animate={
                introAnimatingOut
                  ? { scale: 0.4, opacity: 0, x: 120, y: 300 }
                  : { scale: 1, opacity: 1, x: 0, y: 0 }
              }
              transition={
                introAnimatingOut
                  ? { duration: 0.5, ease: 'easeIn' }
                  : { type: 'spring', damping: 14, stiffness: 200, delay: 0.2 }
              }
            >
              {/* Radial glow behind Sunny */}
              <div className="relative">
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 240,
                    height: 240,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(13,124,124,0.12) 40%, transparent 70%)',
                    filter: 'blur(20px)',
                    pointerEvents: 'none',
                  }}
                />
                <div className="relative">
                  <AnimatedSunnyIntro size={120} />
                </div>
              </div>
              <motion.div
                className="rounded-3xl p-6 text-center max-w-[320px]"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#2D2B55',
                  fontSize: 'var(--font-size-base, 16px)',
                  lineHeight: '1.6',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: introAnimatingOut ? 0 : 1, y: introAnimatingOut ? 20 : 0 }}
                transition={{ delay: introAnimatingOut ? 0 : 0.4, duration: 0.3 }}
              >
                Hi! I'm <strong>Sunny</strong>, your friendly guide! I'll be right here in the corner if you ever need help. Tap me&nbsp;anytime&nbsp;🌟
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== CORNER SUNNY ========== */}
      <AnimatePresence>
        {(showCornerSunny || isFadingOut) && (
          <>
            {/* Backdrop to dismiss bubbles */}
            {activeBubbleText && !isFadingOut && (
              <motion.div
                className="fixed inset-0 z-[88]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={dismissBubbles}
              />
            )}

            {/* Speech bubble */}
            <AnimatePresence>
              {activeBubbleText && !isFadingOut && (
                <motion.div
                  className="fixed z-[91]"
                  style={{
                    bottom: 'calc(var(--nav-height) + 72px)',
                    right: '12px',
                    maxWidth: '280px',
                  }}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                >
                  <div
                    className="rounded-2xl p-4"
                    style={{
                      backgroundColor: 'var(--color-purple-pale, #F0ECFF)',
                      color: 'var(--color-text-heading, #2D2B55)',
                      fontSize: 'var(--font-size-sm, 14px)',
                      boxShadow: '0 4px 15px var(--color-shadow, rgba(0,0,0,0.1))',
                      lineHeight: '1.5',
                    }}
                  >
                    <div>{activeBubbleText}</div>
                    {isTapMode && actions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {actions.map((action, i) => (
                          <button
                            key={i}
                            onClick={() => handleQuickAction(action)}
                            className="px-3 py-1.5 rounded-full text-white font-medium"
                            style={{
                              backgroundColor: 'var(--color-teal, #0D7C7C)',
                              fontSize: 'var(--font-size-xs)',
                            }}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                    <div
                      className="absolute -bottom-2 right-6 w-0 h-0"
                      style={{
                        borderLeft: '8px solid transparent',
                        borderRight: '8px solid transparent',
                        borderTop: '10px solid var(--color-purple-pale, #F0ECFF)',
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sunny character in corner */}
            <motion.div
              className="fixed z-[90] cursor-pointer"
              style={{
                bottom: 'calc(var(--nav-height) + 16px)',
                right: '12px',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: sunnyTapped ? [1, 1.2, 1] : (isFadingOut ? 0.5 : 1),
                opacity: isFadingOut ? 0 : 1,
              }}
              transition={
                isFadingOut
                  ? { duration: 0.8, ease: 'easeIn' }
                  : sunnyTapped
                    ? { duration: 0.4, times: [0, 0.3, 1], ease: 'easeOut' }
                    : { type: 'spring', damping: 15, stiffness: 250 }
              }
              onClick={isFadingOut ? undefined : handleSunnyTap}
            >
              {/* Movement wrapper — bobbing, jumping, spinning */}
              <motion.div
                animate={getMovementAnimation()}
                transition={getMovementTransition()}
                key={mood} // re-trigger animation on mood change
              >
                <div className="relative">
                  <SunnyCharacter expression={getExpression()} size={52} />
                  {/* Mini confetti for big celebrations */}
                  <SunnyConfetti active={showConfetti} />
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
