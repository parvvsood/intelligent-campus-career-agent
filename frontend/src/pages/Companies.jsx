import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Building2, 
  MapPin, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  ArrowUpDown
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { CompanyDrawer } from '../components/company/CompanyDrawer';

export const Companies = ({ studentProfile, setActiveTab, onAskAboutCompany }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [minCgpaFilter, setMinCgpaFilter] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState(null);

  const companiesList = [
    {
      id: 'c-1',
      name: 'Deloitte USI',
      role: 'Data Analyst',
      package: '8.5 LPA',
      numericPackage: 8.5,
      cutoff: '6.5 CGPA',
      numericCutoff: 6.5,
      location: 'Pan-India',
      year: '2025 - 2026',
      skills: ['SQL', 'Python', 'Power BI', 'Excel', 'Problem Solving'],
      branches: 'CSE, IT, ECE, AI/DS',
      factRemarks: 'Appeared in placement records for 3 consecutive years (2024-2026) offering 8.5 LPA for Analyst profile.',
      observationRemarks: 'Strong hiring volume for candidates demonstrating SQL query optimization and dashboard design.',
    },
    {
      id: 'c-2',
      name: 'Amazon',
      role: 'Software Development Engineer (SDE-1)',
      package: '18.0 LPA',
      numericPackage: 18.0,
      cutoff: '7.5 CGPA',
      numericCutoff: 7.5,
      location: 'Bangalore / Hyderabad',
      year: '2025 - 2026',
      skills: ['Data Structures', 'Java', 'C++', 'System Design', 'Algorithms'],
      branches: 'CSE, IT, ECE',
      factRemarks: 'Visited campus in 2025 and 2026 with 18.0 LPA package (Base 14.5 LPA + Stocks).',
      observationRemarks: 'Prioritizes deep understanding of tree/graph data structures and dynamic programming.',
    },
    {
      id: 'c-3',
      name: 'ZS Associates',
      role: 'Business Technology Analyst',
      package: '13.5 LPA',
      numericPackage: 13.5,
      cutoff: '7.0 CGPA',
      numericCutoff: 7.0,
      location: 'Gurgaon / Pune',
      year: '2025 - 2026',
      skills: ['Python', 'SQL', 'Guesstimates', 'Case Studies', 'Data Warehousing'],
      branches: 'CSE, IT, ECE, Mech, Civil',
      factRemarks: 'Offered 13.5 LPA CTC for Business Technology Consulting drives in 2025.',
      observationRemarks: 'Combines technical coding assessments with business case interview rounds.',
    },
    {
      id: 'c-4',
      name: 'Microsoft',
      role: 'AI / Software Engineer',
      package: '24.0 LPA',
      numericPackage: 24.0,
      cutoff: '8.0 CGPA',
      numericCutoff: 8.0,
      location: 'Hyderabad / Noida',
      year: '2025',
      skills: ['Python', 'PyTorch', 'C++', 'System Architecture', 'Algorithms'],
      branches: 'CSE, IT, ECE',
      factRemarks: 'Highest tier campus recruiter in 2025 offering 24.0 LPA package.',
      observationRemarks: 'Selects candidates with proven open-source contributions or machine learning projects.',
    },
    {
      id: 'c-5',
      name: 'Accenture',
      role: 'Advanced Application Engineering Analyst',
      package: '6.5 LPA',
      numericPackage: 6.5,
      cutoff: '6.0 CGPA',
      numericCutoff: 6.0,
      location: 'Pan-India',
      year: '2025 - 2026',
      skills: ['Java', 'SQL', 'Web Technologies', 'Agile'],
      branches: 'All Engineering Branches',
      factRemarks: 'Mass recruitment drive hiring across all engineering disciplines with 6.0 CGPA baseline.',
      observationRemarks: 'High hiring conversion for students clearing cognitive & communication assessments.',
    },
    {
      id: 'c-6',
      name: 'Goldman Sachs',
      role: 'Data Engineer & Analyst',
      package: '20.0 LPA',
      numericPackage: 20.0,
      cutoff: '8.0 CGPA',
      numericCutoff: 8.0,
      location: 'Bangalore',
      year: '2026',
      skills: ['Python', 'Spark', 'SQL', 'Distributed Systems', 'Statistics'],
      branches: 'CSE, IT, ECE, Math',
      factRemarks: 'Recruited for Quantitative Engineering and Data Infrastructure roles in 2026.',
      observationRemarks: 'Focuses heavily on probability, statistics, and parallel computing algorithms.',
    },
  ];

  const filteredCompanies = useMemo(() => {
    return companiesList.filter((comp) => {
      const matchesSearch =
        comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesRole =
        selectedRole === 'All' || comp.role.toLowerCase().includes(selectedRole.toLowerCase());

      const matchesCgpa =
        minCgpaFilter === 'All' || comp.numericCutoff <= parseFloat(minCgpaFilter);

      return matchesSearch && matchesRole && matchesCgpa;
    });
  }, [searchQuery, selectedRole, minCgpaFilter]);

  return (
    <div className="space-y-8 py-4">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/30">
          <Building2 className="w-3.5 h-3.5" />
          <span>CAMPUS PLACEMENT KNOWLEDGE BASE</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Company Explorer</h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Discover verified recruiting companies, eligibility criteria, packages, and skills derived from campus placement data.
        </p>
      </div>

      {/* Filter Control Bar */}
      <Card className="space-y-4 bg-dark-surface/90 border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search company, role, or skill (e.g. SQL, Deloitte)..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div>
            <label className="block text-xs font-semibold tracking-wider text-slate-400 uppercase mb-1.5">
              Target Role Domain
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-dark-bg border border-slate-800 text-slate-200 text-sm rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            >
              <option value="All">All Roles</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="AI">AI / ML Engineer</option>
              <option value="Software">Software Engineer (SDE)</option>
              <option value="Analyst">Analyst & Consulting</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-wider text-slate-400 uppercase mb-1.5">
              Maximum CGPA Cutoff
            </label>
            <select
              value={minCgpaFilter}
              onChange={(e) => setMinCgpaFilter(e.target.value)}
              className="w-full bg-dark-bg border border-slate-800 text-slate-200 text-sm rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            >
              <option value="All">Show All Cutoffs</option>
              <option value="6.5">Below 6.5 CGPA</option>
              <option value="7.0">Below 7.0 CGPA</option>
              <option value="7.5">Below 7.5 CGPA</option>
              <option value="8.0">Below 8.0 CGPA</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
          <span>Showing <strong className="text-white">{filteredCompanies.length}</strong> verified recruiters</span>
          {studentProfile && (
            <span>Your CGPA: <strong className="text-emerald-400">{studentProfile.cgpa}</strong></span>
          )}
        </div>
      </Card>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((comp) => {
          const isEligible = studentProfile ? studentProfile.cgpa >= comp.numericCutoff : true;
          return (
            <Card
              key={comp.id}
              hoverEffect
              onClick={() => setSelectedCompany(comp)}
              className="cursor-pointer space-y-4 flex flex-col justify-between group border-slate-800 hover:border-slate-700"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-indigo-700 flex items-center justify-center font-bold text-white shadow-glow-sm">
                      {comp.name[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-white group-hover:text-brand-300 transition-colors">{comp.name}</h3>
                      <p className="text-xs text-slate-400 truncate">{comp.role}</p>
                    </div>
                  </div>
                  <Badge variant="brand">{comp.package}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-dark-bg/60 p-2.5 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Min Cutoff</span>
                    <span className="font-semibold text-slate-200">{comp.cutoff}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Drive Year</span>
                    <span className="font-semibold text-slate-200">{comp.year}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1.5">Target Skills</span>
                  <div className="flex flex-wrap gap-1">
                    {comp.skills.map((skill, idx) => (
                      <span key={idx} className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                {isEligible ? (
                  <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Eligible to apply</span>
                  </span>
                ) : (
                  <span className="text-amber-400 font-semibold flex items-center space-x-1">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Below CGPA cutoff</span>
                  </span>
                )}

                <span className="text-brand-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center space-x-1">
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Drawer */}
      <CompanyDrawer
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
        onAskAboutCompany={(prompt) => {
          setSelectedCompany(null);
          onAskAboutCompany(prompt);
        }}
      />
    </div>
  );
};
