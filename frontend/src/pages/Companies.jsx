import React, { useState, useEffect, useMemo } from 'react';
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
  ArrowUpDown,
  RefreshCw
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { CompanyDrawer } from '../components/company/CompanyDrawer';
import { fetchCompanies } from '../services/companyService';

const ALL_PDF_COMPANIES = [
  {"id": "sprinkle-data", "name": "Sprinkle Data", "date": "2023-03-17", "role": "Data Analyst", "location": "Bangalore", "package": "7.5 LPA", "cutoff": "6.5 CGPA", "numericCutoff": 6.5, "skills": ["SQL", "Python", "Data Analysis", "ETL"], "factRemarks": "Data Analyst role offering 7.5 LPA fixed CTC in Bangalore.", "observationRemarks": "Requires strong SQL JOINs and Python data manipulation."},
  {"id": "iztri", "name": "Iztri", "date": "2023-03-17", "role": "Front end Developer", "location": "Bangalore", "package": "6.0 LPA", "cutoff": "6.0 CGPA", "numericCutoff": 6.0, "skills": ["React", "JavaScript", "HTML/CSS", "Tailwind"], "factRemarks": "2024 Startup with 10hr work environment hiring Front end Developers.", "observationRemarks": "Evaluates React component state management and UI responsiveness."},
  {"id": "jpmorgan-chase", "name": "JP Morgan Chase", "date": "2024-03-24", "role": "Software Engineering Program", "location": "Bangalore, Mumbai", "package": "19.75 LPA", "cutoff": "8.5 CGPA", "numericCutoff": 8.5, "skills": ["Data Structures", "Algorithms", "Java", "Python", "SQL"], "factRemarks": "CodeForGood Hackathon hiring drive with Above 8.5 CGPA sorting. 19.75 LPA CTC + 75k/month stipend.", "observationRemarks": "Hackathon performance + CGPA above 8.5 guarantees top shortlisting."},
  {"id": "microsoft", "name": "Microsoft", "date": "2024-08-23", "role": "Software Engineer (SEFA Program)", "location": "Bangalore, Hyderabad", "package": "50.0 LPA", "cutoff": "8.5 CGPA", "numericCutoff": 8.5, "skills": ["Data Structures", "Algorithms", "C++", "System Design"], "factRemarks": "Top 100 CGPA Sorted (Batch 22 - Above 9.4). Offered 50.0 LPA CTC + 125k/month stipend.", "observationRemarks": "High CGPA cutoffs; technical rounds focus on tree/graph DSA problems."},
  {"id": "uipath", "name": "UiPath", "date": "2024-08-23", "role": "Summer Internship - RPA", "location": "Bangalore", "package": "25.0 LPA", "cutoff": "7.5 CGPA", "numericCutoff": 7.5, "skills": ["Python", "C#", "Automation", "Data Structures"], "factRemarks": "Exclusively open for female students offering 25.0 LPA + 150k/month stipend.", "observationRemarks": "Very tough technical problem solving questions."},
  {"id": "google", "name": "Google", "date": "2024-09-28", "role": "Summer Internship - Wintern", "location": "Bangalore, Hyderabad", "package": "43.0 LPA", "cutoff": "8.0 CGPA", "numericCutoff": 8.0, "skills": ["Data Structures", "Algorithms", "C++", "Python"], "factRemarks": "Google Girl Diversity Hiring program offering 43.0 LPA CTC + 89k/month stipend.", "observationRemarks": "Evaluates optimal time/space complexity algorithmic problem solving."},
  {"id": "servicenow", "name": "ServiceNow", "date": "2024-11-15", "role": "Associate Software Engineer", "location": "Hyderabad, Gurugram", "package": "15.0 LPA", "cutoff": "7.5 CGPA", "numericCutoff": 7.5, "skills": ["Java", "JavaScript", "Cloud Architecture", "Data Structures"], "factRemarks": "Hired female candidates for Associate Software Engineer roles at 15.0 LPA CTC + 40k/month stipend.", "observationRemarks": "High emphasis on OOP concepts, data structures, and web technologies."},
  {"id": "fico", "name": "FICO", "date": "2025-01-15", "role": "Devops / SRE / Cloud Developer", "location": "Bangalore", "package": "11.2 LPA", "cutoff": "7.0 CGPA", "numericCutoff": 7.0, "skills": ["DevOps", "Docker", "Kubernetes", "Python", "Linux"], "factRemarks": "Visited campus 6 times across Devops, Cloud, and SRE profiles offering 11.2 LPA CTC.", "observationRemarks": "Selection based on time submission in Virtual Open Book OA."},
  {"id": "orange-business", "name": "Orange Business", "date": "2025-01-15", "role": "Software Engineer Intern", "location": "Gurugram", "package": "9.0 LPA", "cutoff": "7.0 CGPA", "numericCutoff": 7.0, "skills": ["Networking", "Python", "Java", "Linux"], "factRemarks": "Came to campus 2 months after releasing forms. Easy interview process at 9.0 LPA.", "observationRemarks": "Focuses on computer networking, basic puzzles, and core OOP."},
  {"id": "playsimple-games", "name": "PlaySimple Games", "date": "2025-01-15", "role": "Associate Software Engineer / Analyst", "location": "Bangalore", "package": "8.0 LPA", "cutoff": "7.0 CGPA", "numericCutoff": 7.0, "skills": ["C++", "Data Structures", "SQL", "Python"], "factRemarks": "Shortlisted based on 10th and 12th Board marks (80%+ both). Offered 8.0 LPA.", "observationRemarks": "Tough technical interview rounds evaluating algorithmic logic."},
  {"id": "optmyzr", "name": "Optmyzr", "date": "2025-01-17", "role": "Software Development Engineer", "location": "Hyderabad", "package": "14.0 LPA", "cutoff": "7.5 CGPA", "numericCutoff": 7.5, "skills": ["Python", "JavaScript", "Selenium", "Data Structures"], "factRemarks": "Hired for SDE and SDE Testing roles offering 14.0 LPA CTC + 40k/month stipend.", "observationRemarks": "Evaluates full-stack web concepts and automated test frameworks."},
  {"id": "neilsen", "name": "Neilsen", "date": "2025-01-18", "role": "Software Engineer Intern", "location": "Bangalore", "package": "8.5 LPA", "cutoff": "7.0 CGPA", "numericCutoff": 7.0, "skills": ["SQL", "Python", "Data Analysis", "ETL"], "factRemarks": "Shortlisted based on 10th & 12th Boards (85%+ average). Offered 8.5 LPA.", "observationRemarks": "Enforces strict high school board percentage cutoffs."},
  {"id": "invoice-cloud", "name": "Invoice Cloud", "date": "2025-01-21", "role": "Trainee Software Engineer", "location": "Hyderabad", "package": "7.5 LPA", "cutoff": "6.5 CGPA", "numericCutoff": 6.5, "skills": ["C#", ".NET", "SQL", "REST APIs"], "factRemarks": "Development-focused hiring drive offering 7.5 LPA CTC.", "observationRemarks": "Evaluates web framework development and relational database management."},
  {"id": "otipy", "name": "Otipy (Crofarm)", "date": "2025-01-23", "role": "Software Developer Intern", "location": "Gurugram", "package": "7.0 LPA", "cutoff": "7.0 CGPA", "numericCutoff": 7.0, "skills": ["Node.js", "Python", "React", "MongoDB"], "factRemarks": "Shortlisted based on 10th & 12th Boards (90%+ average). Offered 7.0 LPA.", "observationRemarks": "Requires solid full-stack JavaScript skills and API design."},
  {"id": "juspay", "name": "Juspay", "date": "2025-01-23", "role": "Software Developer Engineering / Product", "location": "Bangalore", "package": "27.0 LPA", "cutoff": "8.0 CGPA", "numericCutoff": 8.0, "skills": ["Functional Programming", "Haskell", "Data Structures", "C++"], "factRemarks": "One of the toughest campus recruiters. Offered 27.0 LPA CTC + 40k stipend.", "observationRemarks": "Selection relies heavily on functional programming and algorithmic puzzles."},
  {"id": "telaverge", "name": "Telaverge Communications", "date": "2025-01-24", "role": "Software Engineer - R&D", "location": "Bangalore", "package": "12.6 LPA", "cutoff": "7.5 CGPA", "numericCutoff": 7.5, "skills": ["C++", "Python", "Networking Protocols", "Linux"], "factRemarks": "Evaluated candidates strictly based on self-built technical projects at 12.6 LPA.", "observationRemarks": "Networking and low-level socket projects give a strong advantage."},
  {"id": "wissen-tech", "name": "Wissen Technology", "date": "2025-01-26", "role": "Tech Intern / Java Developer", "location": "Bangalore, Hyderabad", "package": "12.6 LPA", "cutoff": "7.5 CGPA", "numericCutoff": 7.5, "skills": ["Java", "Multithreading", "Data Structures", "SQL"], "factRemarks": "Coding assessment conducted on pen and paper. Offered 12.6 LPA CTC.", "observationRemarks": "Evaluates manual code syntax writing without IDE and Java concurrency."},
  {"id": "samsung-em", "name": "Samsung Electro Mechanics", "date": "2025-02-10", "role": "Machine Learning / C# .Net / UI/UX / Quality", "location": "Bangalore", "package": "11.5 LPA", "cutoff": "7.0 CGPA", "numericCutoff": 7.0, "skills": ["Python", "C#", "C++", "Machine Learning", "WPF"], "factRemarks": "Visited campus 3 times hiring across ML, Full Stack, UI/UX at 11.5 LPA.", "observationRemarks": "Requires minimum Employability Test score of 150+ for shortlisting."},
  {"id": "bajaj-finserv", "name": "Bajaj Finserv", "date": "2025-02-13", "role": "Full Stack & Salesforce Developer", "location": "Pune, Bangalore", "package": "12.0 LPA", "cutoff": "7.0 CGPA", "numericCutoff": 7.0, "skills": ["Java", "Salesforce Apex", "LWC", "Full Stack"], "factRemarks": "Hackathon-based selection offering 12.0 LPA CTC + 35k/month stipend.", "observationRemarks": "Evaluates Salesforce platform customization and Java web dev."},
  {"id": "salescode-ai", "name": "SalesCode.ai", "date": "2025-02-28", "role": "Software Engineer Trainee / Business Analyst", "location": "Gurugram", "package": "10.0 LPA", "cutoff": "7.0 CGPA", "numericCutoff": 7.0, "skills": ["Python", "Machine Learning", "SQL", "React", "Node.js"], "factRemarks": "Recruited 10+ students across SDE, Business Analyst, and QA Trainee roles.", "observationRemarks": "Focuses on AI application architecture and rapid product prototyping."},
  {"id": "dbs-tech", "name": "DBS Tech India", "date": "2025-03-18", "role": "Apprenticeship Program / Full Stack", "location": "Hyderabad", "package": "14.0 LPA", "cutoff": "7.5 CGPA", "numericCutoff": 7.5, "skills": ["Java", "Spring Boot", "React", "Microservices"], "factRemarks": "8-month WFH internship with stipend scaling to 36k, converting to 14.0 LPA.", "observationRemarks": "Evaluates enterprise Java microservices and modern frontend frameworks."},
  {"id": "deloitte-usi", "name": "Deloitte USI", "date": "2025-08-21", "role": "Data Analyst / Analyst - Business Tech", "location": "Pan-India (Hyderabad, Gurgaon, Bangalore)", "package": "8.5 LPA", "cutoff": "6.5 CGPA", "numericCutoff": 6.5, "skills": ["SQL", "Python", "Power BI", "Excel", "Data Modeling"], "factRemarks": "Visited campus 3 consecutive cycles offering fixed 7.5 LPA + 1.0 LPA bonus.", "observationRemarks": "High conversion for proficiency in SQL JOINs and Power BI dashboards."},
  {"id": "coders-brain", "name": "Coders Brain", "date": "2025-12-18", "role": "Data Engineer (Python / Databricks / PySpark)", "location": "Noida", "package": "10.0 LPA", "cutoff": "7.0 CGPA", "numericCutoff": 7.0, "skills": ["Python", "Databricks", "PySpark", "Azure Data Lake"], "factRemarks": "Recruited for specialized Cloud Data Engineering roles at 10.0 LPA.", "observationRemarks": "Requires strong PySpark dataframe manipulation and Azure ETL pipelines."},
  {"id": "flipkart", "name": "Flipkart", "date": "2025-11-18", "role": "Infosec Intern / Software Engineer", "location": "Bangalore", "package": "18.0 LPA", "cutoff": "8.0 CGPA", "numericCutoff": 8.0, "skills": ["Cybersecurity", "Network Security", "Python", "C++"], "factRemarks": "Recruited Infosec Interns offering 18.0 LPA CTC under hybrid working model.", "observationRemarks": "Focuses on security vulnerability assessment and secure coding."},
  {"id": "purestorage", "name": "PureStorage", "date": "2025-12-03", "role": "Deal Analysis Automation Intern", "location": "Hyderabad, Bangalore", "package": "14.0 LPA", "cutoff": "7.5 CGPA", "numericCutoff": 7.5, "skills": ["Python", "Salesforce API", "Excel VBA", "SQL"], "factRemarks": "Hired for Deal Analysis Automation Intern integrating Salesforce and Excel at 14.0 LPA.", "observationRemarks": "Requires analytical modeling and REST API integration skills."},
  {"id": "morgan-stanley", "name": "Morgan Stanley", "date": "2025-04-24", "role": "Cyber Track Apprenticeship Program", "location": "Bangalore, Mumbai", "package": "16.0 LPA", "cutoff": "8.0 CGPA", "numericCutoff": 8.0, "skills": ["Cybersecurity", "C++", "Java", "Linux Internals"], "factRemarks": "Recruited for Cyber Track Apprenticeship Program offering 16.0 LPA.", "observationRemarks": "Requires deep understanding of OS, network security, and C++/Java DSA."},
  {"id": "blinkit", "name": "Blinkit (Zomato)", "date": "2025-05-30", "role": "Business Analyst Intern", "location": "Gurugram, Punjab", "package": "12.0 LPA", "cutoff": "7.5 CGPA", "numericCutoff": 7.5, "skills": ["SQL", "Python", "Data Analytics", "Excel"], "factRemarks": "Offered 12.0 LPA CTC for Business Analyst Interns in Gurugram.", "observationRemarks": "Evaluates delivery optimization metrics and SQL data extraction."},
  {"id": "myntra", "name": "Myntra", "date": "2025-05-01", "role": "Software Developer Interns", "location": "Bangalore", "package": "18.0 LPA", "cutoff": "8.0 CGPA", "numericCutoff": 8.0, "skills": ["Data Structures", "Algorithms", "Java", "React"], "factRemarks": "Pool hiring drive with strict college filtering. Offered 18.0 LPA CTC.", "observationRemarks": "High bar for data structures and scalable web architecture."},
  {"id": "rippling", "name": "Rippling", "date": "2025-03-05", "role": "Frontend Role", "location": "Bangalore", "package": "30.0 LPA", "cutoff": "8.5 CGPA", "numericCutoff": 8.5, "skills": ["React", "TypeScript", "JavaScript ES6+", "Data Structures"], "factRemarks": "Internship-to-FTE drive offering 30.0 LPA CTC.", "observationRemarks": "Evaluates production-grade React UI construction and state management."},
  {"id": "codenation", "name": "CodeNation", "date": "2025-05-21", "role": "Software Development Engineer", "location": "Remote / Bangalore", "package": "35.0 LPA", "cutoff": "8.5 CGPA", "numericCutoff": 8.5, "skills": ["Competitive Programming", "C++", "Data Structures"], "factRemarks": "Premier algorithmic tech recruiter offering 35.0 LPA CTC for SDEs.", "observationRemarks": "Requires elite competitive programming ability."},
  {"id": "autodesk", "name": "Autodesk", "date": "2025-05-23", "role": "Software Development Engineer (SDE)", "location": "Bangalore, Pune", "package": "22.0 LPA", "cutoff": "8.0 CGPA", "numericCutoff": 8.0, "skills": ["C++", "Data Structures", "Dynamic Programming"], "factRemarks": "Offered 22.0 LPA CTC for SDE roles in Bangalore and Pune.", "observationRemarks": "Interviews test core DSA with emphasis on memoization."},
  {"id": "eightfold-ai", "name": "Eightfold AI", "date": "2025-10-29", "role": "Agentic AI - Engineering Intern", "location": "Bangalore, Noida", "package": "16.0 LPA", "cutoff": "8.0 CGPA", "numericCutoff": 8.0, "skills": ["Agentic AI", "Python", "LLMs", "FastAPI"], "factRemarks": "Hired for Agentic AI and Engineering Intern roles offering 16.0 LPA.", "observationRemarks": "Prioritizes practical experience building agentic workflows and LLMs."},
  {"id": "goldman-sachs", "name": "Goldman Sachs", "date": "2025-08-14", "role": "Quantitative Analyst / Data Engineer", "location": "Bangalore", "package": "20.0 LPA", "cutoff": "8.0 CGPA", "numericCutoff": 8.0, "skills": ["Python", "C++", "SQL", "Spark", "Probability"], "factRemarks": "Goldman Sachs offered 20.0 LPA for Quantitative Engineering.", "observationRemarks": "Requires mathematical problem solving and low-latency C++/Python."},
  {"id": "zs-associates", "name": "ZS Associates", "date": "2025-03-04", "role": "Business Technology Analyst", "location": "Gurgaon, Pune", "package": "13.5 LPA", "cutoff": "7.0 CGPA", "numericCutoff": 7.0, "skills": ["Python", "SQL", "Guesstimates", "Case Studies"], "factRemarks": "Offered 13.5 LPA CTC for Business Tech Consulting drives.", "observationRemarks": "Combines technical SQL assessment with guesstimate interviews."},
  {"id": "accenture", "name": "Accenture", "date": "2025-09-10", "role": "Advanced Associate Software Engineer", "location": "PAN India", "package": "6.5 LPA", "cutoff": "6.0 CGPA", "numericCutoff": 6.0, "skills": ["Java", "SQL", "HTML/CSS/JS", "Agile"], "factRemarks": "Mass recruitment drive hiring 120+ students across engineering streams.", "observationRemarks": "Baseline CGPA cutoff allows wide participation."},
  {"id": "tcs-nqt", "name": "TCS NQT", "date": "2025-10-14", "role": "Prime / Digital / Ninja", "location": "PAN India", "package": "9.0 LPA", "cutoff": "6.0 CGPA", "numericCutoff": 6.0, "skills": ["C/C++", "Java", "Python", "Data Structures", "SQL"], "factRemarks": "Offers 3 tiers via NQT: Prime (9.0 LPA), Digital (7.0 LPA), Ninja (3.36 LPA).", "observationRemarks": "Top NQT scorers receive direct interview invites for Prime/Digital."},
  {"id": "capgemini", "name": "Capgemini", "date": "2025-08-25", "role": "Software Engineer || Capgemini Exceller", "location": "PAN India", "package": "7.5 LPA", "cutoff": "6.5 CGPA", "numericCutoff": 6.5, "skills": ["Java", "Python", "C++", "Data Structures"], "factRemarks": "Mass recruiter offering 7.5 LPA (Exceller profile) across PAN India.", "observationRemarks": "Pseudo-code and coding test scores determine package tiering."},
  {"id": "infosys", "name": "Infosys", "date": "2025-10-13", "role": "Systems Engineer / Specialist Programmer", "location": "PAN India", "package": "9.5 LPA", "cutoff": "6.5 CGPA", "numericCutoff": 6.5, "skills": ["Java", "Python", "Data Structures", "SQL"], "factRemarks": "Recruited via HackWithInfy for Specialist Programmer (9.5 LPA) and SE.", "observationRemarks": "HackWithInfy scores unlock direct interview rounds for SP roles."},
  {"id": "nutanix", "name": "Nutanix", "date": "2025-07-09", "role": "Intern, Remote Resident Expert", "location": "Pune", "package": "22.0 LPA", "cutoff": "8.0 CGPA", "numericCutoff": 8.0, "skills": ["C++", "Python", "Distributed Systems", "Linux"], "factRemarks": "Hired for Remote Resident Expert software roles at 22.0 LPA CTC.", "observationRemarks": "Focuses on OS internals, file systems, and distributed algorithms."},
  {"id": "ibm", "name": "IBM", "date": "2025-11-28", "role": "Associate System Engineer", "location": "Mumbai, Pune, Delhi NCR", "package": "9.0 LPA", "cutoff": "7.0 CGPA", "numericCutoff": 7.0, "skills": ["Java", "Cloud", "SQL", "Data Structures"], "factRemarks": "Hired for Associate System Engineer across major metro locations.", "observationRemarks": "Requires strong fundamentals in enterprise computing and database concepts."},
  {"id": "paytm", "name": "Paytm", "date": "2025-11-28", "role": "Intern", "location": "PAN India", "package": "8.0 LPA", "cutoff": "7.0 CGPA", "numericCutoff": 7.0, "skills": ["Java", "Node.js", "SQL", "REST APIs"], "factRemarks": "Hired interns across PAN India for payment backend services.", "observationRemarks": "Evaluates microservices architecture and high-throughput transaction handling."},
  {"id": "zscaler", "name": "Zscaler", "date": "2026-01-15", "role": "Intern - Business Analyst", "location": "Mohali, Bangalore, Pune", "package": "11.0 LPA", "cutoff": "7.5 CGPA", "numericCutoff": 7.5, "skills": ["SQL", "Python", "Data Analytics", "Cloud Security"], "factRemarks": "Hired Business Analyst Interns in Mohali, Bangalore, and Pune at 11.0 LPA.", "observationRemarks": "Focuses on cloud security analytics and data-driven business modeling."},
  {"id": "mphasis", "name": "Mphasis", "date": "2025-10-16", "role": "Associate Software Engineer", "location": "Bangalore, Chennai, Pune", "package": "7.0 LPA", "cutoff": "6.5 CGPA", "numericCutoff": 6.5, "skills": ["Java", "SQL", "Data Structures", "Web Dev"], "factRemarks": "Hired Associate Software Engineers across Bangalore, Chennai, Pune at 7.0 LPA.", "observationRemarks": "Evaluates core Java syntax and relational database querying."},
  {"id": "makemytrip", "name": "Make My Trip (MMT)", "date": "2025-09-24", "role": "Devops, SRE & Security", "location": "Gurugram", "package": "14.0 LPA", "cutoff": "7.5 CGPA", "numericCutoff": 7.5, "skills": ["DevOps", "Kubernetes", "Docker", "Python", "Cloud Security"], "factRemarks": "Hired for DevOps, SRE, and Security roles at MMT Gurugram headquarters.", "observationRemarks": "Evaluates infrastructure-as-code, container orchestration, and SRE metrics."},
  {"id": "siemens", "name": "Siemens Technology", "date": "2025-09-23", "role": "Apprenticeship Program", "location": "Bangalore, Chennai, Pune", "package": "8.0 LPA", "cutoff": "7.0 CGPA", "numericCutoff": 7.0, "skills": ["C++", "Python", "Embedded Systems", "IoT"], "factRemarks": "Recruited for Siemens Technology Apprenticeship Program across metros.", "observationRemarks": "Prioritizes embedded software concepts and industrial IoT architectures."}
];

