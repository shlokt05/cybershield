export type RatingCategory = 'High Risk' | 'Needs Improvement' | 'Good' | 'Strong';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  college_name?: string;
  state?: string;
  role?: string;
  avatar?: string;
  created_at: string;
  updated_at?: string;
}

export interface StudentRegistration extends UserProfile {
  score: number;
  completed_modules_count: number;
  certificate_status: 'Unlocked' | 'In Progress';
}

export interface UserProgress {
  id: string;
  user_id: string;
  total_score: number;
  quiz_score: number;
  phishing_score: number;
  security_hygiene_score: number;
  learning_progress: number;
  quizzes_completed: number;
  phishing_completed: number;
  checklist_items_completed: number;
  rating_category: RatingCategory;
  last_updated: string;
}

export interface SecurityChecklistItem {
  id: string;
  user_id?: string;
  title: string;
  category: 'Account Security' | 'Device Security' | 'Network Security' | 'Data Privacy' | 'Email Security';
  description: string;
  is_completed: boolean;
  created_at?: string;
}

export interface PhishingScenario {
  id: string;
  type: string;
  title: string;
  sender_info: string;
  target_role: string;
  content_preview: string;
  is_phishing: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  red_flags: string[];
  explanation: string;
}

export interface ThreatArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  impact_level: 'Low' | 'Medium' | 'High' | 'Critical';
  target_audience: string;
  full_text: string;
  prevention_steps: string[];
  created_at: string;
}

export interface CodeSecurityInsight {
  id: string;
  title: string;
  vulnerability_name?: string;
  cwe_owasp: string;
  language: string;
  vulnerable_code: string;
  secure_code: string;
  explanation: string;
  real_world_context: string;
}
