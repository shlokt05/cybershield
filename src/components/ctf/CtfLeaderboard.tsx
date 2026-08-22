import React, { useState } from 'react';
import { CtfLeaderboardUser } from '../../types/ctfArena';
import { ShieldCheck } from 'lucide-react';

interface CtfLeaderboardProps {
  users: CtfLeaderboardUser[];
  currentUserStats: {
    solvedCount: number;
    totalPoints: number;
    totalXp: number;
  };
}

export const CtfLeaderboard: React.FC<CtfLeaderboardProps> = ({
  users,
  currentUserStats
}) => {
  const [activeTab, setActiveTab] = useState<'global' | 'weekly' | 'category'>('global');

  // Insert or update current user in leaderboard calculation
  const allUsersWithCurrent: CtfLeaderboardUser[] = [
    ...users,
    {
      rank: 0,
      name: 'You (Student Account)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      solvedCount: currentUserStats.solvedCount,
      totalPoints: currentUserStats.totalPoints,
      xp: currentUserStats.totalXp,
      badge: currentUserStats.totalPoints >= 1000 ? '⭐ Red Team Elite' : '🛡️ Cyber Cadet',
      isCurrentUser: true
    }
  ]
    .sort((a, b) => b.totalPoints - a.totalPoints || b.xp - a.xp)
    .map((u, idx) => ({ ...u, rank: idx + 1 }));

  const top3 = allUsersWithCurrent.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Sub-tab Filter */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('global')}
            className={`text-xs font-mono font-bold px-4 py-2 rounded-lg transition-all ${
              activeTab === 'global'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-950 text-slate-400 hover:text-slate-100 border border-slate-800'
            }`}
          >
            🏆 Global Ranking
          </button>
          <button
            onClick={() => setActiveTab('weekly')}
            className={`text-xs font-mono font-bold px-4 py-2 rounded-lg transition-all ${
              activeTab === 'weekly'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-950 text-slate-400 hover:text-slate-100 border border-slate-800'
            }`}
          >
            ⚡ Weekly Standings
          </button>
        </div>

        <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> Dynamic Anti-Abuse Active
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {top3.map((usr) => (
          <div
            key={usr.rank}
            className={`p-4 rounded-2xl border flex items-center gap-3 relative overflow-hidden ${
              usr.rank === 1
                ? 'bg-amber-950/30 border-amber-500/50 shadow-amber-500/10'
                : usr.rank === 2
                ? 'bg-slate-900 border-slate-400/40'
                : 'bg-amber-900/20 border-amber-700/40'
            }`}
          >
            <div className="text-2xl font-extrabold font-mono w-8 text-center">
              {usr.rank === 1 ? '🥇' : usr.rank === 2 ? '🥈' : '🥉'}
            </div>
            <img
              src={usr.avatar}
              alt={usr.name}
              className="w-10 h-10 rounded-xl object-cover border border-amber-400/30"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-white truncate flex items-center gap-1">
                <span>{usr.name}</span>
                {usr.isCurrentUser && (
                  <span className="text-[9px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.2 rounded font-mono">YOU</span>
                )}
              </h4>
              <p className="text-[10px] font-mono text-amber-400 font-bold">{usr.badge}</p>
              <div className="text-[11px] font-mono text-slate-300 mt-1 flex items-center gap-2">
                <span className="text-amber-400 font-extrabold">{usr.totalPoints} PTS</span>
                <span>•</span>
                <span>{usr.solvedCount} Solved</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Rankings Table */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Competitor</th>
                <th className="py-3 px-4">Badge Title</th>
                <th className="py-3 px-4 text-center">CTFs Solved</th>
                <th className="py-3 px-4 text-right">CTF Points</th>
                <th className="py-3 px-4 text-right">Total XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {allUsersWithCurrent.map((u) => (
                <tr
                  key={u.rank}
                  className={`transition-colors ${
                    u.isCurrentUser
                      ? 'bg-amber-500/10 hover:bg-amber-500/20 border-l-4 border-l-amber-500'
                      : 'hover:bg-slate-900/60'
                  }`}
                >
                  <td className="py-3 px-4 font-bold text-slate-300">
                    #{u.rank}
                  </td>
                  <td className="py-3 px-4 flex items-center gap-2.5 font-bold text-white">
                    <img
                      src={u.avatar}
                      alt={u.name}
                      className="w-7 h-7 rounded-lg object-cover border border-slate-700"
                    />
                    <span>{u.name}</span>
                    {u.isCurrentUser && (
                      <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded">YOU</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-amber-400 font-semibold">{u.badge}</td>
                  <td className="py-3 px-4 text-center font-bold text-emerald-400">{u.solvedCount}</td>
                  <td className="py-3 px-4 text-right font-extrabold text-amber-400">+{u.totalPoints} PTS</td>
                  <td className="py-3 px-4 text-right font-bold text-cyan-400">+{u.xp} XP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
