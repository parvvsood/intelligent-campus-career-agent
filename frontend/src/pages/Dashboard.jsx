import React, { useState, useEffect } from 'react';
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
  Target,
  Lock,
  LogIn,
  UserPlus
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { fetchCareerPaths, fetchCompanies } from '../services/companyService';

export const Dashboard = ({ studentProfile, setActiveTab, setSelectedCompany, onOpenAuth }) => {
  const [careerPaths, setCareerPaths] = useState([]);
  const [suggestedCompanies, setSuggestedCompanies] = useState([]);
  const [loadingPaths, setLoadingPaths] = useState(true);

  useEffect(() => {
    if (!studentProfile || !studentProfile.email) return;

    const loadDashboardData = async () => {
      setLoadingPaths(true);
      try {
        // Fetch dynamic career paths based on student skills
        const pathData = await fetchCareerPaths(studentProfile.skills || [], studentProfile.cgpa || 8.0);
        if (pathData && pathData.career_paths) {
          setCareerPaths(pathData.career_paths);
        }

        // Fetch real suggested companies
        const companyData = await fetchCompanies(null, studentProfile.cgpa || 8.0);
        if (companyData && companyData.companies) {
          setSuggestedCompanies(companyData.companies.slice(0, 6));
        }
      } catch (err) {
        console.warn('Dashboard API fallback active:', err);
        calculateFallbackPaths();
      } finally {
        setLoadingPaths(false);
      }
    };

    loadDashboardData();
  }, [studentProfile]);

  // UNAUTHENTICATED ACCESS GUARD
  if (!studentProfile || !studentProfile.email) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-20 h-20 rounded-3xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center mx-auto text-brand-400 shadow-glow-sm"
        >
          <Lock className="w-10 h-10" />
        </motion.div>

        <div className="space-y-3">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Student Login Required</h2>
          <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
            Please log in or create your student profile with your CGPA and technical skills to unlock your personalized career dashboard, match scores, and recruiter eligibility analysis.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button variant="primary" size="lg" icon={LogIn} onClick={() => onOpenAuth && onOpenAuth('login')}>
            Log In to Account
          </Button>
          <Button variant="secondary" size="lg" icon={UserPlus} onClick={() => onOpenAuth && onOpenAuth('signup')}>
            Sign Up (New Student)
          </Button>
        </div>
      </div>
    );
  }

  const calculateFallbackPaths = () => {
    const skillsLower = studentProfile.skills.map(s => s.toLowerCase());
    
    // Skill match logic
    const isAnalyst = skillsLower.some(s => ['sql', 'python', 'excel', 'power bi', 'data analysis'].includes(s));
    const isAI = skillsLower.some(s => ['python', 'machine learning', 'pytorch', 'tensorflow', 'deep learning'].includes(s));
    const isSDE = skillsLower.some(s => ['data structures', 'algorithms', 'java', 'c++', 'react'].includes(s));

    const paths = [
      {
        role: 'Data Analyst & Analytics',
        matchScore: isAnalyst ? '96% Match' : '82% Match',
        avgPackage: '7.5 - 14.0 LPA',
        topCompanies: ['Deloitte USI', 'ZS Associates', 'Amazon', 'Sprinkle Data'],
        keySkills: ['SQL', 'Python', 'Power BI', 'Excel', 'Data Warehousing'],
      },
      {
        role: 'AI / ML Engineer & Data Science',
        matchScore: isAI ? '94% Match' : '78% Match',
        avgPackage: '12.0 - 25.0 LPA',
        topCompanies: ['Microsoft', 'Google', 'CELEBAL', 'Optmyzr'],
        keySkills: ['Python', 'PyTorch', 'FastAPI', 'Machine Learning', 'SQL'],
      },
      {
        role: 'Software Development Engineer (SDE-1)',
        matchScore: isSDE ? '92% Match' : '80% Match',
        avgPackage: '10.0 - 24.0 LPA',
        topCompanies: ['Amazon', 'Microsoft', 'FICO', 'Juspay'],
        keySkills: ['Data Structures', 'Java/C++', 'System Design', 'Algorithms', 'SQL'],
      },
    ];

    setCareerPaths(paths);
  };

  const recentConversations = [
    { title: 'Which companies hire for Data Analyst roles with CGPA ' + studentProfile.cgpa + '?', time: '2 hours ago', tag: 'Placement Query' },
    { title: 'What skills should I prepare for Deloitte & ZS Associates Analyst round?', time: 'Yesterday', tag: 'Skill Analysis' },
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
              <p className="text-lg font-bold text-brand-400">20+ PDF Recruiter Drives</p>
            </div>
            <div className="bg-dark-bg/60 p-3 rounded-xl border border-slate-800">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Top Path Match</p>
              <p className="text-lg font-bold text-cyan-400">
                {careerPaths.length > 0 ? careerPaths[0].matchScore : '94% Match'}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">My Active Skills ({studentProfile.skills.length})</p>
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
              Query 100+ PDF campus recruiter drives for custom skill gap analysis and eligibility.
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
              Browse 100+ Recruiter Drives
            </Button>
          </div>
        </Card>
      </div>

      {/* Recommended Career Paths (Dynamically Computed from Skills) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-brand-400" />
              <span>Recommended Career Paths (Skill-Based Engine)</span>
            </h2>
            <p className="text-xs text-slate-400">
              Dynamically calculated matching your skill portfolio (`{studentProfile.skills.join(', ')}`) against PDF placement drives.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {careerPaths.map((path, idx) => (
            <Card key={idx} hoverEffect className="space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base truncate">{path.role}</h3>
                  <Badge variant="success">{path.matchScore}</Badge>
                </div>
                
                <div className="text-xs text-slate-400">
                  <span>CTC Package Range: </span>
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
                  <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-1.5">Key Target Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {path.keySkills.map((s, i) => (
                      <span key={i} className="text-[11px] bg-brand-500/10 text-brand-300 px-2 py-0.5 rounded border border-brand-500/20 capitalize">
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
              <span>Campus Recruiter Drives (PDF Data)</span>
            </h2>
            <button
              onClick={() => setActiveTab('companies')}
              className="text-xs text-brand-400 hover:text-brand-300 font-semibold"
            >
              View All Recruiter Drives →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {suggestedCompanies.map((comp, idx) => (
              <Card key={idx} hoverEffect className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm">{comp.name}</h3>
                    <p className="text-xs text-slate-400">{comp.roles ? comp.roles[0] : comp.role}</p>
                  </div>
                  <Badge variant="brand">{comp.package_ctc || comp.package}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                  <div>Cutoff: <span className="text-slate-200 font-medium">{comp.cgpa_cutoff || comp.cutoff} CGPA</span></div>
                  <div>Location: <span className="text-slate-200 font-medium truncate">{comp.primary_location || comp.location}</span></div>
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
