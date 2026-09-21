import React, { useState } from 'react';
import { X, Check, Search, User, Lock, Mail, GraduationCap, Award, MapPin, Briefcase, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { authService } from '../../services/authService';

const ALL_SKILLS_CATEGORIZED = {
  "Programming Languages": [
    "Python", "C++", "Java", "JavaScript", "TypeScript", "C", "Go", "Rust", "Kotlin", "Swift", "PHP", "R", "SQL", "MATLAB"
  ],
  "AI, ML & Data Science": [
    "Machine Learning", "Deep Learning", "PyTorch", "TensorFlow", "Scikit-Learn", "Pandas", "NumPy", "OpenCV", 
    "Natural Language Processing (NLP)", "Computer Vision", "Generative AI / LLMs", "PySpark", "RAG Architecture", "HuggingFace"
  ],
  "Web & Mobile Frameworks": [
    "React.js", "Next.js", "Node.js", "Express.js", "Vue.js", "Angular", "Django", "FastAPI", "Flask", 
    "Spring Boot", "React Native", "Flutter", "Tailwind CSS", "HTML5/CSS3"
  ],
  "Cloud, DevOps & Systems": [
    "Docker", "Kubernetes", "AWS", "Google Cloud (GCP)", "Azure", "Git & GitHub", "CI/CD Pipelines", "Linux/Unix", "Nginx", "System Design"
  ],
  "Data Analytics & Databases": [
    "MySQL", "PostgreSQL", "MongoDB", "Redis", "Power BI", "Tableau", "Excel / Advanced Spreadsheets", "Snowflake", "BigQuery", "ETL Pipelines"
  ],
  "Quality & Core Systems": [
    "Software Testing / QA", "Selenium", "Postman API Testing", "Cyber Security", "Data Structures & Algorithms", "Network Security"
  ]
};

const POPULAR_ROLES = [
  "Data Analyst & Analytics",
  "AI / ML Engineer",
  "Software Development Engineer (SDE)",
  "Full Stack Developer",
  "Backend Engineer",
  "DevOps & Cloud Specialist",
  "QA / Test Automation",
  "Cybersecurity Analyst"
];

const POPULAR_LOCATIONS = [
  "Bangalore", "Gurugram", "Noida", "Hyderabad", "Pune", "Mumbai", "Chennai", "Remote"
];

export const AuthModal = ({ isOpen, onClose, onAuthSuccess, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [step, setStep] = useState(1); // Signup steps: 1 to 4
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [skillSearch, setSkillSearch] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rollNumber: '',
    branch: 'Computer Science & Engineering',
    specialization: 'Core Stream / General',
    cgpa: '8.5',
    graduationYear: '2028',
    skills: ['Python', 'SQL', 'Data Analysis'],
    preferredRoles: ['Data Analyst & Analytics'],
    preferredLocations: ['Bangalore', 'Gurugram', 'Remote']
  });

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const toggleSkill = (skillName) => {
    setFormData(prev => {
      const exists = prev.skills.includes(skillName);
      return {
        ...prev,
        skills: exists 
          ? prev.skills.filter(s => s !== skillName)
          : [...prev.skills, skillName]
      };
    });
  };

  const toggleRole = (roleName) => {
    setFormData(prev => {
      const exists = prev.preferredRoles.includes(roleName);
      return {
        ...prev,
        preferredRoles: exists 
          ? prev.preferredRoles.filter(r => r !== roleName)
          : [...prev.preferredRoles, roleName]
      };
    });
  };

  const toggleLocation = (locName) => {
    setFormData(prev => {
      const exists = prev.preferredLocations.includes(locName);
      return {
        ...prev,
        preferredLocations: exists 
          ? prev.preferredLocations.filter(l => l !== locName)
          : [...prev.preferredLocations, locName]
      };
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorMsg('Please provide both email and password.');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await authService.login({
        email: formData.email,
        password: formData.password
      });
      onAuthSuccess(res.user);
      onClose();
    } catch (err) {
      const msg = err.response?.data?.detail 
        || (typeof err.response?.data === 'string' ? err.response.data : null) 
        || err.message 
        || 'Invalid login credentials. Please try again.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (formData.skills.length === 0) {
      setErrorMsg('Please select at least 1 technical skill to build your personalized path.');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      const payload = {
        ...formData,
        cgpa: parseFloat(formData.cgpa) || 8.0,
        graduationYear: parseInt(formData.graduationYear) || 2028
      };
      const res = await authService.register(payload);
      onAuthSuccess(res.user);
      onClose();
    } catch (err) {
      const msg = err.response?.data?.detail 
        || (typeof err.response?.data === 'string' ? err.response.data : null) 
        || err.message 
        || 'Registration failed. Please try again.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-dark-card border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {mode === 'login' ? 'Welcome Back to Career Agent' : 'Create Student Profile'}
              </h3>
              <p className="text-xs text-slate-400">
                {mode === 'login' 
                  ? 'Access your saved campus career insights and match scores'
                  : `Step ${step} of 4: ${step === 1 ? 'Credentials' : step === 2 ? 'Academic Profile' : step === 3 ? 'Skills Selection (50+)' : 'Career Preferences'}`
                }
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-950/40">
          <button
            onClick={() => { setMode('login'); setErrorMsg(''); }}
            className={`flex-1 py-3 text-sm font-semibold text-center transition-colors border-b-2 ${
              mode === 'login' 
                ? 'border-brand-500 text-brand-400 bg-brand-500/10' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => { setMode('signup'); setStep(1); setErrorMsg(''); }}
            className={`flex-1 py-3 text-sm font-semibold text-center transition-colors border-b-2 ${
              mode === 'signup' 
                ? 'border-brand-500 text-brand-400 bg-brand-500/10' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            New Student Sign Up
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="student@campus.edu"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-dark-bg border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-dark-bg border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl text-sm transition-all shadow-glow-sm flex items-center justify-center space-x-2"
            >
              {loading ? <span>Logging in...</span> : <><span>Log In to Account</span><ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        )}

        {/* SIGNUP MULTI-STEP WIZARD */}
        {mode === 'signup' && (
          <div className="p-6">
            
            {/* Step 1: Account Credentials */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Parv Sood"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-dark-bg border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="student@campus.edu"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-dark-bg border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      required
                      placeholder="At least 6 characters"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-dark-bg border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (!formData.name || !formData.email || !formData.password) {
                        setErrorMsg('Please fill in name, email, and password.');
                        return;
                      }
                      setErrorMsg('');
                      setStep(2);
                    }}
                    className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm rounded-xl transition-all flex items-center space-x-2"
                  >
                    <span>Next: Academic Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Academic Profile */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Roll Number *</label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. 2210991234"
                        value={formData.rollNumber}
                        onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-dark-bg border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Graduation Year *</label>
                    <select
                      value={formData.graduationYear}
                      onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                      className="w-full px-4 py-2.5 bg-dark-bg border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                    >
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Branch / Major *</label>
                  <select
                    value={formData.branch}
                    onChange={(e) => handleInputChange('branch', e.target.value)}
                    className="w-full px-4 py-2.5 bg-dark-bg border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Computer Science & Engineering">Computer Science & Engineering (CSE)</option>
                    <option value="Information Technology">Information Technology (IT)</option>
                    <option value="Electronics & Communication Engineering">Electronics & Communication Engineering (ECE)</option>
                    <option value="Electrical Engineering">Electrical Engineering (EE)</option>
                    <option value="Mechanical Engineering">Mechanical Engineering (ME)</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Specialization Track *</label>
                  <select
                    value={formData.specialization}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    className="w-full px-4 py-2.5 bg-dark-bg border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Core Stream / General">Core Stream / General</option>
                    <option value="AI & Machine Learning">AI & Machine Learning (AI/ML)</option>
                    <option value="AI & Future Technologies">AI & Future Technologies</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Current CGPA (0 - 10.0) *</label>
                  <div className="relative">
                    <Award className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      required
                      placeholder="e.g. 8.7"
                      value={formData.cgpa}
                      onChange={(e) => handleInputChange('cgpa', e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-dark-bg border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm rounded-xl transition-all flex items-center space-x-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!formData.rollNumber || !formData.cgpa) {
                        setErrorMsg('Please enter your roll number and current CGPA.');
                        return;
                      }
                      setErrorMsg('');
                      setStep(3);
                    }}
                    className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm rounded-xl transition-all flex items-center space-x-2"
                  >
                    <span>Next: Select Technical Skills (50+)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: 50+ Technical Skills Selection Grid */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-xs font-semibold text-brand-300 bg-brand-500/10 px-3 py-1.5 rounded-lg border border-brand-500/20 w-fit">
                    Selected Skills: <span className="font-bold text-white">{formData.skills.length}</span>
                  </div>

                  {/* Search bar */}
                  <div className="relative flex-1 max-w-xs">
                    <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search 60+ skills..."
                      value={skillSearch}
                      onChange={(e) => setSkillSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-dark-bg border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="max-h-[300px] overflow-y-auto pr-1 space-y-4 custom-scrollbar border border-slate-800 rounded-xl p-3 bg-slate-950/40">
                  {Object.entries(ALL_SKILLS_CATEGORIZED).map(([category, skills]) => {
                    const filteredSkills = skills.filter(s => 
                      s.toLowerCase().includes(skillSearch.toLowerCase())
                    );

                    if (filteredSkills.length === 0) return null;

                    return (
                      <div key={category} className="space-y-2">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800/60 pb-1">
                          {category} ({filteredSkills.length})
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {filteredSkills.map(skill => {
                            const isSelected = formData.skills.includes(skill);
                            return (
                              <button
                                key={skill}
                                type="button"
                                onClick={() => toggleSkill(skill)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 ${
                                  isSelected
                                    ? 'bg-brand-500 text-white shadow-sm ring-1 ring-brand-400'
                                    : 'bg-dark-bg hover:bg-slate-800 text-slate-300 border border-slate-700/80'
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 text-white" />}
                                <span>{skill}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm rounded-xl transition-all flex items-center space-x-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (formData.skills.length === 0) {
                        setErrorMsg('Please select at least 1 skill.');
                        return;
                      }
                      setErrorMsg('');
                      setStep(4);
                    }}
                    className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm rounded-xl transition-all flex items-center space-x-2"
                  >
                    <span>Next: Career Preferences</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Career Preferences & Locations */}
            {step === 4 && (
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center space-x-1.5">
                    <Briefcase className="w-4 h-4 text-brand-400" />
                    <span>Target Job Roles (Select Preferences)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_ROLES.map(role => {
                      const isSelected = formData.preferredRoles.includes(role);
                      return (
                        <button
                          key={role}
                          type="button"
                          onClick={() => toggleRole(role)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-1.5 ${
                            isSelected
                              ? 'bg-indigo-600 text-white ring-1 ring-indigo-400'
                              : 'bg-dark-bg hover:bg-slate-800 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                          <span>{role}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>Preferred Work Locations</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_LOCATIONS.map(loc => {
                      const isSelected = formData.preferredLocations.includes(loc);
                      return (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => toggleLocation(loc)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-1.5 ${
                            isSelected
                              ? 'bg-emerald-600 text-white ring-1 ring-emerald-400'
                              : 'bg-dark-bg hover:bg-slate-800 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                          <span>{loc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 flex justify-between border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm rounded-xl transition-all flex items-center space-x-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-400 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-glow-md transition-all flex items-center space-x-2"
                  >
                    {loading ? <span>Creating Account...</span> : <><span>Complete Registration</span><Check className="w-4 h-4" /></>}
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
