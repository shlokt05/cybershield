import React, { useState, useEffect } from 'react';
import { Shield, Lock, Terminal, User, LogOut, Menu, X, Code2, HelpCircle, MailWarning, BookOpen, Compass, Award, ShieldAlert, FolderGit2, Bot, ShieldCheck, Users, Smartphone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useUserProgress } from '../../context/UserProgressContext';
import { Button } from '../ui/Button';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAuthModal: (mode: 'login' | 'register') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openAuthModal }) => {
  const { user, logout } = useAuth();
  const { progress } = useUserProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const triggerMobileInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      alert('📱 CyberShield Mobile App Install Guide:\n\n1. Android (Chrome): Tap 3 dots (⋮) at top-right -> "Add to Home screen" or "Install App".\n\n2. iPhone (Safari): Tap Share button (⎋) -> "Add to Home Screen".');
    }
  };

  // Secret Hotkey for Platform Owner: Ctrl + Shift + A (or Cmd + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setActiveTab('admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveTab]);

  const navLinks = [
    { id: 'landing', label: 'Overview', icon: <Shield className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <Terminal className="w-4 h-4" /> },
    { id: 'cyber-ai', label: 'CyberAI Mentor', icon: <Bot className="w-4 h-4 text-cyan-400 font-bold" /> },
    { id: 'community', label: 'Community', icon: <Users className="w-4 h-4 text-cyan-400 font-bold" /> },
    { id: 'modules', label: 'Module Hub', icon: <BookOpen className="w-4 h-4 text-emerald-400" /> },
    { id: 'quiz', label: 'Quiz Test', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'phishing', label: 'Phishing Sim', icon: <MailWarning className="w-4 h-4" /> },
    { id: 'password', label: 'Password Tool', icon: <Lock className="w-4 h-4 text-amber-400" /> },
    { id: 'code-insights', label: 'Real-World Code', icon: <Code2 className="w-4 h-4 text-cyan-400" /> },
    { id: 'terminal-lab', label: 'Terminal Lab', icon: <Terminal className="w-4 h-4 text-cyan-400 font-bold" /> },
    { id: 'mini-projects', label: 'Mini Projects', icon: <FolderGit2 className="w-4 h-4 text-purple-400 font-bold" /> },
    { id: 'interactive-labs', label: 'Interactive Labs', icon: <Terminal className="w-4 h-4 text-cyan-400 font-bold" /> },
    { id: 'ctf-arena', label: 'CTF Arena', icon: <Award className="w-4 h-4 text-amber-400 font-bold" /> },
    { id: 'soc-simulator', label: 'SOC Simulator', icon: <ShieldAlert className="w-4 h-4 text-rose-400 font-bold" /> },
    {id: 'learning-paths', label: 'Career Center', icon: <Compass className="w-4 h-4 text-purple-400 font-bold" /> },
    { id: 'certificate', label: 'Certificate', icon: <Award className="w-4 h-4 text-amber-400" /> },
    { id: 'verify-cert', label: 'Verify Cert', icon: <ShieldCheck className="w-4 h-4 text-emerald-400 font-bold" /> },
    { id: 'admin', label: 'Owner Admin', icon: <ShieldAlert className="w-4 h-4 text-amber-400" /> },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-[#070a12]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:border-cyan-500/60 transition-all">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                Cyber<span className="text-cyan-400">Shield</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block -mt-1">
                Security Awareness Platform
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-slate-800 text-cyan-400 font-semibold border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* User Section & Score Indicator */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Install Mobile App Button */}
            <button
              onClick={triggerMobileInstall}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold hover:bg-cyan-500/20 hover:border-cyan-500/60 transition-all shadow-sm"
              title="Install CyberShield Mobile App"
            >
              <Smartphone className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Install App</span>
            </button>

            {/* Quick CyberShield Score Badge */}
            <div
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-cyan-500/50 transition-all"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono text-slate-400">Score:</span>
              <span className="text-xs font-extrabold text-cyan-400 font-mono">
                {progress.total_score}/100
              </span>
            </div>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                    alt={user.name}
                    className="w-7 h-7 rounded-lg object-cover border border-cyan-400/50"
                  />
                  <span className="text-xs font-semibold text-slate-200 max-w-[100px] truncate">
                    {user.name}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-1 z-50 animate-fadeIn">
                    <button
                      onClick={() => {
                        setActiveTab('admin');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-amber-300 hover:bg-slate-800 flex items-center gap-2 font-semibold"
                    >
                      <ShieldAlert className="w-4 h-4 text-amber-400" /> Owner Admin Portal
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('modules');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4 text-emerald-400" /> Module Study Hub
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('certificate');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                    >
                      <Award className="w-4 h-4 text-amber-400" /> Certificate
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-cyan-400" /> Student Profile
                    </button>
                    <div className="border-t border-slate-800 my-1" />
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-rose-400 hover:bg-slate-800 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => openAuthModal('login')}>
                  Sign In
                </Button>
                <Button variant="primary" size="sm" onClick={() => openAuthModal('register')}>
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#070a12] px-4 pt-2 pb-4 space-y-2">
          <button
            onClick={() => {
              triggerMobileInstall();
              setMobileMenuOpen(false);
            }}
            className="w-full px-3 py-2.5 rounded-lg text-xs font-mono font-bold bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 flex items-center gap-2"
          >
            <Smartphone className="w-4 h-4 text-cyan-400 animate-pulse" />
            Install CyberShield Mobile App
          </button>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActiveTab(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full px-3 py-2.5 rounded-lg text-xs font-medium flex items-center gap-2 ${
                activeTab === link.id ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-300'
              }`}
            >
              {link.icon}
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
