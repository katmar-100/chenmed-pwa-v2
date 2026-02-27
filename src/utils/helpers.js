export function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export function formatDate(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

export function formatDateShort(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatDateMedium(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export function todayString() {
  return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

export function todayISO() {
  return new Date().toISOString().split('T')[0];
}

export function daysUntil(dateStr) {
  const today = new Date(); today.setHours(0,0,0,0);
  const target = new Date(dateStr + 'T00:00:00');
  return Math.round((target - today) / (1000*60*60*24));
}

export function dayLabel(dateStr) {
  const d = daysUntil(dateStr);
  if (d === 0) return 'Today';
  if (d === 1) return 'Tomorrow';
  if (d > 1 && d <= 7) return `In ${d} days`;
  return null;
}

export function getBPStatus(systolic) {
  if (systolic < 120) return { label: 'Looking good!', color: 'var(--color-success)', level: 'good' };
  if (systolic < 130) return { label: 'Pretty good — keep it up!', color: 'var(--color-teal)', level: 'ok' };
  if (systolic < 140) return { label: 'Keep an eye on this', color: 'var(--color-warning)', level: 'caution' };
  return { label: "Let's talk to your doctor", color: 'var(--color-danger)', level: 'concern' };
}

export function getCholesterolStatus(total) {
  if (total < 200) return { label: 'Desirable — great job!', color: 'var(--color-success)', level: 'good' };
  if (total < 240) return { label: 'Borderline high', color: 'var(--color-warning)', level: 'caution' };
  return { label: 'High — talk to your doctor', color: 'var(--color-danger)', level: 'concern' };
}

export function getGlucoseStatus(value) {
  if (value < 100) return { label: 'Looking good!', color: 'var(--color-success)', level: 'good' };
  if (value <= 130) return { label: 'In a good range!', color: 'var(--color-teal)', level: 'ok' };
  if (value <= 160) return { label: 'A little above target', color: 'var(--color-warning)', level: 'caution' };
  return { label: "Let's check with your doctor", color: 'var(--color-danger)', level: 'concern' };
}
