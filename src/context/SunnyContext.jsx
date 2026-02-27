import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const SunnyContext = createContext();

export function SunnyProvider({ children }) {
  const [mood, setMood] = useState('idle'); // idle, browsing-up, browsing-down, blinking, celebrating, bigCelebrating, thinking, sleeping
  const moodTimerRef = useRef(null);

  // Set mood temporarily, then return to idle
  const setTemporaryMood = useCallback((newMood, durationMs) => {
    if (moodTimerRef.current) clearTimeout(moodTimerRef.current);
    setMood(newMood);
    if (durationMs) {
      moodTimerRef.current = setTimeout(() => setMood('idle'), durationMs);
    }
  }, []);

  // Celebration triggers — callable from anywhere in the app
  const triggerCelebration = useCallback((type = 'small') => {
    if (moodTimerRef.current) clearTimeout(moodTimerRef.current);
    if (type === 'big') {
      setMood('bigCelebrating');
      moodTimerRef.current = setTimeout(() => setMood('idle'), 3000);
    } else {
      setMood('celebrating');
      moodTimerRef.current = setTimeout(() => setMood('idle'), 2000);
    }
  }, []);

  // Blink on page transition
  const triggerBlink = useCallback(() => {
    if (mood === 'celebrating' || mood === 'bigCelebrating') return; // don't interrupt celebrations
    setMood('blinking');
    if (moodTimerRef.current) clearTimeout(moodTimerRef.current);
    moodTimerRef.current = setTimeout(() => setMood('idle'), 400);
  }, [mood]);

  // Scroll browsing
  const setScrollDirection = useCallback((direction) => {
    if (mood === 'celebrating' || mood === 'bigCelebrating' || mood === 'blinking') return;
    setMood(direction === 'down' ? 'browsing-up' : 'browsing-down'); // eyes look opposite to scroll
  }, [mood]);

  const returnToIdle = useCallback(() => {
    if (mood === 'celebrating' || mood === 'bigCelebrating' || mood === 'blinking') return;
    setMood('idle');
  }, [mood]);

  // Sleep/wake for settings toggle
  const triggerSleep = useCallback(() => {
    setMood('sleeping');
  }, []);

  const triggerWake = useCallback(() => {
    setMood('celebrating');
    if (moodTimerRef.current) clearTimeout(moodTimerRef.current);
    moodTimerRef.current = setTimeout(() => setMood('idle'), 2000);
  }, []);

  return (
    <SunnyContext.Provider value={{
      mood,
      setMood,
      setTemporaryMood,
      triggerCelebration,
      triggerBlink,
      setScrollDirection,
      returnToIdle,
      triggerSleep,
      triggerWake,
    }}>
      {children}
    </SunnyContext.Provider>
  );
}

export function useSunny() {
  const ctx = useContext(SunnyContext);
  if (!ctx) throw new Error('useSunny must be used within SunnyProvider');
  return ctx;
}
