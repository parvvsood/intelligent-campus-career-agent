import React from 'react';
import { Bot, Sparkles, User, LayoutDashboard, Building2, MessageSquare, Compass } from 'lucide-react';

export const Header = ({ activeTab, setActiveTab, studentProfile }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'chat', label: 'Career Chat', icon: MessageSquare },
    { id: 'companies', label: 'Company Explorer', icon: Building2 },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo Identity */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-700 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-all duration-300">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-base tracking-tight text-white group-hover:text-brand-300 transition-colors">
                CAREER AGENT
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-brand-500/20 text-brand-300 rounded border border-brand-500/30">
                FOUNDRY AI
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider">CAMPUS RECRUITMENT INTELLIGENCE</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-1 bg-dark-bg/80 p-1.5 rounded-xl border border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Student Badge / Profile Summary */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('chat')}
            className="hidden sm:inline-flex items-center space-x-1.5 text-xs bg-brand-500/10 hover:bg-brand-500/20 text-brand-300 px-3 py-1.5 rounded-lg border border-brand-500/30 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-pulse" />
            <span>Ask Career Agent</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className="flex items-center space-x-2 bg-dark-card hover:bg-dark-border p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-700/60 transition-all text-xs text-slate-300"
          >
            <div className="w-6 h-6 rounded-full bg-slate-800 text-brand-400 flex items-center justify-center font-bold text-[11px]">
              {studentProfile?.name ? studentProfile.name[0].toUpperCase() : 'S'}
            </div>
            <span className="hidden sm:inline font-medium">
              {studentProfile?.cgpa ? `CGPA ${studentProfile.cgpa}` : 'Profile'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
