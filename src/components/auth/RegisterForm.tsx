import React, { useState } from 'react';
import { Mail, Lock, User, ShieldCheck, School, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { INDIAN_STATES_AND_UTS, searchColleges } from '../../lib/indianColleges';

interface RegisterFormProps {
  onSuccess: () => void;
  switchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, switchToLogin }) => {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [stateName, setStateName] = useState('Uttar Pradesh');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [collegeSuggestions, setCollegeSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleCollegeChange = (val: string) => {
    setCollegeName(val);
    if (val.trim().length > 0) {
      setCollegeSuggestions(searchColleges(val, stateName));
      setShowSuggestions(true);
    } else {
      setCollegeSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectCollege = (col: string) => {
    setCollegeName(col);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!collegeName.trim()) {
      setError('Please enter your College or University name');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }

    login(email, name, collegeName, stateName);
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
          Student Full Name
        </label>
        <div className="relative">
          <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
            placeholder="Shlok Tripathi"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
            State / Union Territory
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <select
              value={stateName}
              onChange={(e) => {
                setStateName(e.target.value);
                setCollegeSuggestions(searchColleges(collegeName, e.target.value));
              }}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
            >
              {INDIAN_STATES_AND_UTS.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative">
          <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
            College / University Name
          </label>
          <div className="relative">
            <School className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={collegeName}
              onChange={(e) => handleCollegeChange(e.target.value)}
              onFocus={() => {
                if (collegeName.trim()) setShowSuggestions(true);
              }}
              required
              className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="Search or type college name (e.g. IIT, DTU, AKTU)"
            />
          </div>

          {/* Autocomplete Dropdown */}
          {showSuggestions && collegeSuggestions.length > 0 && (
            <div className="absolute z-50 left-0 right-0 mt-1 bg-slate-900 border border-cyan-500/40 rounded-xl shadow-2xl max-h-48 overflow-y-auto divide-y divide-slate-800">
              {collegeSuggestions.map((col, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectCollege(col)}
                  className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors flex items-center gap-2"
                >
                  <School className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{col}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

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
            placeholder="shlok@college.edu"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
          Create Password
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

      <Button variant="accent" type="submit" className="w-full mt-2" icon={<ShieldCheck className="w-4 h-4" />}>
        Create Student Account & Start Learning
      </Button>

      <div className="pt-3 border-t border-slate-800 text-center text-xs text-slate-400">
        Already registered?{' '}
        <button
          type="button"
          onClick={switchToLogin}
          className="text-cyan-400 font-semibold hover:underline"
        >
          Sign in here
        </button>
      </div>
    </form>
  );
};
