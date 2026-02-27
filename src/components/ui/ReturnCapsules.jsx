import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export default function ReturnCapsules({ sectionName, sectionPath, compact = false }) {
  const navigate = useNavigate();
  const showSection = sectionPath && sectionPath !== '/';

  return (
    <div className={`flex items-center justify-center gap-2.5 ${compact ? 'mt-3 mb-1' : 'mt-8 mb-4 pb-20'}`}>
      {showSection && (
        <button
          onClick={() => navigate(sectionPath)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full min-h-[40px]"
          style={{
            fontSize: 'var(--font-size-xs)',
            fontWeight: 600,
            backgroundColor: 'var(--color-surface-muted)',
            color: 'var(--color-text)',
            border: 'none',
          }}
        >
          <ArrowLeft size={14} />
          Return to {sectionName}
        </button>
      )}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-full min-h-[40px]"
        style={{
          fontSize: 'var(--font-size-xs)',
          fontWeight: 600,
          backgroundColor: 'var(--color-surface-muted)',
          color: 'var(--color-text)',
          border: 'none',
        }}
      >
        <Home size={14} />
        Return to Home
      </button>
    </div>
  );
}
