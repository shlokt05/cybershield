import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUserProgress } from '../context/UserProgressContext';
import {
  calculateUserLevel,
  INITIAL_DAILY_CHALLENGES,
  INITIAL_WEEKLY_CHALLENGES,
  GLOBAL_LEADERBOARD_ENTRIES,
  INITIAL_FORUM_POSTS,
  INITIAL_PROJECT_SHOWCASE,
  INITIAL_CTF_TEAMS,
  INITIAL_MODERATION_REPORTS
} from '../lib/gamificationCommunityData';
import {
  ForumPost,
  ProjectShowcaseItem,
  CtfTeamItem,
  ModerationReportItem
} from '../types/gamificationCommunity';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
  Trophy,
  Flame,
  MessageSquare,
  FolderGit2,
  Users,
  ShieldAlert,
  ThumbsUp,
  Flag,
  Trash2,
  PlusCircle,
  CheckCircle2,
  ExternalLink,
  Zap,
  Ban
} from 'lucide-react';

import { sanitizeInput, isRateLimited, sanitizeUrl } from '../lib/securityUtils';

export const GamificationCommunityPage: React.FC = () => {
  const { user } = useAuth();
  const { progress, solvedCtfIds, completedIncidentIds } = useUserProgress();
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'forum' | 'projects' | 'squads' | 'moderation'>('leaderboard');

  // Gamification state
  const totalUserXp = (progress.learning_progress * 20) + (solvedCtfIds.length * 100) + (completedIncidentIds.length * 50);
  const userLevel = calculateUserLevel(totalUserXp);

  // Forum state
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(INITIAL_FORUM_POSTS);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<'Web Security' | 'Linux' | 'CTF Help' | 'SOC Incident' | 'General'>('Web Security');
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  // Projects state
  const [projects, setProjects] = useState<ProjectShowcaseItem[]>(INITIAL_PROJECT_SHOWCASE);
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjRepo, setNewProjRepo] = useState('');
  const [showNewProjModal, setShowNewProjModal] = useState(false);

  // Squads state
  const [teams] = useState<CtfTeamItem[]>(INITIAL_CTF_TEAMS);

  // Moderation state
  const [moderationReports, setModerationReports] = useState<ModerationReportItem[]>(INITIAL_MODERATION_REPORTS);
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);

  // Upvote handlers
  const handleUpvotePost = (postId: string) => {
    setForumPosts(prev =>
      prev.map(p => p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p)
    );
  };

  const handleUpvoteProject = (projId: string) => {
    setProjects(prev =>
      prev.map(p => p.id === projId ? { ...p, upvotes: p.upvotes + 1 } : p)
    );
  };

  // Moderation handlers
  const handleReportContent = (targetId: string, targetType: 'Post' | 'Comment' | 'Project' | 'User', reason: string) => {
    const newReport: ModerationReportItem = {
      id: `report-${Date.now()}`,
      targetId,
      targetType,
      reportedBy: user?.name || 'Student_User',
      reason: sanitizeInput(reason),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Pending Review'
    };
    setModerationReports(prev => [newReport, ...prev]);
    alert('Report submitted for Admin review. Thank you for keeping CyberShield safe!');
  };

  const handleBlockUser = (authorName: string) => {
    if (!blockedUsers.includes(authorName)) {
      setBlockedUsers(prev => [...prev, authorName]);
      alert(`Blocked user: ${authorName}. Content from this user is now hidden.`);
    }
  };

  const handleDeletePost = (postId: string) => {
    setForumPosts(prev => prev.filter(p => p.id !== postId));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    if (isRateLimited('create-post', 3000)) {
      alert('Security Rate Limit: Please wait a few seconds between forum posts.');
      return;
    }

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      title: sanitizeInput(newPostTitle),
      category: newPostCategory,
      authorName: sanitizeInput(user?.name || 'Shlok Tripathi'),
      authorAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      content: sanitizeInput(newPostContent),
      createdAt: 'Just now',
      upvotes: 1,
      isReported: false,
      comments: []
    };

    setForumPosts([newPost, ...forumPosts]);
    setNewPostTitle('');
    setNewPostContent('');
    setShowNewPostModal(false);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle.trim() || !newProjDesc.trim()) return;

    const newProj: ProjectShowcaseItem = {
      id: `proj-${Date.now()}`,
      title: sanitizeInput(newProjTitle),
      authorName: sanitizeInput(user?.name || 'Shlok Tripathi'),
      authorAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      description: sanitizeInput(newProjDesc),
      repoUrl: sanitizeUrl(newProjRepo || 'https://github.com/cybershield'),
      tags: ['CyberShield', 'Security'],
      upvotes: 1,
      isReported: false
    };

    setProjects([newProj, ...projects]);
    setNewProjTitle('');
    setNewProjDesc('');
    setNewProjRepo('');
    setShowNewProjModal(false);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/30">
            <Zap className="w-3.5 h-3.5" /> Gamification & Student Community Platform
          </div>
          <h1 className="text-3xl font-extrabold text-white">CyberShield Community Hub</h1>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Compete on global leaderboards, earn anti-farming XP, solve daily/weekly challenges, ask technical Q&A questions, showcase security projects, and collaborate in CTF squads.
          </p>
        </div>

        {/* User Level Card */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-4 text-center sm:text-left shrink-0">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-xl">
            L{userLevel.level}
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">Current Rank Title</span>
            <span className="text-sm font-extrabold text-white font-mono block">{userLevel.title}</span>
            <span className="text-xs font-mono text-cyan-400 font-bold">{totalUserXp} XP</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
            activeTab === 'leaderboard'
              ? 'bg-amber-500/10 border border-amber-500/40 text-amber-400'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Trophy className="w-4 h-4" /> Leaderboard & Challenges
        </button>

        <button
          onClick={() => setActiveTab('forum')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
            activeTab === 'forum'
              ? 'bg-cyan-500/10 border border-cyan-500/40 text-cyan-400'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Q&A Discussion Forum
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
            activeTab === 'projects'
              ? 'bg-purple-500/10 border border-purple-500/40 text-purple-400'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <FolderGit2 className="w-4 h-4" /> Project Showcase
        </button>

        <button
          onClick={() => setActiveTab('squads')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
            activeTab === 'squads'
              ? 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-400'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" /> CTF Squads
        </button>

        <button
          onClick={() => setActiveTab('moderation')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
            activeTab === 'moderation'
              ? 'bg-rose-500/10 border border-rose-500/40 text-rose-400'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <ShieldAlert className="w-4 h-4" /> Admin Moderation Queue ({moderationReports.length})
        </button>
      </div>

      {/* Tab 1: Leaderboard & Challenges */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-8">
          {/* Daily & Weekly Learning Challenges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Daily Challenges */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" /> Daily Active Challenges
                </h3>
                <span className="text-[10px] font-mono text-slate-400">Resets in 14h</span>
              </div>
              <div className="space-y-3">
                {INITIAL_DAILY_CHALLENGES.map(dc => (
                  <div key={dc.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">{dc.title}</span>
                      <span className="text-[10px] font-mono text-cyan-400 font-bold">+{dc.xpReward} XP</span>
                    </div>
                    {dc.isCompleted ? (
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Claimed
                      </span>
                    ) : (
                      <Button variant="secondary" size="sm">
                        In Progress ({dc.currentCount}/{dc.requirementCount})
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Challenges */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-cyan-400" /> Weekly Mastery Quests
                </h3>
                <span className="text-[10px] font-mono text-slate-400">Resets Sunday</span>
              </div>
              <div className="space-y-3">
                {INITIAL_WEEKLY_CHALLENGES.map(wc => (
                  <div key={wc.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">{wc.title}</span>
                      <span className="text-[10px] font-mono text-amber-400 font-bold">+{wc.xpReward} XP</span>
                    </div>
                    {wc.isCompleted ? (
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Claimed
                      </span>
                    ) : (
                      <Button variant="secondary" size="sm">
                        In Progress ({wc.currentCount}/{wc.requirementCount})
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Global Student Leaderboard Table */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
              <Trophy className="w-4 h-4 text-amber-400" /> Global Student Leaderboard (Verified XP)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">College</th>
                    <th className="py-3 px-4">Level & Title</th>
                    <th className="py-3 px-4 text-center">Streak</th>
                    <th className="py-3 px-4 text-right">Total XP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {GLOBAL_LEADERBOARD_ENTRIES.map(entry => (
                    <tr key={entry.rank} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold">
                        {entry.rank === 1 ? (
                          <span className="text-amber-400 font-black text-sm">🥇 #1</span>
                        ) : entry.rank === 2 ? (
                          <span className="text-slate-300 font-bold">🥈 #2</span>
                        ) : entry.rank === 3 ? (
                          <span className="text-amber-600 font-bold">🥉 #3</span>
                        ) : (
                          <span className="text-slate-400">#{entry.rank}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 flex items-center gap-2.5">
                        <img src={entry.avatarUrl} alt={entry.studentName} className="w-7 h-7 rounded-lg object-cover border border-slate-700" />
                        <span className="font-bold text-white">{entry.studentName}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{entry.college}</td>
                      <td className="py-3.5 px-4">
                        <span className="text-cyan-400 font-bold">L{entry.level}</span>
                        <span className="text-slate-400 text-[11px] block">{entry.levelTitle}</span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1 text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          <Flame className="w-3 h-3" /> {entry.streakDays}d
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-amber-400">{entry.totalXp} XP</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Q&A Forum */}
      {activeTab === 'forum' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-400" /> Student Cybersecurity Discussion Forum
            </h3>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowNewPostModal(!showNewPostModal)}
              icon={<PlusCircle className="w-4 h-4" />}
            >
              Ask Question
            </Button>
          </div>

          {/* New Post Form Modal */}
          {showNewPostModal && (
            <form onSubmit={handleCreatePost} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
              <h4 className="text-xs font-bold text-white font-mono uppercase">Ask a Technical Cybersecurity Question</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Title:</label>
                  <input
                    type="text"
                    placeholder="e.g. How to bypass JWT alg=none rejection?"
                    value={newPostTitle}
                    onChange={e => setNewPostTitle(e.target.value)}
                    className="w-full bg-slate-950 text-xs text-white p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Category:</label>
                  <select
                    value={newPostCategory}
                    onChange={e => setNewPostCategory(e.target.value as any)}
                    className="w-full bg-slate-950 text-xs text-white p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Web Security">Web Security</option>
                    <option value="Linux">Linux</option>
                    <option value="CTF Help">CTF Help</option>
                    <option value="SOC Incident">SOC Incident</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Details & Context:</label>
                <textarea
                  rows={3}
                  placeholder="Describe your technical inquiry, error code, or concept question..."
                  value={newPostContent}
                  onChange={e => setNewPostContent(e.target.value)}
                  className="w-full bg-slate-950 text-xs text-white p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="secondary" size="sm" onClick={() => setShowNewPostModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="sm">Post Question</Button>
              </div>
            </form>
          )}

          {/* Posts Feed */}
          <div className="space-y-4">
            {forumPosts.filter(p => !blockedUsers.includes(p.authorName)).map(post => (
              <div key={post.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={post.authorAvatar} alt={post.authorName} className="w-8 h-8 rounded-lg object-cover border border-slate-700" />
                    <div>
                      <span className="text-xs font-bold text-white block">{post.authorName}</span>
                      <span className="text-[10px] font-mono text-slate-400">{post.createdAt}</span>
                    </div>
                  </div>
                  <Badge variant="cyan">{post.category}</Badge>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-100 mb-1">{post.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{post.content}</p>
                </div>

                {/* Controls & Reactions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleUpvotePost(post.id)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400 hover:border-cyan-500/50"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" /> {post.upvotes} Upvotes
                    </button>
                    <span className="text-slate-400 flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" /> {post.comments.length} Answers
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReportContent(post.id, 'Post', 'Spam or flag leak')}
                      className="text-[11px] text-rose-400 hover:underline flex items-center gap-1"
                    >
                      <Flag className="w-3 h-3" /> Report
                    </button>
                    <button
                      onClick={() => handleBlockUser(post.authorName)}
                      className="text-[11px] text-slate-400 hover:underline flex items-center gap-1"
                    >
                      <Ban className="w-3 h-3" /> Block
                    </button>
                  </div>
                </div>

                {/* Answers / Comments */}
                {post.comments.length > 0 && (
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Verified Peer Answers:</span>
                    {post.comments.map(c => (
                      <div key={c.id} className="border-t border-slate-800/80 pt-2 flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-cyan-400 font-bold">{c.authorName}</span>
                            <span className="text-[10px] text-slate-500">{c.createdAt}</span>
                          </div>
                          <p className="text-slate-200 mt-0.5">{c.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Project Showcase */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-purple-400" /> Student Security Projects Gallery
            </h3>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowNewProjModal(!showNewProjModal)}
              icon={<PlusCircle className="w-4 h-4" />}
            >
              Submit Project
            </Button>
          </div>

          {/* New Project Modal */}
          {showNewProjModal && (
            <form onSubmit={handleCreateProject} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
              <h4 className="text-xs font-bold text-white font-mono uppercase">Submit Your Cybersecurity Mini-Project</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Project Title:</label>
                  <input
                    type="text"
                    placeholder="e.g. PyAuditor OWASP Scanner"
                    value={newProjTitle}
                    onChange={e => setNewProjTitle(e.target.value)}
                    className="w-full bg-slate-950 text-xs text-white p-2.5 rounded-xl border border-slate-800"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">GitHub Repo URL:</label>
                  <input
                    type="text"
                    placeholder="https://github.com/username/project"
                    value={newProjRepo}
                    onChange={e => setNewProjRepo(e.target.value)}
                    className="w-full bg-slate-950 text-xs text-white p-2.5 rounded-xl border border-slate-800"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Project Description:</label>
                <textarea
                  rows={2}
                  placeholder="Explain architecture, languages used, and security problem solved..."
                  value={newProjDesc}
                  onChange={e => setNewProjDesc(e.target.value)}
                  className="w-full bg-slate-950 text-xs text-white p-2.5 rounded-xl border border-slate-800"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="secondary" size="sm" onClick={() => setShowNewProjModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="sm">Submit Project</Button>
              </div>
            </form>
          )}

          {/* Project Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(proj => (
              <div key={proj.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={proj.authorAvatar} alt={proj.authorName} className="w-7 h-7 rounded-lg object-cover border border-slate-700" />
                      <span className="text-xs font-bold text-white">{proj.authorName}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {proj.tags.map(t => <Badge key={t} variant="purple">{t}</Badge>)}
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-slate-100">{proj.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{proj.description}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs font-mono">
                  <button
                    onClick={() => handleUpvoteProject(proj.id)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-purple-400 hover:border-purple-500/50"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" /> {proj.upvotes} Upvotes
                  </button>

                  <a
                    href={proj.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1 font-bold"
                  >
                    GitHub Repo <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: CTF Squads */}
      {activeTab === 'squads' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-400" /> CTF Squads & Team Leaderboard
            </h3>
            <Button variant="primary" size="sm" icon={<PlusCircle className="w-4 h-4" />}>
              Create CTF Squad
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teams.map(team => (
              <div key={team.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black">
                      🛡️
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{team.teamName}</h4>
                      <span className="text-[10px] font-mono text-slate-400">Captain: {team.captainName}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-amber-400 font-extrabold">{team.totalScore} Pts</span>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Squad Roster ({team.members.length}/{team.maxMembers}):</span>
                  <div className="flex flex-wrap gap-2">
                    {team.members.map(m => (
                      <span key={m} className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-slate-200">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-slate-400">{team.solvedFlagsCount} CTF Flags Solved</span>
                  <Button variant="secondary" size="sm">
                    Join Squad
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Admin Moderation Queue */}
      {activeTab === 'moderation' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" /> Admin Content Moderation Queue
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Review reported content, block bad actors, and enforce anti-spam policies.</p>
            </div>
            <Badge variant="rose">Rate Limit & Anti-Spam Active</Badge>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {moderationReports.map(rep => (
              <div key={rep.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-rose-400 font-bold">[{rep.targetType}] Target ID: {rep.targetId}</span>
                    <span className="text-[10px] text-slate-500">Reported by: {rep.reportedBy}</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">Reason: {rep.reason}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button variant="secondary" size="sm" onClick={() => handleDeletePost(rep.targetId)}>
                    <Trash2 className="w-3.5 h-3.5 text-rose-400" /> Delete Content
                  </Button>
                  <Button variant="primary" size="sm">
                    Approve / Dismiss
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
