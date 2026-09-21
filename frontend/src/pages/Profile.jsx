import React, { useState } from 'react';
import { User, GraduationCap, Award, MapPin, Briefcase, Plus, X, Save, CheckCircle2, Lock, LogIn, UserPlus, Search, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Badge } from '../components/common/Badge';

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

export const Profile = ({ studentProfile, setStudentProfile, setActiveTab, onOpenAuth, onLogout }) => {
  const [formData, setFormData] = useState(studentProfile ? {
    ...studentProfile,
    skills: studentProfile.skills || [],
    preferredRoles: studentProfile.preferredRoles || [],
    preferredLocations: studentProfile.preferredLocations || []
  } : {});

  const [newSkill, setNewSkill] = useState('');
  const [skillSearch, setSkillSearch] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // UNAUTHENTICATED GUARD
  if (!studentProfile || !studentProfile.email) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400 shadow-glow-sm"
        >
          <Lock className="w-10 h-10" />
        </motion.div>

        <div className="space-y-3">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Academic Profile Locked</h2>
          <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
            You need to be logged in to view and edit your academic background, roll number, CGPA, and technical skills portfolio.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button variant="primary" size="lg" icon={LogIn} onClick={() => onOpenAuth && onOpenAuth('login')}>
            Log In to Account
          </Button>
          <Button variant="secondary" size="lg" icon={UserPlus} onClick={() => onOpenAuth && onOpenAuth('signup')}>
            Sign Up Now
          </Button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'cgpa' ? parseFloat(value) || value : name === 'graduationYear' ? parseInt(value) || value : value,
    }));
  };

  const toggleSkill = (skillName) => {
    setFormData((prev) => {
      const exists = prev.skills.includes(skillName);
      return {
        ...prev,
        skills: exists 
          ? prev.skills.filter((s) => s !== skillName)
          : [...prev.skills, skillName],
      };
    });
  };

  const handleAddCustomSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const toggleRole = (roleName) => {
    setFormData((prev) => {
      const exists = prev.preferredRoles.includes(roleName);
      return {
        ...prev,
        preferredRoles: exists 
          ? prev.preferredRoles.filter((r) => r !== roleName)
          : [...prev.preferredRoles, roleName],
      };
    });
  };

  const toggleLocation = (locName) => {
    setFormData((prev) => {
      const exists = prev.preferredLocations.includes(locName);
      return {
        ...prev,
        preferredLocations: exists 
          ? prev.preferredLocations.filter((l) => l !== locName)
          : [...prev.preferredLocations, locName],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStudentProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/30">
          <User className="w-3.5 h-3.5" />
          <span>STUDENT CAREER PROFILE</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Academic Profile</h1>
        <p className="text-slate-400 text-sm max-w-xl">
          Keep your CGPA, technical skills, and target career preferences up to date for personalized AI recommendations.
        </p>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl text-emerald-400 text-sm font-semibold flex items-center space-x-2 animate-fade-in shadow-glow-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Profile & career preferences saved permanently! AI Agent context refreshed.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal & Academic Information */}
        <Card className="space-y-6 bg-dark-surface/90 border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <GraduationCap className="w-5 h-5 text-brand-400" />
            <span>Academic Background</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
              required
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email || ''}
              onChange={handleInputChange}
              disabled
              className="opacity-70 cursor-not-allowed"
            />

            <Input
              label="Roll Number"
              name="rollNumber"
              value={formData.rollNumber || ''}
              onChange={handleInputChange}
              placeholder="e.g. 2210991234"
              required
            />

            {/* Branch / Department Dropdown */}
            <div>
              <label className="block text-xs font-semibold tracking-wider text-slate-400 uppercase mb-1.5">
                Branch / Major
              </label>
              <select
                name="branch"
                value={formData.branch || 'Computer Science & Engineering'}
                onChange={handleInputChange}
                className="w-full bg-dark-bg/80 border border-slate-800 text-slate-100 text-sm rounded-xl py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering (CSE)</option>
                <option value="Information Technology">Information Technology (IT)</option>
                <option value="Electronics & Communication Engineering">Electronics & Communication Engineering (ECE)</option>
                <option value="Electrical Engineering">Electrical Engineering (EE)</option>
                <option value="Mechanical Engineering">Mechanical Engineering (ME)</option>
                <option value="Civil Engineering">Civil Engineering</option>
              </select>
            </div>

            {/* Specialization Track Dropdown */}
            <div>
              <label className="block text-xs font-semibold tracking-wider text-slate-400 uppercase mb-1.5">
                Specialization Track
              </label>
              <select
                name="specialization"
                value={formData.specialization || 'Core Stream / General'}
                onChange={handleInputChange}
                className="w-full bg-dark-bg/80 border border-slate-800 text-slate-100 text-sm rounded-xl py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              >
                <option value="Core Stream / General">Core Stream / General</option>
                <option value="AI & Machine Learning">AI & Machine Learning (AI/ML)</option>
                <option value="AI & Future Technologies">AI & Future Technologies</option>
              </select>
            </div>

            <Input
              label="Current CGPA (Out of 10.0)"
              name="cgpa"
              type="number"
              step="0.01"
              min="0"
              max="10"
              value={formData.cgpa || ''}
              onChange={handleInputChange}
              required
            />

            {/* Graduation Year Dropdown */}
            <div>
              <label className="block text-xs font-semibold tracking-wider text-slate-400 uppercase mb-1.5">
                Graduation Year
              </label>
              <select
                name="graduationYear"
                value={formData.graduationYear || 2028}
                onChange={handleInputChange}
                className="w-full bg-dark-bg/80 border border-slate-800 text-slate-100 text-sm rounded-xl py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
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
        </Card>

        {/* 50+ Skill Portfolio Grid & Search Selector */}
        <Card className="space-y-6 bg-dark-surface/90 border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Award className="w-5 h-5 text-purple-400" />
              <span>Technical Skill Portfolio</span>
            </h2>
            <div className="text-xs font-semibold text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 w-fit">
              Selected Skills: <span className="font-bold text-white">{formData.skills.length}</span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Selected Skills Chips */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Currently Selected Skills
              </label>
              {formData.skills.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No skills selected yet. Click skills below to add them to your profile.</p>
              ) : (
                <div className="flex flex-wrap gap-2 pt-1">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-1.5 text-xs bg-brand-500/15 text-brand-300 px-3 py-1.5 rounded-xl border border-brand-500/30 font-medium"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:text-red-400 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Interactive Categorized Skill Grid */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <p className="text-xs font-semibold text-slate-300">
                  Select from 50+ Technical Skills (Click to toggle):
                </p>
                {/* Skill Search input */}
                <div className="relative max-w-xs w-full">
                  <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search 50+ skills..."
                    value={skillSearch}
                    onChange={(e) => setSkillSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-dark-bg/80 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="max-h-[280px] overflow-y-auto pr-1 space-y-4 custom-scrollbar border border-slate-800 rounded-xl p-3 bg-slate-950/40">
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
            </div>

            {/* Custom Skill Entry */}
            <div className="flex gap-2 pt-1 max-w-md">
              <Input
                placeholder="Add custom unlisted skill (e.g. PyTorch, Docker)..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={handleAddCustomSkill}
                icon={Plus}
                className="shrink-0"
              >
                Add Skill
              </Button>
            </div>
          </div>
        </Card>

        {/* Target Roles & Locations Selectors */}
        <Card className="space-y-6 bg-dark-surface/90 border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Briefcase className="w-5 h-5 text-indigo-400" />
            <span>Career Preferences & Target Locations</span>
          </h2>

          <div className="space-y-5">
            {/* Job Roles Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase">
                Target Job Roles (Click to Select)
              </label>
              <div className="flex flex-wrap gap-2">
                {POPULAR_ROLES.map((role) => {
                  const isSelected = formData.preferredRoles.includes(role);
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => toggleRole(role)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-1.5 ${
                        isSelected
                          ? 'bg-indigo-600 text-white ring-1 ring-indigo-400 shadow-sm'
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

            {/* Work Locations Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase">
                Preferred Work Locations (Click to Select)
              </label>
              <div className="flex flex-wrap gap-2">
                {POPULAR_LOCATIONS.map((loc) => {
                  const isSelected = formData.preferredLocations.includes(loc);
                  return (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => toggleLocation(loc)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-1.5 ${
                        isSelected
                          ? 'bg-emerald-600 text-white ring-1 ring-emerald-400 shadow-sm'
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
          </div>
        </Card>

        {/* Action Button Footer */}
        <div className="flex items-center justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setActiveTab('dashboard')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            icon={Save}
            className="px-8 shadow-glow-sm"
          >
            Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
