import React from 'react';
import { clsx } from 'clsx';

interface GlowCardProps {
  children: React.ReactNode;
  glowColor?: 'cyan' | 'emerald' | 'amber' | 'rose' | 'purple' | 'none';
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  glowColor = 'cyan',
  className,
  onClick,
  hoverEffect = true
}) => {
  const glowStyles = {
    cyan: 'border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.25)]',
    emerald: 'border-slate-800 hover:border-emerald-500/50 hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.25)]',
    amber: 'border-slate-800 hover:border-amber-500/50 hover:shadow-[0_0_25px_-5px_rgba(245,158,11,0.25)]',
    rose: 'border-slate-800 hover:border-rose-500/50 hover:shadow-[0_0_25px_-5px_rgba(244,63,94,0.25)]',
    purple: 'border-slate-800 hover:border-purple-500/50 hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.25)]',
    none: 'border-slate-800'
  };

  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-slate-900/80 backdrop-blur-md border rounded-xl p-6 transition-all duration-300',
        hoverEffect && 'hover:-translate-y-1 cursor-pointer',
        glowStyles[glowColor],
        className
      )}
    >
      {children}
    </div>
  );
};