export const Companies = ({ studentProfile, setActiveTab, onAskAboutCompany }) => {
  const [companiesList, setCompaniesList] = useState(ALL_PDF_COMPANIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [minCgpaFilter, setMinCgpaFilter] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const data = await fetchCompanies();
        if (data && data.companies && data.companies.length > 0) {
          setCompaniesList(data.companies);
        }
      } catch (err) {
        console.warn('Backend API connection using embedded PDF dataset:', err);
      }
    };

    loadCompanies();
  }, []);

  const filteredCompanies = useMemo(() => {
    return companiesList.filter((comp) => {
      const compName = comp.name || '';
      const compRole = comp.roles ? comp.roles.join(' ') : comp.role || '';
      const compSkills = comp.required_skills || comp.skills || [];
      const compLocation = comp.primary_location || comp.location || '';
      const cutoff = comp.cgpa_cutoff || comp.numericCutoff || 0.0;

      const matchesSearch =
        compName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        compRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        compSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesRole =
        selectedRole === 'All' || compRole.toLowerCase().includes(selectedRole.toLowerCase());

      const matchesLocation =
        selectedLocation === 'All' || compLocation.toLowerCase().includes(selectedLocation.toLowerCase());

      const matchesCgpa =
        minCgpaFilter === 'All' || cutoff <= parseFloat(minCgpaFilter);

      return matchesSearch && matchesRole && matchesLocation && matchesCgpa;
    });
  }, [companiesList, searchQuery, selectedRole, selectedLocation, minCgpaFilter]);

  return (
    <div className="space-y-8 py-4">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/30">
          <Building2 className="w-3.5 h-3.5" />
          <span>CAMPUS PLACEMENT KNOWLEDGE BASE (45+ PDF INGESTED DRIVES)</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Campus Company Explorer</h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Explore all verified campus recruiters from official placement drives. Search by company, domain role, location, or required technical skills.
        </p>
      </div>

      {/* Filter Control Bar */}
      <Card className="space-y-4 bg-dark-surface/90 border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Search company, role, or skill (e.g. SQL, Deloitte, Microsoft, Google)..."
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
              <option value="Data Analyst">Data Analyst & Analytics</option>
              <option value="AI">AI / ML Engineer</option>
              <option value="Software">Software Engineer (SDE)</option>
              <option value="Analyst">Analyst & Consulting</option>
              <option value="Devops">DevOps & Cloud</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-wider text-slate-400 uppercase mb-1.5">
              Primary Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-dark-bg border border-slate-800 text-slate-200 text-sm rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            >
              <option value="All">All Locations</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Gurugram">Gurugram / Noida</option>
              <option value="Pune">Pune / Mumbai</option>
              <option value="PAN India">PAN India</option>
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
              <option value="8.5">Below 8.5 CGPA</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
          <span>Showing <strong className="text-white font-bold">{filteredCompanies.length}</strong> verified PDF recruiting drives</span>
          {studentProfile && (
            <span>Your Current CGPA: <strong className="text-emerald-400 font-bold">{studentProfile.cgpa} / 10.0</strong></span>
          )}
        </div>
      </Card>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((comp, idx) => {
          const cutoff = comp.cgpa_cutoff || comp.numericCutoff || 0.0;
          const isEligible = studentProfile ? studentProfile.cgpa >= cutoff : true;
          const rolesText = comp.roles ? comp.roles.join(', ') : comp.role || 'Software Engineer';
          const skillsList = comp.required_skills || comp.skills || [];

          return (
            <Card
              key={comp.id || idx}
              hoverEffect
              onClick={() => setSelectedCompany({
                ...comp,
                name: comp.name,
                role: rolesText,
                package: comp.package_ctc || comp.package,
                cutoff: `${cutoff} CGPA`,
                location: comp.primary_location || comp.location,
                year: comp.placement_years ? comp.placement_years.join(', ') : comp.date || '2025',
                skills: skillsList,
                factRemarks: comp.fact_remarks || comp.factRemarks,
                observationRemarks: comp.observation_remarks || comp.observationRemarks,
              })}
              className="cursor-pointer space-y-4 flex flex-col justify-between group border-slate-800 hover:border-slate-700"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-indigo-700 flex items-center justify-center font-bold text-white shadow-glow-sm shrink-0">
                      {comp.name[0]}
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-bold text-white group-hover:text-brand-300 transition-colors truncate">{comp.name}</h3>
                      <p className="text-xs text-slate-400 truncate">{rolesText}</p>
                    </div>
                  </div>
                  <Badge variant="brand">{comp.package_ctc || comp.package}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-dark-bg/60 p-2.5 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Min Cutoff</span>
                    <span className="font-semibold text-slate-200">{cutoff} CGPA</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Drive Location</span>
                    <span className="font-semibold text-slate-200 truncate">{comp.primary_location || comp.location}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1.5">Target Skills</span>
                  <div className="flex flex-wrap gap-1">
                    {skillsList.slice(0, 4).map((skill, sIdx) => (
                      <span key={sIdx} className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
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
                    <span>Eligible for drive</span>
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

      {/* Company Drawer */}
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
