import React, { useState } from 'react';
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
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverEffect) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    setRotate({ x, y });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const glowStyles = {
    cyan: 'border-slate-800 hover:border-cyan-500/60 hover:shadow-[0_20px_40px_-15px_rgba(6,182,212,0.35)]',
    emerald: 'border-slate-800 hover:border-emerald-500/60 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.35)]',
    amber: 'border-slate-800 hover:border-amber-500/60 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.35)]',
    rose: 'border-slate-800 hover:border-rose-500/60 hover:shadow-[0_20px_40px_-15px_rgba(244,63,94,0.35)]',
    purple: 'border-slate-800 hover:border-purple-500/60 hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.35)]',
    none: 'border-slate-800'
  };

  return (
    <div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: hoverEffect ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` : undefined,
      }}
      className={clsx(
        'glass-3d-card rounded-2xl p-6 transition-transform duration-200 ease-out preserve-3d',
        hoverEffect && 'cursor-pointer',
        glowStyles[glowColor],
        className
      )}
    >
      {children}
    </div>
  );
};
