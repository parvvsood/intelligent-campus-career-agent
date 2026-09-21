import React from 'react';
import { Bot, Sparkles, User, LayoutDashboard, Building2, MessageSquare, Compass, LogIn, LogOut } from 'lucide-react';

export const Header = ({ activeTab, setActiveTab, studentProfile, onOpenAuth, onLogout }) => {
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

        {/* Quick Student Badge / Profile Summary & Auth Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('chat')}
            className="hidden lg:inline-flex items-center space-x-1.5 text-xs bg-brand-500/10 hover:bg-brand-500/20 text-brand-300 px-3 py-1.5 rounded-lg border border-brand-500/30 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-pulse" />
            <span>Ask Career Agent</span>
          </button>

          {studentProfile?.email ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveTab('profile')}
                className="flex items-center space-x-2 bg-dark-card hover:bg-dark-border p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-700/60 transition-all text-xs text-slate-300"
              >
                <div className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-[11px]">
                  {studentProfile.name ? studentProfile.name[0].toUpperCase() : 'S'}
                </div>
                <div className="hidden sm:flex flex-col text-left leading-tight">
                  <span className="font-semibold text-white max-w-[100px] truncate">{studentProfile.name}</span>
                  <span className="text-[10px] text-slate-400">{studentProfile.rollNumber || `CGPA ${studentProfile.cgpa}`}</span>
                </div>
              </button>

              <button
                onClick={onLogout}
                title="Log Out"
                className="p-2 text-slate-400 hover:text-red-400 bg-slate-800/60 hover:bg-slate-800 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-700 transition-all"
              >
                <LogIn className="w-3.5 h-3.5 text-slate-400" />
                <span>Log In</span>
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="flex items-center space-x-1.5 bg-brand-600 hover:bg-brand-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-glow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

