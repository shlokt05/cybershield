import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUserProgress } from '../context/UserProgressContext';
import { Button } from '../components/ui/Button';
import { Lock, RefreshCw, ShieldAlert, Check } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { resetProgress } = useUserProgress();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Lock className="w-6 h-6 text-purple-400" /> Account & Security Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage profile details, cybersecurity preferences, and local score state
        </p>
      </div>

      {/* Profile Form */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-4">Personal Information</h3>
        <form onSubmit={handleSave} className="space-y-4 max-w-md">
          {savedNotice && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs flex items-center gap-2">
              <Check className="w-4 h-4" /> Profile updated successfully!
            </div>
          )}

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <Button type="submit" variant="primary" size="sm">
            Save Profile Changes
          </Button>
        </form>
      </div>

      {/* Local State Reset */}
      <div className="bg-slate-900/80 border border-rose-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-rose-400 text-base font-bold mb-2">
          <ShieldAlert className="w-5 h-5" /> Danger Zone: Reset CyberShield State
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Reset all stored quiz scores, completed checklist items, and phishing scenario history stored in your local browser state.
        </p>
        <Button
          variant="danger"
          size="sm"
          onClick={() => {
            if (confirm('Are you sure you want to reset your CyberShield score and progress?')) {
              resetProgress();
              alert('CyberShield score and checklist have been reset.');
            }
          }}
          icon={<RefreshCw className="w-4 h-4" />}
        >
          Reset All Learning Progress
        </Button>
      </div>
    </div>
  );
};
