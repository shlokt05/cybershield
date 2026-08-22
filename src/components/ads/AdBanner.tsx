import React from 'react';
import { Shield, Sparkles, ExternalLink, Award } from 'lucide-react';

interface AdBannerProps {
  type?: 'leaderboard' | 'sidebar' | 'banner' | 'in_content';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ type = 'banner', className = '' }) => {
  if (type === 'leaderboard') {
    return (
      <div className={`w-full bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden shadow-lg ${className}`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-bold">
                Cyber Partner Sponsor
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Ad</span>
            </div>
            <h4 className="text-sm font-bold text-white mt-0.5">
              Get 70% Off Verified Password Manager & VPN for Cybersecurity Students
            </h4>
          </div>
        </div>

        <a
          href="https://nordvpn.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shrink-0 shadow-lg shadow-cyan-500/20"
        >
          Claim Student Discount <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  if (type === 'sidebar') {
    return (
      <div className={`bg-slate-950 border border-purple-500/30 rounded-2xl p-5 space-y-4 text-center relative overflow-hidden ${className}`}>
        <div className="inline-flex items-center gap-1 text-[10px] font-mono uppercase text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
          <Sparkles className="w-3 h-3" /> Sponsored Partner Deal
        </div>

        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 mx-auto flex items-center justify-center text-purple-400">
          <Award className="w-6 h-6" />
        </div>

        <div>
          <h4 className="text-sm font-bold text-white">Ethical Hacking & CEH Prep Bootcamp</h4>
          <p className="text-xs text-slate-400 mt-1">
            Certified hands-on labs and exam vouchers for CyberShield learners.
          </p>
        </div>

        <a
          href="https://comptia.org"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-purple-500/20"
        >
          Explore Sponsored Labs
        </a>
      </div>
    );
  }

  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-4 ${className}`}>
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-mono uppercase bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
          Ad Banner
        </span>
        <p className="text-xs text-slate-300">
          Recommended Security Software & Encryption Tools for College Students
        </p>
      </div>

      <a
        href="https://bitwarden.com"
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold rounded-lg border border-slate-700 transition-all shrink-0"
      >
        Learn More
      </a>
    </div>
  );
};
