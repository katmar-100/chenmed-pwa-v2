import React from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ rating = 5, size = 16, onClick }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const fill = i <= Math.floor(rating) ? 1 : (i - 1 < rating ? 0.5 : 0);
    stars.push(
      <Star
        key={i}
        size={size}
        fill={fill > 0 ? 'var(--color-star)' : 'none'}
        stroke={fill > 0 ? 'var(--color-star)' : 'var(--color-surface-muted)'}
        strokeWidth={1.5}
      />
    );
  }

  const content = (
    <>
      {stars}
      <span className="ml-1 font-semibold" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
        {rating}
      </span>
    </>
  );

  if (onClick) {
    return (
      <button
        onClick={(e) => { e.stopPropagation(); e.preventDefault(); onClick(); }}
        className="flex items-center gap-0.5 rounded-lg px-1.5 py-0.5 -ml-1.5 transition-colors"
        style={{ background: 'none', border: 'none', cursor: 'pointer', minHeight: 'auto' }}
        aria-label={`${rating} stars — tap to see reviews`}
      >
        {content}
        <span className="ml-0.5" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-teal)' }}>
          reviews
        </span>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-0.5">
      {content}
    </div>
  );
}
