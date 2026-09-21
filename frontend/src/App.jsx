import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Chat } from './pages/Chat';
import { Companies } from './pages/Companies';
import { Profile } from './pages/Profile';
import { AuthModal } from './components/auth/AuthModal';
import { LogoutModal } from './components/auth/LogoutModal';
import { authService } from './services/authService';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [studentProfile, setStudentProfile] = useState(null);

  useEffect(() => {
    async function initUserSession() {
      const storedUser = authService.getUser();
      if (storedUser && storedUser.email) {
        setStudentProfile(storedUser);
      } else {
        // Strict Unauthenticated state by default (no guest account)
        setStudentProfile(null);
      }
    }
    initUserSession();
  }, []);

  const handleAuthSuccess = (user) => {
    setStudentProfile(user);
    setActiveTab('dashboard');
  };

  const handleUpdateStudentProfile = async (updatedProfile) => {
    setStudentProfile(updatedProfile);
    authService.setUser(updatedProfile);
    try {
      const refreshed = await authService.updateProfile(updatedProfile);
      if (refreshed) {
        setStudentProfile(refreshed);
      }
    } catch (err) {
      console.warn('Profile sync warning:', err);
    }
  };

  const handleLogoutTrigger = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    authService.logout();
    setStudentProfile(null);
    setIsLogoutModalOpen(false);
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
        onLogout={handleLogoutTrigger}
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
            onOpenAuth={handleOpenAuth}
          />
        )}
        {activeTab === 'companies' && (
          <Companies 
            studentProfile={studentProfile} 
            setActiveTab={setActiveTab} 
            onAskAboutCompany={handleAskAboutCompany}
            onOpenAuth={handleOpenAuth}
          />
        )}
        {activeTab === 'profile' && (
          <Profile 
            studentProfile={studentProfile} 
            setStudentProfile={handleUpdateStudentProfile}
            setActiveTab={setActiveTab}
            onOpenAuth={handleOpenAuth}
            onLogout={handleLogoutTrigger}
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

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
}
