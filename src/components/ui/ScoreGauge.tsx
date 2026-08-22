import React from 'react';
import { RatingCategory } from '../../types/database';

interface ScoreGaugeProps {
  score: number;
  rating: RatingCategory;
  size?: 'sm' | 'md' | 'lg';
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, rating, size = 'md' }) => {
  const radius = size === 'sm' ? 40 : size === 'md' ? 65 : 90;
  const strokeWidth = size === 'sm' ? 8 : size === 'md' ? 12 : 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const ratingColors = {
    'High Risk': { stroke: '#f43f5e', text: 'text-rose-500', bg: 'bg-rose-500/10 border-rose-500/30' },
    'Needs Improvement': { stroke: '#f59e0b', text: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
    'Good': { stroke: '#06b6d4', text: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' },
    'Strong': { stroke: '#10b981', text: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
  };

  const currentTheme = ratingColors[rating] || ratingColors['Good'];

  const containerSizes = {
    sm: 'w-24 h-24',
    md: 'w-44 h-44',
    lg: 'w-60 h-60',
  };

  return (
    <div className={`relative flex flex-col items-center justify-center ${containerSizes[size]}`}>
      <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 200 200">
        {/* Background track circle */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          className="stroke-slate-800"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated progress arc */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke={currentTheme.stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Inner score badge text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className={`font-extrabold tracking-tight text-slate-100 ${size === 'sm' ? 'text-xl' : size === 'md' ? 'text-4xl' : 'text-6xl'}`}>
          {score}
        </span>
        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-slate-400">
          / 100
        </span>
      </div>
    </div>
  );
};
