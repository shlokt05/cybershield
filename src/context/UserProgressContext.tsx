import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress } from '../types/database';
import { INITIAL_CHECKLIST_ITEMS } from '../lib/mockData';

interface UserProgressContextType {
  progress: UserProgress;
  completedChecklistIds: string[];
  completedModuleIds: string[];
  toggleChecklistItem: (itemId: string) => void;
  recordQuizResult: (scorePercentage: number) => void;
  recordPhishingResult: (isCorrect: boolean) => void;
  markModuleCompleted: (moduleId: string, scorePercent: number) => void;
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
    localStorage.setItem('cybershield_quiz_score', String(quizScore));
    localStorage.setItem('cybershield_quizzes_completed', String(quizzesCompleted));
    localStorage.setItem('cybershield_phishing_stats', JSON.stringify(phishingStats));
  }, [completedChecklistIds, completedModuleIds, quizScore, quizzesCompleted, phishingStats]);

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

  const resetProgress = () => {
    const defaultIds = INITIAL_CHECKLIST_ITEMS.filter(i => i.is_completed).map(i => i.id);
    setCompletedChecklistIds(defaultIds);
    setCompletedModuleIds(['web-security', 'password-entropy']);
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
      toggleChecklistItem,
      recordQuizResult,
      recordPhishingResult,
      markModuleCompleted,
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
