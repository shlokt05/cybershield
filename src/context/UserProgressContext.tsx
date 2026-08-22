import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress } from '../types/database';
import { INITIAL_CHECKLIST_ITEMS } from '../lib/mockData';

interface UserProgressContextType {
  progress: UserProgress;
  completedChecklistIds: string[];
  completedModuleIds: string[];
  completedSkillIds: string[];
  masteredSkillIds: string[];
  completedLabIds: string[];
  earnedLabXp: number;
  solvedCtfIds: string[];
  ctfPoints: number;
  completedIncidentIds: string[];
  socScore: number;
  toggleChecklistItem: (itemId: string) => void;
  recordQuizResult: (scorePercentage: number) => void;
  recordPhishingResult: (isCorrect: boolean) => void;
  markModuleCompleted: (moduleId: string, scorePercent: number) => void;
  toggleSkillComplete: (skillId: string) => void;
  toggleSkillMastered: (skillId: string) => void;
  completeLab: (labId: string, xpReward: number) => void;
  solveCtfChallenge: (challengeId: string, points: number, xpReward: number) => void;
  completeSocIncident: (incidentId: string, accuracyPercent: number, scorePoints: number) => void;
  resetProgress: () => void;
  isCertificateUnlocked: boolean;
  areAllModulesCompleted: boolean;
}

const DEFAULT_PROGRESS: UserProgress = {
  id: 'progress-demo-123',
  user_id: 'demo-user-123',
  total_score: 78,
  quiz_score: 80,
  phishing_score: 80,
  security_hygiene_score: 75,
  learning_progress: 80,
  quizzes_completed: 5,
  phishing_completed: 5,
  checklist_items_completed: 7,
  rating_category: 'Good',
  last_updated: new Date().toISOString()
};

