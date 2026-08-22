import React, { useState } from 'react';
import { CTF_CHALLENGES_FULL, MOCK_LEADERBOARD_USERS } from '../lib/ctfArenaData';
import { CtfChallenge, CtfCategory } from '../types/ctfArena';
import { CtfChallengeCard } from '../components/ctf/CtfChallengeCard';
import { CtfChallengeModal } from '../components/ctf/CtfChallengeModal';
import { CtfLeaderboard } from '../components/ctf/CtfLeaderboard';
import { useUserProgress } from '../context/UserProgressContext';
import { Button } from '../components/ui/Button';
import {
  Trophy,
  Filter,
  CheckCircle2,
  Search,
  Flag,
  Sparkles,
  Award
} from 'lucide-react';

const CTF_CATEGORIES: CtfCategory[] = [
  'Web',
  'Crypto',
  'Forensics',
  'OSINT',
  'Linux',
  'Networking',
  'Python',
  'Blue Team'
];

export const CtfArenaPage: React.FC = () => {
  const { solvedCtfIds, ctfPoints, earnedLabXp, solveCtfChallenge } = useUserProgress();
  const [viewMode, setViewMode] = useState<'challenges' | 'leaderboard'>('challenges');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeChallenge, setActiveChallenge] = useState<CtfChallenge | null>(null);

  const filteredChallenges = CTF_CHALLENGES_FULL.filter(ctf => {
    const matchesCategory = selectedCategory === 'ALL' || ctf.category === selectedCategory;
    const matchesSearch =
      ctf.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ctf.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ctf.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalChallenges = CTF_CHALLENGES_FULL.length;
  const solvedCount = CTF_CHALLENGES_FULL.filter(c => solvedCtfIds.includes(c.id)).length;

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">
              <Flag className="w-4 h-4" /> Gamified Hands-On Capture-The-Flag
            </div>
            <h1 className="text-3xl font-extrabold text-white">CyberShield CTF Arena</h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Test your skills in 8 CTF domains. Solve synthetic target challenges, uncover secret flag strings (CSCTF&#123;...&#125;), earn CTF Points & XP, and compete on the global leaderboard based on OWASP, MITRE ATT&CK, CISA, and CWE standards.
            </p>
          </div>

          {/* Quick User Stats */}
          <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
            <div className="text-center px-2">
              <div className="text-slate-400 text-[10px] uppercase">CTF Points</div>
              <div className="text-amber-400 font-extrabold text-xl flex items-center justify-center gap-1">
                <Trophy className="w-4 h-4 fill-amber-400/20" /> {ctfPoints}
              </div>
            </div>
            <div className="w-px h-10 bg-slate-800"></div>
            <div className="text-center px-2">
              <div className="text-slate-400 text-[10px] uppercase">Solved CTFs</div>
              <div className="text-emerald-400 font-extrabold text-xl flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> {solvedCount} / {totalChallenges}
              </div>
            </div>
          </div>
        </div>

        {/* View Mode Switcher & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('challenges')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                viewMode === 'challenges'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              <Flag className="w-4 h-4" /> Active Challenges ({totalChallenges})
            </button>
            <button
              onClick={() => setViewMode('leaderboard')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                viewMode === 'leaderboard'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              <Award className="w-4 h-4" /> Global Leaderboard
            </button>
          </div>

          {viewMode === 'challenges' && (
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search CTF arena..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 text-xs font-mono text-slate-100 pl-8 pr-3 py-2 rounded-lg border border-slate-800 focus:outline-none focus:border-amber-500"
              />
            </div>
          )}
        </div>

        {/* Category Filters */}
        {viewMode === 'challenges' && (
          <div className="space-y-2 pt-2 border-t border-slate-800/60">
            <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-amber-400" /> Filter CTF Category:
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`text-xs font-mono px-3 py-1 rounded-lg border transition-all ${
                  selectedCategory === 'ALL'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                All Categories ({totalChallenges})
              </button>
              {CTF_CATEGORIES.map(cat => {
                const count = CTF_CHALLENGES_FULL.filter(c => c.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs font-mono px-3 py-1 rounded-lg border transition-all ${
                      selectedCategory === cat
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {viewMode === 'challenges' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5 font-bold uppercase">
              <Sparkles className="w-4 h-4 text-amber-400" /> CTF Challenges List:
            </span>
            <span className="text-slate-500">
              Showing {filteredChallenges.length} of {totalChallenges} CTFs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map(ctf => (
              <CtfChallengeCard
                key={ctf.id}
                challenge={ctf}
                isSolved={solvedCtfIds.includes(ctf.id)}
                onSolveChallenge={c => setActiveChallenge(c)}
              />
            ))}
          </div>

          {filteredChallenges.length === 0 && (
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 space-y-2">
              <p className="text-sm font-mono">No CTF challenges match your search filters.</p>
              <Button size="sm" variant="secondary" onClick={() => { setSelectedCategory('ALL'); setSearchQuery(''); }}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      ) : (
        <CtfLeaderboard
          users={MOCK_LEADERBOARD_USERS}
          currentUserStats={{
            solvedCount: solvedCount,
            totalPoints: ctfPoints,
            totalXp: earnedLabXp
          }}
        />
      )}

      {/* CTF Challenge Runner Modal */}
      {activeChallenge && (
        <CtfChallengeModal
          challenge={activeChallenge}
          isOpen={Boolean(activeChallenge)}
          onClose={() => setActiveChallenge(null)}
          isAlreadySolved={solvedCtfIds.includes(activeChallenge.id)}
          onSolve={(cId, pts, xp) => solveCtfChallenge(cId, pts, xp)}
        />
      )}
    </div>
  );
};
