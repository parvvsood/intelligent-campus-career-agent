import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  GraduationCap, 
  Award, 
  Building2, 
  Sparkles, 
  MessageSquare, 
  TrendingUp, 
  CheckCircle2, 
  ChevronRight,
  BookOpen,
  Briefcase,
  Target
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const Dashboard = ({ studentProfile, setActiveTab, setSelectedCompany }) => {
  const recommendedPaths = [
    {
      role: 'Data Analyst',
      matchScore: '96% Match',
      avgPackage: '8.5 - 14 LPA',
      topCompanies: ['Deloitte', 'Amazon', 'Accenture', 'ZS Associates'],
      keySkills: ['SQL', 'Python', 'Power BI', 'Excel', 'Statistics'],
    },
    {
      role: 'AI / ML Engineer',
      matchScore: '92% Match',
      avgPackage: '12 - 22 LPA',
      topCompanies: ['Microsoft', 'Amazon', 'NVIDIA', 'Goldman Sachs'],
      keySkills: ['Python', 'PyTorch', 'FastAPI', 'Machine Learning', 'Data Pipelines'],
    },
    {
      role: 'Software Development Engineer (SDE)',
      matchScore: '88% Match',
      avgPackage: '10 - 18 LPA',
      topCompanies: ['Amazon', 'Flipkart', 'Cisco', 'Infosys Specialist'],
      keySkills: ['Data Structures', 'Java/C++', 'System Design', 'Git', 'REST API'],
    },
  ];

  const suggestedCompanies = [
    { name: 'Deloitte USI', role: 'Data Analyst', package: '8.5 LPA', cutoff: '6.5 CGPA', location: 'Pan-India', status: 'Eligible' },
    { name: 'Amazon', role: 'SDE-1 & Data Engineer', package: '18.0 LPA', cutoff: '7.5 CGPA', location: 'Bangalore / Hyderabad', status: 'Eligible' },
    { name: 'ZS Associates', role: 'Business Technology Analyst', package: '13.5 LPA', cutoff: '7.0 CGPA', location: 'Gurgaon / Pune', status: 'Eligible' },
    { name: 'Microsoft', role: 'Software Engineer', package: '24.0 LPA', cutoff: '8.0 CGPA', location: 'Hyderabad / Noida', status: 'Eligible' },
  ];

  const recentConversations = [
    { title: 'Which companies hire for Data Analyst roles with CGPA 8.5?', time: '2 hours ago', tag: 'Placement Query' },
    { title: 'What skills should I prepare for Deloitte Analyst round?', time: 'Yesterday', tag: 'Skill Analysis' },
    { title: 'Provide a 4-week study plan for Python and SQL', time: '3 days ago', tag: 'Study Plan' },
  ];

  return (
    <div className="space-y-8 py-4">
      {/* Top Banner & Profile Header */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        {/* Student Profile Card */}
        <Card glass className="flex-1 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-700 flex items-center justify-center font-extrabold text-xl text-white shadow-glow-sm">
                {studentProfile.name ? studentProfile.name[0].toUpperCase() : 'S'}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-bold text-white">{studentProfile.name}</h1>
                  <Badge variant="brand">Batch {studentProfile.graduationYear}</Badge>
                </div>
                <p className="text-xs text-slate-400 font-medium">{studentProfile.branch}</p>
              </div>
            </div>

            <Button size="sm" variant="outline" icon={User} onClick={() => setActiveTab('profile')}>
              Edit Profile
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
            <div className="bg-dark-bg/60 p-3 rounded-xl border border-slate-800">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Current CGPA</p>
              <p className="text-lg font-bold text-emerald-400">{studentProfile.cgpa} / 10</p>
            </div>
            <div className="bg-dark-bg/60 p-3 rounded-xl border border-slate-800">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Target Roles</p>
              <p className="text-sm font-semibold text-slate-200 truncate">{studentProfile.preferredRoles.join(', ')}</p>
            </div>
            <div className="bg-dark-bg/60 p-3 rounded-xl border border-slate-800">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Eligible Companies</p>
              <p className="text-lg font-bold text-brand-400">18+ Campus Drives</p>
            </div>
            <div className="bg-dark-bg/60 p-3 rounded-xl border border-slate-800">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Skill Match</p>
              <p className="text-lg font-bold text-cyan-400">92% Ready</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">My Active Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {studentProfile.skills.map((skill, index) => (
                <span key={index} className="text-xs bg-slate-800/80 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700/60 font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Quick Agent Actions Card */}
        <Card className="w-full lg:w-80 flex flex-col justify-between space-y-4 bg-gradient-to-b from-dark-surface to-dark-card border-brand-500/20">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-brand-400 font-bold text-sm">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Career Agent Actions</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instantly query your placement knowledge base for custom insights and preparation roadmap.
            </p>
          </div>

          <div className="space-y-2">
            <Button
              variant="primary"
              size="md"
              icon={MessageSquare}
              onClick={() => setActiveTab('chat')}
              className="w-full justify-start text-xs"
            >
              Start New Career Chat
            </Button>

            <Button
              variant="secondary"
              size="md"
              icon={Target}
              onClick={() => setActiveTab('chat')}
              className="w-full justify-start text-xs"
            >
              Analyze Skill Gap for Roles
            </Button>

            <Button
              variant="outline"
              size="md"
              icon={Building2}
              onClick={() => setActiveTab('companies')}
              className="w-full justify-start text-xs"
            >
              Browse Campus Companies
            </Button>
          </div>
        </Card>
      </div>

      {/* Recommended Career Paths */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-brand-400" />
              <span>Recommended Career Paths</span>
            </h2>
            <p className="text-xs text-slate-400">Based on your CGPA ({studentProfile.cgpa}) and skill portfolio.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedPaths.map((path, idx) => (
            <Card key={idx} hoverEffect className="space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">{path.role}</h3>
                  <Badge variant="success">{path.matchScore}</Badge>
                </div>
                
                <div className="text-xs text-slate-400">
                  <span>Avg Package: </span>
                  <span className="font-semibold text-emerald-400">{path.avgPackage}</span>
                </div>

                <div>
                  <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-1.5">Top Hiring Recruiters</p>
                  <div className="flex flex-wrap gap-1">
                    {path.topCompanies.map((c, i) => (
                      <span key={i} className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-1.5">Key Required Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {path.keySkills.map((s, i) => (
                      <span key={i} className="text-[11px] bg-brand-500/10 text-brand-300 px-2 py-0.5 rounded border border-brand-500/20">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <Button
                  variant="ghost"
                  size="sm"
                  icon={ChevronRight}
                  onClick={() => setActiveTab('chat')}
                  className="w-full justify-between text-xs text-brand-400 hover:text-brand-300"
                >
                  <span>Ask Agent for Preparation Plan</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Suggested Eligible Companies Grid & Recent Conversations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Suggested Companies (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-indigo-400" />
              <span>Suggested Recruiting Companies</span>
            </h2>
            <button
              onClick={() => setActiveTab('companies')}
              className="text-xs text-brand-400 hover:text-brand-300 font-semibold"
            >
              View All 20+ Companies →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {suggestedCompanies.map((comp, idx) => (
              <Card key={idx} hoverEffect className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm">{comp.name}</h3>
                    <p className="text-xs text-slate-400">{comp.role}</p>
                  </div>
                  <Badge variant="brand">{comp.package}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                  <div>Cutoff: <span className="text-slate-200 font-medium">{comp.cutoff}</span></div>
                  <div>Location: <span className="text-slate-200 font-medium truncate">{comp.location}</span></div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Eligible for drive</span>
                  </span>
                  <button
                    onClick={() => setActiveTab('companies')}
                    className="text-xs text-brand-400 hover:underline font-medium"
                  >
                    View details
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Conversations Sidebar (1 col) */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-purple-400" />
            <span>Recent Conversations</span>
          </h2>

          <Card className="space-y-3">
            {recentConversations.map((conv, idx) => (
              <div
                key={idx}
                onClick={() => setActiveTab('chat')}
                className="p-3 rounded-xl bg-dark-bg/70 hover:bg-slate-800/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <Badge variant="neutral">{conv.tag}</Badge>
                  <span className="text-slate-400">{conv.time}</span>
                </div>
                <p className="text-xs font-medium text-slate-200 line-clamp-2">{conv.title}</p>
              </div>
            ))}

            <Button
              variant="secondary"
              size="sm"
              icon={Sparkles}
              onClick={() => setActiveTab('chat')}
              className="w-full text-xs"
            >
              Open AI Career Chat
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
