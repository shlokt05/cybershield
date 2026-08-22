import React, { useState, useEffect } from 'react';
import { WifiOff, RefreshCw, ShieldAlert, Zap } from 'lucide-react';
import { Button } from '../ui/Button';

export const OfflineGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="fixed inset-0 z-50 bg-[#070a12] flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
        <div className="max-w-md w-full bg-slate-900/95 border border-rose-500/40 rounded-3xl p-8 text-center space-y-6 shadow-2xl backdrop-blur-xl">
          <div className="w-20 h-20 rounded-3xl bg-rose-500/10 border border-rose-500/30 mx-auto flex items-center justify-center text-rose-400 animate-pulse">
            <WifiOff className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-rose-400 uppercase tracking-widest flex items-center justify-center gap-1.5 font-bold">
              <ShieldAlert className="w-4 h-4" /> Internet Required
            </span>
            <h2 className="text-2xl font-extrabold text-white">Connection Offline</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              CyberShield requires an active internet connection to stream live lab simulations, CyberAI mentor intelligence, and real-time threat telemetry.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-left space-y-2 text-xs">
            <span className="font-mono text-cyan-400 font-bold block flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-cyan-400" /> Reconnection Steps:
            </span>
            <ul className="text-slate-400 list-disc list-inside space-y-1 text-[11px]">
              <li>Turn ON Mobile Data or Wi-Fi on your device.</li>
              <li>Check your network router or proxy settings.</li>
            </ul>
          </div>

          <Button
            variant="accent"
            className="w-full py-3"
            onClick={() => window.location.reload()}
            icon={<RefreshCw className="w-4 h-4" />}
          >
            Retry Connection Now
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
