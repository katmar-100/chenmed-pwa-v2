import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { seedIfNeeded, resetAll, KEYS, get, set } from '../utils/seedData';
import { THEMES, FONT_SIZES } from '../styles/themes';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [loaded, setLoaded] = useState(false);
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [medications, setMedications] = useState([]);
  const [vitals, setVitals] = useState(null);
  const [settings, setSettings] = useState(null);
  const [habits, setHabits] = useState({});
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    seedIfNeeded();
    setPatient(get(KEYS.PATIENT));
    setAppointments(get(KEYS.APPOINTMENTS) || []);
    setMedications(get(KEYS.MEDICATIONS) || []);
    setVitals(get(KEYS.VITALS));
    setSettings(get(KEYS.SETTINGS) || { fontSizeMode: 'normal', theme: 'classic', showSunny: true, medicationReminders: true, appointmentReminders: true, communityDisplayName: 'real', shareVitals: false });
    setHabits(get(KEYS.HABITS) || {});
    setJoinedGroups(get(KEYS.JOINED_GROUPS) || []);
    setChatMessages(get(KEYS.CHAT_MESSAGES) || []);
    setBookedAppointments(get(KEYS.BOOKED) || []);
    setSavedRecipes(get(KEYS.SAVED_RECIPES) || []);
    setLoaded(true);
  }, []);

  // Apply theme + font classes
  useEffect(() => {
    if (!settings) return;
    const root = document.documentElement;
    // Remove all theme/font classes
    Object.values(THEMES).forEach(t => { if (t.class) root.classList.remove(t.class); });
    Object.values(FONT_SIZES).forEach(f => { if (f.class) root.classList.remove(f.class); });
    // Add current
    const themeClass = THEMES[settings.theme]?.class;
    const fontClass = FONT_SIZES[settings.fontSizeMode]?.class;
    if (themeClass) root.classList.add(themeClass);
    if (fontClass) root.classList.add(fontClass);
  }, [settings]);

  const updatePatient = useCallback((data) => { setPatient(data); set(KEYS.PATIENT, data); }, []);
  const updateSettings = useCallback((data) => { setSettings(data); set(KEYS.SETTINGS, data); }, []);

  const toggleMedTaken = useCallback((id) => {
    setMedications(prev => {
      const updated = prev.map(m => m.id === id ? { ...m, takenToday: !m.takenToday } : m);
      set(KEYS.MEDICATIONS, updated);
      return updated;
    });
  }, []);

  const updateHabits = useCallback((data) => { setHabits(data); set(KEYS.HABITS, data); }, []);

  const joinGroup = useCallback((id) => {
    setJoinedGroups(prev => {
      const updated = prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id];
      set(KEYS.JOINED_GROUPS, updated);
      return updated;
    });
  }, []);

  const addChatMessage = useCallback((msg) => {
    setChatMessages(prev => { const updated = [...prev, msg]; set(KEYS.CHAT_MESSAGES, updated); return updated; });
  }, []);

  const bookAppointment = useCallback((appt) => {
    setBookedAppointments(prev => { const updated = [...prev, appt]; set(KEYS.BOOKED, updated); return updated; });
  }, []);

  const cancelAppointment = useCallback((id) => {
    // Remove from whichever list it belongs to
    setAppointments(prev => { const updated = prev.filter(a => a.id !== id); set(KEYS.APPOINTMENTS, updated); return updated; });
    setBookedAppointments(prev => { const updated = prev.filter(a => a.id !== id); set(KEYS.BOOKED, updated); return updated; });
  }, []);

  const toggleSavedRecipe = useCallback((recipeId) => {
    setSavedRecipes(prev => {
      const updated = prev.includes(recipeId) ? prev.filter(id => id !== recipeId) : [...prev, recipeId];
      set(KEYS.SAVED_RECIPES, updated);
      return updated;
    });
  }, []);

  const rescheduleAppointment = useCallback((id, newDate, newTime) => {
    const updater = (prev, key) => {
      const updated = prev.map(a => a.id === id ? { ...a, date: newDate, time: newTime } : a);
      set(key, updated);
      return updated;
    };
    setAppointments(prev => updater(prev, KEYS.APPOINTMENTS));
    setBookedAppointments(prev => updater(prev, KEYS.BOOKED));
  }, []);

  const doReset = useCallback(() => {
    resetAll();
    setPatient(get(KEYS.PATIENT));
    setAppointments(get(KEYS.APPOINTMENTS) || []);
    setMedications(get(KEYS.MEDICATIONS) || []);
    setVitals(get(KEYS.VITALS));
    setSettings(get(KEYS.SETTINGS));
    setHabits(get(KEYS.HABITS) || {});
    setJoinedGroups([]);
    setChatMessages(get(KEYS.CHAT_MESSAGES) || []);
    setBookedAppointments([]);
    setSavedRecipes([]);
  }, []);

  if (!loaded) return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text)' }}>Loading...</p>
    </div>
  );

  return (
    <AppContext.Provider value={{
      patient, updatePatient,
      appointments, bookedAppointments, bookAppointment, cancelAppointment, rescheduleAppointment,
      medications, toggleMedTaken,
      vitals, settings, updateSettings,
      habits, updateHabits,
      joinedGroups, joinGroup,
      chatMessages, addChatMessage,
      savedRecipes, toggleSavedRecipe,
      resetData: doReset,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
