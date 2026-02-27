import React from 'react';
import { motion } from 'framer-motion';

export default function Toggle({ checked, onChange, label, description, icon }) {
  return (
    <div className="flex items-center justify-between gap-4 min-h-[48px]">
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <div className="flex-1">
        {label && <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>{label}</p>}
        {description && <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className="relative flex-shrink-0 rounded-full p-1 min-h-[48px] min-w-[48px] flex items-center"
        style={{
          backgroundColor: checked ? 'var(--color-teal)' : 'var(--color-surface-muted)',
          width: '60px', height: '34px',
        }}
        role="switch"
        aria-checked={checked}
        aria-label={label}
      >
        <motion.span
          className="block rounded-full bg-white shadow-md"
          style={{ width: '26px', height: '26px' }}
          animate={{ x: checked ? 26 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
}
