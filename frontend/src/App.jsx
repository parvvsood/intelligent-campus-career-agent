import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Chat } from './pages/Chat';
import { Companies } from './pages/Companies';
import { Profile } from './pages/Profile';
import { AuthModal } from './components/auth/AuthModal';
import { authService } from './services/authService';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const [studentProfile, setStudentProfile] = useState({
    name: '',
    email: '',
    rollNumber: '',
    branch: 'Computer Science & Engineering',
    cgpa: 8.5,
    graduationYear: 2026,
    skills: ['Python', 'SQL', 'Data Analysis', 'React', 'Machine Learning'],
    preferredRoles: ['Data Analyst & Analytics', 'AI / ML Engineer'],
    preferredLocations: ['Bangalore', 'Gurugram', 'Remote'],
  });

  useEffect(() => {
    async function initUserSession() {
      const storedUser = authService.getUser();
      if (storedUser) {
        setStudentProfile(storedUser);
      } else {
        // Fallback default profile if not logged in
        setStudentProfile({
          name: 'Alex Student',
          email: 'alex@campus.edu',
          rollNumber: '2210991001',
          branch: 'Computer Science & Engineering',
          cgpa: 8.7,
          graduationYear: 2026,
          skills: ['Python', 'SQL', 'Data Analysis', 'React', 'Machine Learning'],
          preferredRoles: ['Data Analyst & Analytics', 'AI / ML Engineer'],
          preferredLocations: ['Bangalore', 'Gurugram', 'Hyderabad', 'Remote'],
        });
      }
    }
    initUserSession();
  }, []);

  const handleAuthSuccess = (user) => {
    setStudentProfile(user);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    authService.logout();
    setStudentProfile({
      name: 'Guest Student',
      email: '',
      rollNumber: '',
      branch: 'Computer Science & Engineering',
      cgpa: 8.0,
      graduationYear: 2026,
      skills: ['Python', 'SQL'],
      preferredRoles: ['Software Development Engineer (SDE)'],
      preferredLocations: ['Bangalore'],
    });
    setActiveTab('home');
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleAskAboutCompany = (promptText) => {
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg text-slate-100 font-sans">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        studentProfile={studentProfile}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'home' && (
          <Home 
            setActiveTab={setActiveTab} 
            onOpenAuth={handleOpenAuth}
            studentProfile={studentProfile}
          />
        )}
        {activeTab === 'dashboard' && (
          <Dashboard 
            studentProfile={studentProfile} 
            setActiveTab={setActiveTab} 
            onOpenAuth={handleOpenAuth}
          />
        )}
        {activeTab === 'chat' && (
          <Chat 
            studentProfile={studentProfile} 
          />
        )}
        {activeTab === 'companies' && (
          <Companies 
            studentProfile={studentProfile} 
            setActiveTab={setActiveTab} 
            onAskAboutCompany={handleAskAboutCompany}
          />
        )}
        {activeTab === 'profile' && (
          <Profile 
            studentProfile={studentProfile} 
            setStudentProfile={setStudentProfile}
            setActiveTab={setActiveTab}
            onOpenAuth={handleOpenAuth}
            onLogout={handleLogout}
          />
        )}
      </main>

      {activeTab !== 'chat' && <Footer />}

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authMode}
      />
    </div>
  );
}
