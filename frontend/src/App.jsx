import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Chat } from './pages/Chat';

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
        {activeTab !== 'home' && activeTab !== 'dashboard' && activeTab !== 'chat' && (
          <div className="py-16 text-center space-y-4">
            <h2 className="text-xl font-bold text-white capitalize">{activeTab} Page</h2>
            <p className="text-slate-400">Page component building in progress for issue pipeline.</p>
          </div>
        )}
      </main>

      {activeTab !== 'chat' && <Footer />}
    </div>
  );
}
