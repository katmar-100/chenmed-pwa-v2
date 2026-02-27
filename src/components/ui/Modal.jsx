import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(45,43,85,0.4)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="relative w-full max-w-lg mx-2 rounded-t-3xl sm:rounded-3xl p-6 max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: 'var(--color-card)', boxShadow: '0 -4px 30px rgba(45,43,85,0.15)' }}
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold pr-4" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>
                {title}
              </h2>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-12 h-12 rounded-full min-h-[48px] min-w-[48px]"
                style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text)' }}
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
