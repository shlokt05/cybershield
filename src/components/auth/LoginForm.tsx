import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

interface LoginFormProps {
  onSuccess: () => void;
  switchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, switchToRegister }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('student@cybershield.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    login(email);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-400 text-xs font-mono">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
          Email Address
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
            placeholder="student@university.edu"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
          Password
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
            placeholder="••••••••••••"
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" defaultChecked className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0" />
          <span>Remember session</span>
        </label>
        <button type="button" className="text-cyan-400 hover:underline">
          Forgot password?
        </button>
      </div>

      <Button variant="primary" type="submit" className="w-full mt-2" icon={<ArrowRight className="w-4 h-4" />}>
        Sign In to CyberShield
      </Button>

      <div className="pt-3 border-t border-slate-800 text-center text-xs text-slate-400">
        New to cybersecurity learning?{' '}
        <button
          type="button"
          onClick={switchToRegister}
          className="text-cyan-400 font-semibold hover:underline"
        >
          Create free account
        </button>
      </div>
    </form>
  );
};
