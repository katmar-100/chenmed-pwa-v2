import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Card({ children, to, onClick, className = '', padding = 'p-5', animate = true, delay = 0, ...props }) {
  const navigate = useNavigate();
  const isInteractive = to || onClick;

  const handleClick = () => {
    if (to) navigate(to);
    else if (onClick) onClick();
  };

  const Wrapper = animate ? motion.div : 'div';
  const animProps = animate ? {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay, ease: 'easeOut' },
    whileTap: isInteractive ? { scale: 0.97 } : undefined,
  } : {};

  return (
    <Wrapper
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={isInteractive ? handleClick : undefined}
      onKeyDown={isInteractive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } } : undefined}
      className={`rounded-2xl ${padding} ${isInteractive ? 'cursor-pointer' : ''} ${className}`}
      style={{
        backgroundColor: 'var(--color-card)',
        boxShadow: '0 1px 3px var(--color-shadow), 0 1px 2px var(--color-shadow)',
      }}
      {...animProps}
      {...props}
    >
      {children}
    </Wrapper>
  );
}
