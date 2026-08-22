import React from 'react';
import { ExternalLink, BookOpen, ShieldCheck } from 'lucide-react';
import { getOfficialSource } from '../../lib/officialSources';

interface OfficialReferenceSectionProps {
  sourceIds: string[];
  className?: string;
  compact?: boolean;
}

export const OfficialReferenceSection: React.FC<OfficialReferenceSectionProps> = ({
  sourceIds,
  className = '',
  compact = false
}) => {
  if (!sourceIds || sourceIds.length === 0) return null;

  const sources = sourceIds
    .map(id => getOfficialSource(id))
    .filter((src): src is NonNullable<typeof src> => src !== undefined);

  if (sources.length === 0) return null;

  if (compact) {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        <span className="text-[10px] font-mono text-cyan-400 font-semibold uppercase tracking-wider flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" /> Official Ref:
        </span>
        {sources.map(src => (
          <a
            key={src.id}
            href={src.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] bg-slate-900 hover:bg-slate-800 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30 transition-colors font-mono"
            title={src.description}
          >
            {src.name}
            <ExternalLink className="w-2.5 h-2.5 opacity-70" />
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={`bg-slate-950/80 border border-cyan-500/20 rounded-xl p-4 space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          Official References & Authoritative Sources
        </div>
        <span className="text-[10px] text-slate-500 font-mono">Standards Compliant</span>
      </div>

      <p className="text-xs text-slate-400">
        CyberShield educational content is based on official cybersecurity frameworks and standard specifications:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
        {sources.map(src => (
          <div key={src.id} className="flex flex-col justify-between bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 hover:border-cyan-500/40 transition-all">
            <div>
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                {src.name}
              </span>
              <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                {src.description}
              </p>
            </div>

            <a
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 font-semibold mt-2.5 self-start group"
            >
              Learn More at {src.category}
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
