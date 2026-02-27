import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Calendar, Pill, HeartPulse, Compass } from 'lucide-react';

const items = [
  { path: '/', label: 'Home', Icon: Home },
  { path: '/appointments', label: 'Appointments', Icon: Calendar },
  { path: '/medications', label: 'Medications', Icon: Pill },
  { path: '/vitals', label: 'Vitals', Icon: HeartPulse },
  { path: '/explore', label: 'Explore', Icon: Compass },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-stretch"
      style={{
        height: 'var(--nav-height)',
        backgroundColor: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid var(--color-surface-muted)',
        boxShadow: '0 -2px 10px var(--color-shadow)',
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      {items.map(({ path, label, Icon }) => {
        const active = isActive(path);
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="flex flex-col items-center justify-center flex-1 min-h-[48px] min-w-[48px] relative transition-colors"
            style={{ color: active ? 'var(--color-teal)' : 'var(--color-text-muted)' }}
            aria-current={active ? 'page' : undefined}
            aria-label={label}
          >
            {active && (
              <span
                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full"
                style={{ backgroundColor: 'var(--color-teal)' }}
              />
            )}
            <Icon size={24} strokeWidth={active ? 2.5 : 1.8} />
            <span className="text-xs font-semibold mt-0.5" style={{ fontSize: 'var(--font-size-xs)' }}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
