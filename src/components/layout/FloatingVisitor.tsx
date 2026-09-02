import React, { useEffect, useState, useRef } from 'react';

export const FloatingVisitor: React.FC = () => {
  // Static demo values; replace with real metrics if available.
  const today = '1,482';
  const total = '482,910';
  const [visible, setVisible] = useState<boolean>(true);

  const ref = useRef<HTMLDivElement | null>(null);
  const [top, setTop] = useState<number | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('fv_hidden');
      if (saved === '1') setVisible(false);
    } catch (e) {
      // ignore
    }

    const update = () => {
      const header = document.getElementById('site-header');
      if (header) {
        const rect = header.getBoundingClientRect();
        const scrollTop = window.scrollY || window.pageYOffset;
        setTop(rect.height + scrollTop + 8);
      } else {
        setTop(88);
      }
    };

    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem('fv_hidden', '1');
    } catch (e) {
      // ignore
    }
  };

  if (!visible) return null;

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      style={top ? { top: `${top}px`, right: '1rem' } : undefined}
      className="hidden md:flex items-center gap-4 fixed bg-white/95 text-slate-800 border border-slate-200 rounded-lg shadow-lg px-4 py-2 z-50 pointer-events-auto"
    >
      <div className="text-xs text-slate-500">Visitor Analytics</div>
      <div className="text-sm font-bold font-mono">Today: <span className="text-gov-green">{today}</span></div>
      <div className="text-sm font-bold font-mono">Total: <span className="text-gov-gold">{total}</span></div>
      <button
        onClick={dismiss}
        aria-label="Dismiss visitor analytics"
        className="ml-3 text-slate-500 hover:text-slate-700 text-sm"
      >
        ×
      </button>
    </div>
  );
};

export default FloatingVisitor;
