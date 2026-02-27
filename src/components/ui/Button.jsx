import React from 'react';
import { motion } from 'framer-motion';

export default function Button({ children, onClick, variant = 'primary', size = 'default', fullWidth = false, disabled = false, className = '', ...props }) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-2xl transition-colors duration-150 cursor-pointer';
  const sizes = {
    default: 'min-h-[48px] px-6 py-3',
    large: 'min-h-[56px] px-8 py-4',
    small: 'min-h-[48px] px-4 py-2',
  };
  const variants = {
    primary: { bg: 'var(--color-teal)', color: '#fff', border: 'none' },
    secondary: { bg: 'transparent', color: 'var(--color-teal)', border: '2px solid var(--color-teal)' },
    danger: { bg: 'var(--color-danger)', color: '#fff', border: 'none' },
    ghost: { bg: 'transparent', color: 'var(--color-text)', border: 'none' },
    soft: { bg: 'var(--color-teal-pale)', color: 'var(--color-teal)', border: 'none' },
  };
  const v = variants[variant] || variants.primary;

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size] || sizes.default} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      style={{ backgroundColor: v.bg, color: v.color, border: v.border, fontSize: 'var(--font-size-base)' }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
