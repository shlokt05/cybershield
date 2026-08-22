import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { UserProgressProvider } from './context/UserProgressContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AuthModal } from './components/auth/AuthModal';

import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ModuleHubPage } from './pages/ModuleHubPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { CodeInsightsPage } from './pages/CodeInsightsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { QuizPage } from './pages/QuizPage';
import { PhishingSimulatorPage } from './pages/PhishingSimulatorPage';
import { PasswordAnalyzerPage } from './pages/PasswordAnalyzerPage';
import { ThreatHubPage } from './pages/ThreatHubPage';
import { ChecklistPage } from './pages/ChecklistPage';
import { LearningPathsPage } from './pages/LearningPathsPage';
import { CertificatePage } from './pages/CertificatePage';
import { TerminalLabPage } from './pages/TerminalLabPage';
import { MiniProjectsPage } from './pages/MiniProjectsPage';

export function AppContent() {
  const [activeTab, setActiveTab] = useState('landing');
  const [selectedModuleId, setSelectedModuleId] = useState('web-security');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleSelectModule = (modId: string) => {
    const coreIds = ['web-security', 'phishing-awareness', 'password-entropy', 'network-security', 'threat-intel'];
    if (coreIds.includes(modId)) {
      setSelectedModuleId(modId);
      setActiveTab('modules');
    } else {
      setActiveTab(modId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070a12] text-slate-100 bg-cyber-grid">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAuthModal={openAuthModal}
      />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'landing' && (
          <LandingPage
            onNavigateToDashboard={() => setActiveTab('dashboard')}
            openAuthModal={openAuthModal}
            onNavigateToCodeInsights={() => setActiveTab('code-insights')}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardPage
            onSelectModule={handleSelectModule}
            onNavigateToCodeInsights={() => setActiveTab('code-insights')}
          />
        )}

        {activeTab === 'modules' && (
          <ModuleHubPage
            initialModuleId={selectedModuleId}
            onNavigateToCertificate={() => setActiveTab('certificate')}
            openAuthModal={openAuthModal}
          />
        )}

        {activeTab === 'admin' && <AdminDashboardPage />}
        {activeTab === 'quiz' && <QuizPage />}
        {activeTab === 'phishing' && <PhishingSimulatorPage />}
        {activeTab === 'password' && <PasswordAnalyzerPage />}
        {activeTab === 'threats' && <ThreatHubPage />}
        {activeTab === 'checklist' && <ChecklistPage />}
        {activeTab === 'code-insights' && <CodeInsightsPage />}
        {activeTab === 'terminal-lab' && <TerminalLabPage />}
        {activeTab === 'mini-projects' && (
          <MiniProjectsPage openAuthModal={(mode) => { setAuthModalMode(mode); setAuthModalOpen(true); }} />
        )}
        {activeTab === 'learning-paths' && (
          <LearningPathsPage
            onSelectModule={handleSelectModule}
            onNavigateToCertificate={() => setActiveTab('certificate')}
          />
        )}
        {activeTab === 'certificate' && <CertificatePage />}
        {activeTab === 'profile' && <ProfilePage />}
        {activeTab === 'settings' && <SettingsPage />}
      </main>

      <Footer />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </div>
  );
}

import { HandbookProvider } from './context/HandbookContext';

export default function App() {
  return (
    <AuthProvider>
      <UserProgressProvider>
        <HandbookProvider>
          <AppContent />
        </HandbookProvider>
      </UserProgressProvider>
    </AuthProvider>
  );
}
