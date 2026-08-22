import React, { useState } from 'react';
import { DollarSign, ExternalLink, Sparkles, X } from 'lucide-react';

export const GuestMonetizationBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="w-full my-6 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 relative shadow-xl overflow-hidden animate-fadeIn">
      {/* Background Glow */}
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold border border-amber-500/40">
                Sponsored Partner Ad
              </span>
              <span className="text-[10px] font-mono text-slate-400">AdSense Publisher Verified</span>
            </div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              Cloud Security & Ethical Hacking Mastery Pass <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Get certified in AWS AppSec, Kubernetes Hardening & Threat Hunting with 80% Off Partner Sponsorship.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-end">
          <a
            href="https://cybershield-eta-beryl.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold text-xs flex items-center gap-1.5 hover:brightness-110 transition-all shadow-md"
          >
            <span>Explore Partner Ad</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => setDismissed(true)}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-all"
            title="Dismiss Ad"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Google AdSense Script Slot Injection */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', marginTop: '10px' }}
        data-ad-client="ca-pub-9988776655443322"
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
