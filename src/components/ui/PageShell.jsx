import React from 'react';
import { motion } from 'framer-motion';

export default function PageShell({ title, subtitle, children, noPadTop = false }) {
  return (
    <motion.main
      className={`page-content px-4 pb-6 max-w-lg mx-auto ${noPadTop ? '' : 'pt-5'}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {title && (
        <header className="mb-5">
          <h1 className="font-semibold" style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text-heading)' }}>
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-muted)' }}>
              {subtitle}
            </p>
          )}
        </header>
      )}
      {children}
    </motion.main>
  );
}
