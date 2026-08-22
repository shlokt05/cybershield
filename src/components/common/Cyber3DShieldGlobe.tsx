import React, { useState } from 'react';
import { Shield, Zap, Lock, Eye, Cpu, Radio } from 'lucide-react';

export const Cyber3DShieldGlobe: React.FC = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [activeNode, setActiveNode] = useState<string | null>('OWASP A03');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    setRotate({ x, y });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const threatNodes = [
    { id: 'OWASP A03', label: 'SQLi Defended', status: 'Blocked', color: 'border-emerald-500 text-emerald-400 bg-emerald-500/10' },
    { id: 'AES-256', label: 'Vault Encrypted', status: 'Active', color: 'border-cyan-500 text-cyan-400 bg-cyan-500/10' },
    { id: 'EDR-SIEM', label: 'Threat Intel Active', status: 'Live', color: 'border-purple-500 text-purple-400 bg-purple-500/10' },
    { id: 'Zero-Trust', label: 'MFA Verified', status: 'Protected', color: 'border-amber-500 text-amber-400 bg-amber-500/10' },
  ];

  return (
    <div
      className="relative w-full max-w-4xl mx-auto py-12 perspective-1000 select-none cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Interactive 3D Canvas */}
      <div
        className="relative preserve-3d transition-transform duration-200 ease-out flex flex-col items-center justify-center p-8 rounded-3xl glass-3d-card border border-cyan-500/40"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        {/* 3D Laser Scan Line */}
        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-laser-scan pointer-events-none" />

        {/* 3D Concentric Orbit Rings */}
        <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/30 animate-spin-slow" />
          {/* Middle Ring */}
          <div className="absolute inset-6 rounded-full border border-purple-500/40 animate-pulse" />
          {/* Inner Glowing Orbit */}
          <div className="absolute inset-12 rounded-full border border-emerald-500/30" />

          {/* Central 3D Pulsing Holographic Shield Emblem */}
          <div className="relative z-20 w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-tr from-cyan-950 via-slate-900 to-purple-950 border border-cyan-400/50 flex flex-col items-center justify-center text-cyan-300 shadow-[0_0_50px_rgba(6,182,212,0.5)] animate-float-3d">
            <Shield className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-400 animate-pulse filter drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]" />
            <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-cyan-300 mt-2 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" /> 3D Cyber Shield
            </span>
          </div>

          {/* Floating Threat Orbit Nodes */}
          {threatNodes.map((node, i) => {
            const angle = (i * 360) / threatNodes.length;
            const radius = 130; // Radius distance in pixels
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            return (
              <div
                key={node.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveNode(node.id);
                }}
                className={`absolute z-30 px-3 py-1.5 rounded-xl border text-[11px] font-mono font-bold transition-all transform hover:scale-110 shadow-lg cursor-pointer ${node.color} ${
                  activeNode === node.id ? 'ring-2 ring-cyan-400 scale-105' : 'opacity-85'
                }`}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>{node.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3D Telemetry Stats Footer Bar */}
        <div className="w-full mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-0.5">
            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" /> Telemetry Radar
            </span>
            <p className="text-xs font-bold text-white">Live 24/7 Active</p>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-0.5">
            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" /> Encryption Level
            </span>
            <p className="text-xs font-bold text-emerald-400">AES-256 GCM</p>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-0.5">
            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <Cpu className="w-3 h-3 text-purple-400" /> Sandbox Isolation
            </span>
            <p className="text-xs font-bold text-purple-300">100% Client-Side</p>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-0.5">
            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <Eye className="w-3 h-3 text-amber-400" /> OWASP Audit
            </span>
            <p className="text-xs font-bold text-amber-300">Top 10 Shielded</p>
          </div>
        </div>
      </div>
    </div>
  );
};
