import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Chat } from './pages/Chat';
import { Companies } from './pages/Companies';
import { Profile } from './pages/Profile';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [studentProfile, setStudentProfile] = useState({
    name: 'Alex Student',
    branch: 'Computer Science & Engineering',
    cgpa: 8.7,
    graduationYear: 2026,
    skills: ['Python', 'SQL', 'Data Analysis', 'React', 'Machine Learning'],
    preferredRoles: ['Data Analyst', 'AI/ML Engineer'],
    preferredLocations: ['Bangalore', 'Gurgaon', 'Hyderabad', 'Remote'],
  });

  const handleAskAboutCompany = (promptText) => {
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg text-slate-100 font-sans">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        studentProfile={studentProfile} 
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'home' && <Home setActiveTab={setActiveTab} />}
        {activeTab === 'dashboard' && (
          <Dashboard 
            studentProfile={studentProfile} 
            setActiveTab={setActiveTab} 
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
          />
        )}
      </main>

      {activeTab !== 'chat' && <Footer />}
    </div>
  );
}