const ALL_MODULE_IDS = ['web-security', 'phishing-awareness', 'password-entropy', 'network-security', 'threat-intel'];

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export const UserProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedChecklistIds, setCompletedChecklistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('cybershield_checklist');
    return saved ? JSON.parse(saved) : INITIAL_CHECKLIST_ITEMS.filter(i => i.is_completed).map(i => i.id);
  });

  const [completedModuleIds, setCompletedModuleIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('cybershield_completed_modules');
    return saved ? JSON.parse(saved) : ['web-security', 'password-entropy'];
  });

  const [completedSkillIds, setCompletedSkillIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('cybershield_completed_skills');
    return saved ? JSON.parse(saved) : ['sk-net-1', 'sk-lin-1', 'sk-py-1', 'sk-web-1', 'sk-crypto-1', 'sk-soc-1', 'sk-df-1'];
  });

  const [masteredSkillIds, setMasteredSkillIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('cybershield_mastered_skills');
    return saved ? JSON.parse(saved) : ['sk-net-1', 'sk-web-1', 'sk-crypto-2'];
  });

  const [completedLabIds, setCompletedLabIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('cybershield_completed_labs');
    return saved ? JSON.parse(saved) : ['lab-net-1', 'lab-web-1', 'lab-soc-1'];
  });

  const [earnedLabXp, setEarnedLabXp] = useState<number>(() => {
    const saved = localStorage.getItem('cybershield_earned_lab_xp');
    return saved ? Number(saved) : 550;
  });

  const [solvedCtfIds, setSolvedCtfIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('cybershield_solved_ctfs');
    return saved ? JSON.parse(saved) : ['ctf-web-1', 'ctf-crypto-1', 'ctf-osint-1'];
  });

  const [ctfPoints, setCtfPoints] = useState<number>(() => {
    const saved = localStorage.getItem('cybershield_ctf_points');
    return saved ? Number(saved) : 350;
  });

  const [completedIncidentIds, setCompletedIncidentIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('cybershield_completed_incidents');
    return saved ? JSON.parse(saved) : ['inc-phishing-1', 'inc-bruteforce-1'];
  });

  const [socScore, setSocScore] = useState<number>(() => {
    const saved = localStorage.getItem('cybershield_soc_score');
    return saved ? Number(saved) : 380;
  });

  const [quizScore, setQuizScore] = useState<number>(() => {
    const saved = localStorage.getItem('cybershield_quiz_score');
    return saved ? Number(saved) : 80;
  });

  const [quizzesCompleted, setQuizzesCompleted] = useState<number>(() => {
    const saved = localStorage.getItem('cybershield_quizzes_completed');
    return saved ? Number(saved) : 5;
  });

  const [phishingStats, setPhishingStats] = useState<{ total: number; correct: number }>(() => {
    const saved = localStorage.getItem('cybershield_phishing_stats');
    return saved ? JSON.parse(saved) : { total: 5, correct: 4 };
  });

  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);

  // Recalculate CyberShield Score dynamically
  useEffect(() => {
    const hygienePercentage = Math.round((completedChecklistIds.length / INITIAL_CHECKLIST_ITEMS.length) * 100);
    const phishingPercentage = phishingStats.total > 0 ? Math.round((phishingStats.correct / phishingStats.total) * 100) : 80;
    const moduleCompletionPercent = Math.round((completedModuleIds.length / ALL_MODULE_IDS.length) * 100);

    // Weighted Overall Score Formula: Quiz (30%) + Phishing (30%) + Hygiene (20%) + Modules (20%)
    const overallScore = Math.min(100, Math.max(0, Math.round(
      (quizScore * 0.30) + (phishingPercentage * 0.30) + (hygienePercentage * 0.20) + (moduleCompletionPercent * 0.20)
    )));

    let rating: 'High Risk' | 'Needs Improvement' | 'Good' | 'Strong' = 'High Risk';
    if (overallScore > 80) rating = 'Strong';
    else if (overallScore > 60) rating = 'Good';
    else if (overallScore > 30) rating = 'Needs Improvement';

    setProgress({
      id: 'progress-demo-123',
      user_id: 'demo-user-123',
      total_score: overallScore,
      quiz_score: quizScore,
      phishing_score: phishingPercentage,
      security_hygiene_score: hygienePercentage,
      learning_progress: moduleCompletionPercent,
      quizzes_completed: quizzesCompleted,
      phishing_completed: phishingStats.total,
      checklist_items_completed: completedChecklistIds.length,
      rating_category: rating,
      last_updated: new Date().toISOString()
    });

    localStorage.setItem('cybershield_checklist', JSON.stringify(completedChecklistIds));
    localStorage.setItem('cybershield_completed_modules', JSON.stringify(completedModuleIds));
    localStorage.setItem('cybershield_completed_skills', JSON.stringify(completedSkillIds));
    localStorage.setItem('cybershield_mastered_skills', JSON.stringify(masteredSkillIds));
    localStorage.setItem('cybershield_completed_labs', JSON.stringify(completedLabIds));
    localStorage.setItem('cybershield_earned_lab_xp', String(earnedLabXp));
    localStorage.setItem('cybershield_solved_ctfs', JSON.stringify(solvedCtfIds));
    localStorage.setItem('cybershield_ctf_points', String(ctfPoints));
    localStorage.setItem('cybershield_completed_incidents', JSON.stringify(completedIncidentIds));
    localStorage.setItem('cybershield_soc_score', String(socScore));
    localStorage.setItem('cybershield_quiz_score', String(quizScore));
    localStorage.setItem('cybershield_quizzes_completed', String(quizzesCompleted));
    localStorage.setItem('cybershield_phishing_stats', JSON.stringify(phishingStats));
  }, [completedChecklistIds, completedModuleIds, completedSkillIds, masteredSkillIds, completedLabIds, earnedLabXp, solvedCtfIds, ctfPoints, completedIncidentIds, socScore, quizScore, quizzesCompleted, phishingStats]);

  const toggleChecklistItem = (itemId: string) => {
    setCompletedChecklistIds(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const recordQuizResult = (scorePercentage: number) => {
    setQuizScore(scorePercentage);
    setQuizzesCompleted(prev => prev + 1);
  };

  const recordPhishingResult = (isCorrect: boolean) => {
    setPhishingStats(prev => ({
      total: prev.total + 1,
      correct: isCorrect ? prev.correct + 1 : prev.correct
    }));
  };

  const markModuleCompleted = (moduleId: string, scorePercent: number) => {
    if (!completedModuleIds.includes(moduleId)) {
      setCompletedModuleIds(prev => [...prev, moduleId]);
    }
    if (scorePercent > quizScore) {
      setQuizScore(scorePercent);
    }
  };

  const toggleSkillComplete = (skillId: string) => {
    setCompletedSkillIds(prev =>
      prev.includes(skillId) ? prev.filter(id => id !== skillId) : [...prev, skillId]
    );
  };

  const toggleSkillMastered = (skillId: string) => {
    setMasteredSkillIds(prev =>
      prev.includes(skillId) ? prev.filter(id => id !== skillId) : [...prev, skillId]
    );
    if (!completedSkillIds.includes(skillId)) {
      setCompletedSkillIds(prev => [...prev, skillId]);
    }
  };

  const completeLab = (labId: string, xpReward: number) => {
    if (!completedLabIds.includes(labId)) {
      setCompletedLabIds(prev => [...prev, labId]);
      setEarnedLabXp(prev => prev + xpReward);
    }
  };

  const solveCtfChallenge = (challengeId: string, points: number, xpReward: number) => {
    if (!solvedCtfIds.includes(challengeId)) {
      setSolvedCtfIds(prev => [...prev, challengeId]);
      setCtfPoints(prev => prev + points);
      setEarnedLabXp(prev => prev + xpReward);
    }
  };

  const completeSocIncident = (incidentId: string, _accuracyPercent: number, scorePoints: number) => {
    if (!completedIncidentIds.includes(incidentId)) {
      setCompletedIncidentIds(prev => [...prev, incidentId]);
      setSocScore(prev => prev + scorePoints);
    }
  };

  const resetProgress = () => {
    const defaultIds = INITIAL_CHECKLIST_ITEMS.filter(i => i.is_completed).map(i => i.id);
    setCompletedChecklistIds(defaultIds);
    setCompletedModuleIds(['web-security', 'password-entropy']);
    setCompletedSkillIds(['sk-net-1', 'sk-lin-1', 'sk-py-1', 'sk-web-1', 'sk-crypto-1', 'sk-soc-1', 'sk-df-1']);
    setMasteredSkillIds(['sk-net-1', 'sk-web-1', 'sk-crypto-2']);
    setCompletedLabIds(['lab-net-1', 'lab-web-1', 'lab-soc-1']);
    setEarnedLabXp(550);
    setSolvedCtfIds(['ctf-web-1', 'ctf-crypto-1', 'ctf-osint-1']);
    setCtfPoints(350);
    setCompletedIncidentIds(['inc-phishing-1', 'inc-bruteforce-1']);
    setSocScore(380);
    setQuizScore(80);
    setQuizzesCompleted(5);
    setPhishingStats({ total: 5, correct: 4 });
    localStorage.clear();
  };

  const areAllModulesCompleted = ALL_MODULE_IDS.every(id => completedModuleIds.includes(id));
  const isCertificateUnlocked = progress.total_score >= 70 || areAllModulesCompleted;

  return (
    <UserProgressContext.Provider value={{
      progress,
      completedChecklistIds,
      completedModuleIds,
      completedSkillIds,
      masteredSkillIds,
      completedLabIds,
      earnedLabXp,
      solvedCtfIds,
      ctfPoints,
      completedIncidentIds,
      socScore,
      toggleChecklistItem,
      recordQuizResult,
      recordPhishingResult,
      markModuleCompleted,
      toggleSkillComplete,
      toggleSkillMastered,
      completeLab,
      solveCtfChallenge,
      completeSocIncident,
      resetProgress,
      isCertificateUnlocked,
      areAllModulesCompleted
    }}>
      {children}
    </UserProgressContext.Provider>
  );
};

export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error('useUserProgress must be used within a UserProgressProvider');
  }
  return context;
};


