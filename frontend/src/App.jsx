import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';

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

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-dark-surface p-8 rounded-2xl border border-slate-800 text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">Intelligent Campus Career Agent</h1>
          <p className="text-slate-400">Design System and Base Layout Shell Initialized.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
