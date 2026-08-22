import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, StudentRegistration } from '../types/database';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string, college_name?: string, state?: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  studentDirectory: StudentRegistration[];
}

const INITIAL_MOCK_STUDENTS: StudentRegistration[] = [
  {
    id: 'usr-101',
    name: 'Shlok Tripathi',
    email: 'shlok.tripathi@college.edu.in',
    college_name: 'Indian Institute of Technology (BHU) Varanasi',
    state: 'Uttar Pradesh',
    role: 'AppSec Engineer Trainee',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    created_at: '2026-08-20T14:30:00Z',
    score: 88,
    completed_modules_count: 5,
    certificate_status: 'Unlocked'
  },
  {
    id: 'usr-102',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@du.ac.in',
    college_name: 'Delhi University (DU)',
    state: 'Delhi',
    role: 'Cybersecurity Student',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    created_at: '2026-08-19T09:15:00Z',
    score: 76,
    completed_modules_count: 4,
    certificate_status: 'Unlocked'
  },
  {
    id: 'usr-103',
    name: 'Ananya Deshmukh',
    email: 'ananya.d@vjti.ac.in',
    college_name: 'VJTI Mumbai',
    state: 'Maharashtra',
    role: 'SOC Analyst Track',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    created_at: '2026-08-18T16:45:00Z',
    score: 82,
    completed_modules_count: 5,
    certificate_status: 'Unlocked'
  },
  {
    id: 'usr-104',
    name: 'Rohan Verma',
    email: 'rohan.verma@aktu.ac.in',
    college_name: 'Dr. A.P.J. Abdul Kalam Technical University',
    state: 'Uttar Pradesh',
    role: 'Ethical Hacking Student',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    created_at: '2026-08-21T11:20:00Z',
    score: 64,
    completed_modules_count: 3,
    certificate_status: 'In Progress'
  },
  {
    id: 'usr-105',
    name: 'Priya Sundaram',
    email: 'priya.s@annauniv.edu',
    college_name: 'Anna University Chennai',
    state: 'Tamil Nadu',
    role: 'Network Security Student',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    created_at: '2026-08-17T08:10:00Z',
    score: 92,
    completed_modules_count: 5,
    certificate_status: 'Unlocked'
  },
  {
    id: 'usr-106',
    name: 'Vikram Mehta',
    email: 'vikram.mehta@bits-pilani.ac.in',
    college_name: 'BITS Pilani',
    state: 'Rajasthan',
    role: 'Bug Bounty Hunter',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    created_at: '2026-08-16T13:00:00Z',
    score: 70,
    completed_modules_count: 4,
    certificate_status: 'Unlocked'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('cybershield_auth_user');
    return saved ? JSON.parse(saved) : INITIAL_MOCK_STUDENTS[0];
  });

  const [studentDirectory, setStudentDirectory] = useState<StudentRegistration[]>(() => {
    const saved = localStorage.getItem('cybershield_student_directory');
    return saved ? JSON.parse(saved) : INITIAL_MOCK_STUDENTS;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('cybershield_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cybershield_auth_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cybershield_student_directory', JSON.stringify(studentDirectory));
  }, [studentDirectory]);

  const login = (email: string, name?: string, college_name?: string, state?: string) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: name || email.split('@')[0],
      email,
      college_name: college_name || 'IIT BHU Varanasi',
      state: state || 'Uttar Pradesh',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      role: 'Cybersecurity Student',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setUser(newUser);

    // Save to Owner Admin Directory
    setStudentDirectory(prev => {
      const exists = prev.some(s => s.email === email);
      if (exists) return prev;
      return [
        {
          ...newUser,
          score: 75,
          completed_modules_count: 2,
          certificate_status: 'In Progress'
        },
        ...prev
      ];
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (user) {
      const updated = { ...user, ...data, updated_at: new Date().toISOString() };
      setUser(updated);

      setStudentDirectory(prev =>
        prev.map(s => (s.id === user.id ? { ...s, ...data } : s))
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateProfile,
        studentDirectory
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
