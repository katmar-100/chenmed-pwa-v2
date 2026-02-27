import * as mock from '../data/mockData';

const KEYS = {
  PATIENT: 'cm2_patient',
  APPOINTMENTS: 'cm2_appointments',
  MEDICATIONS: 'cm2_medications',
  VITALS: 'cm2_vitals',
  SETTINGS: 'cm2_settings',
  HABITS: 'cm2_habits',
  JOINED_GROUPS: 'cm2_joined_groups',
  CHAT_MESSAGES: 'cm2_chat',
  BOOKED: 'cm2_booked',
  SAVED_RECIPES: 'cm2_saved_recipes',
  SEEDED: 'cm2_seeded',
};

export { KEYS };

export function get(key) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch { return null; }
}

export function set(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { console.warn('localStorage error:', e); }
}

const SEED_VERSION = 3; // bump this when mockData structure changes

export function seedIfNeeded() {
  const current = localStorage.getItem(KEYS.SEEDED);
  if (!current || parseInt(current, 10) < SEED_VERSION) seed();
}

export function seed() {
  set(KEYS.PATIENT, mock.patient);
  set(KEYS.APPOINTMENTS, mock.appointments);
  set(KEYS.MEDICATIONS, mock.medications);
  set(KEYS.VITALS, mock.vitals);
  set(KEYS.SETTINGS, mock.defaultSettings);
  set(KEYS.HABITS, { water: false, walk: false, veggies: false, sleep: false, meds: false, gratitude: false });
  set(KEYS.JOINED_GROUPS, []);
  set(KEYS.CHAT_MESSAGES, [{ role: 'ai', text: "Hi Margaret! I'm your MyChenMed assistant. I can help you understand your health, answer questions about your medications, or just chat. What's on your mind?" }]);
  set(KEYS.BOOKED, []);
  set(KEYS.SAVED_RECIPES, []);
  localStorage.setItem(KEYS.SEEDED, String(SEED_VERSION));
}

export function resetAll() {
  Object.values(KEYS).forEach(k => localStorage.removeItem(k));
  seed();
}
