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

const DEFAULT_PDF_COMPANIES = [
  {
    id: "sprinkle-data",
    name: "Sprinkle Data",
    domain: "Data Analytics & Engineering",
    roles: ["Data Analyst"],
    package_ctc: "7.5 LPA",
    numeric_package: 7.5,
    cgpa_cutoff: 6.5,
    allowed_branches: ["CSE", "IT", "ECE", "AI/DS"],
    max_backlogs: 0,
    primary_location: "Bangalore",
    placement_years: ["2023", "2024", "2025"],
    required_skills: ["SQL", "Python", "ETL Pipelines", "Data Warehousing", "Tableau"],
    fact_remarks: "Recruited for Data Analyst roles offering 7.5 LPA fixed compensation in Bangalore.",
    observation_remarks: "Requires strong proficiency in SQL JOINs, aggregation queries, and Python data manipulation."
  },
  {
    id: "iztri",
    name: "Iztri",
    domain: "Web & Software Development",
    roles: ["Front end Developer"],
    package_ctc: "6.0 LPA",
    numeric_package: 6.0,
    cgpa_cutoff: 6.0,
    allowed_branches: ["CSE", "IT", "ECE"],
    max_backlogs: 0,
    primary_location: "Bangalore",
    placement_years: ["2023", "2025"],
    required_skills: ["React", "JavaScript", "HTML5/CSS3", "Tailwind CSS", "REST APIs"],
    fact_remarks: "2024 Startup with 10-hour work environment hiring Front end Developers at 6.0 LPA.",
    observation_remarks: "Evaluates component state management, responsive UI design, and JavaScript ES6+ depth."
  },
  {
    id: "jpmorgan-chase",
    name: "JP Morgan Chase",
    domain: "Investment Banking & FinTech",
    roles: ["Software Engineering Program", "Summer Internship"],
    package_ctc: "19.75 LPA",
    numeric_package: 19.75,
    cgpa_cutoff: 8.5,
    allowed_branches: ["CSE", "IT", "ECE", "AI/DS"],
    max_backlogs: 0,
    primary_location: "Bangalore, Mumbai",
    placement_years: ["2024", "2025"],
    required_skills: ["Data Structures", "Algorithms", "Java", "Python", "SQL", "OOP"],
    fact_remarks: "Hired via full-day Hackathon and CGPA-based shortlisting (Above 8.5 CGPA). Offered 19.75 LPA CTC + 75k/month stipend.",
    observation_remarks: "CodeForGood Hackathon performance combined with CGPA above 8.5 guarantees high selection odds."
  },
  {
    id: "microsoft",
    name: "Microsoft",
    domain: "Big Tech & Cloud Engineering",
    roles: ["Software Engineer", "Summer Internship - Tech Consultant", "SEFA Program"],
    package_ctc: "50.0 LPA",
    numeric_package: 50.0,
    cgpa_cutoff: 8.5,
    allowed_branches: ["CSE", "IT", "ECE"],
    max_backlogs: 0,
    primary_location: "Bangalore, Hyderabad",
    placement_years: ["2024", "2025"],
    required_skills: ["Data Structures", "Algorithms", "C++", "System Architecture", "Cloud Computing"],
    fact_remarks: "Top 100 students sorted by CGPA (Above 9.4 Batch). Offered 50.0 - 52.0 LPA CTC with 125k/month internship stipend.",
    observation_remarks: "Extremely competitive CGPA cutoffs; technical rounds focus on advanced graph/tree DSA problem solving."
  },
  {
    id: "uipath",
    name: "UiPath",
    domain: "Robotic Process Automation & AI",
    roles: ["Summer Internship", "RPA & Software Engineer"],
    package_ctc: "25.0 LPA",
    numeric_package: 25.0,
    cgpa_cutoff: 7.5,
    allowed_branches: ["CSE", "IT", "ECE"],
    max_backlogs: 0,
    primary_location: "Bangalore",
    placement_years: ["2024", "2025"],
    required_skills: ["Python", "C#", "Automation", "Data Structures", "Problem Solving"],
    fact_remarks: "Exclusively open for female students. Offered 25.0 LPA CTC with 150k/month stipend.",
    observation_remarks: "Evaluates algorithmic problem solving and logical puzzle solving under pressure."
  },
  {
    id: "google",
    name: "Google",
    domain: "Search, Cloud & AI",
    roles: ["Summer Internship", "Wintern Internship"],
    package_ctc: "43.0 LPA",
    numeric_package: 43.0,
    cgpa_cutoff: 8.0,
    allowed_branches: ["CSE", "IT", "ECE"],
    max_backlogs: 0,
    primary_location: "Bangalore, Hyderabad",
    placement_years: ["2024", "2025"],
    required_skills: ["Data Structures", "Algorithms", "C++", "Python", "System Design"],
    fact_remarks: "Off-campus & Diversity hiring via Google Girl program offering 43.0 LPA CTC + 89k/month stipend.",
    observation_remarks: "Focuses on optimal time and space complexity algorithm implementations."
  },
  {
    id: "servicenow",
    name: "ServiceNow",
    domain: "Enterprise Cloud Platform",
    roles: ["Associate Software Engineer", "Software Engineer Intern"],
    package_ctc: "15.0 LPA",
    numeric_package: 15.0,
    cgpa_cutoff: 7.5,
    allowed_branches: ["CSE", "IT", "ECE"],
    max_backlogs: 0,
    primary_location: "Hyderabad, Bangalore, Gurugram",
    placement_years: ["2024", "2025"],
    required_skills: ["Java", "JavaScript", "Cloud Architecture", "Data Structures", "REST APIs"],
    fact_remarks: "Hired female candidates for Associate Software Engineer roles at 15.0 LPA CTC + 40k/month stipend.",
    observation_remarks: "High emphasis on object-oriented programming, data structures, and web technologies."
  },
  {
    id: "fico",
    name: "FICO",
    domain: "Analytics, Credit Scoring & Software",
    roles: ["Devops Engineering Enablement", "Software Developer Intern", "Cloud Engineering Intern", "Devops, SRE, Cloud"],
    package_ctc: "11.2 LPA",
    numeric_package: 11.2,
    cgpa_cutoff: 7.0,
    allowed_branches: ["CSE", "IT", "ECE"],
    max_backlogs: 0,
    primary_location: "Bangalore",
    placement_years: ["2025"],
    required_skills: ["DevOps", "Docker", "Kubernetes", "Python", "Cloud Engineering", "Linux"],
    fact_remarks: "Visited campus 6 times across different profiles offering 11.2 LPA CTC + 30k/month stipend.",
    observation_remarks: "Selection based on virtual open book technical assessment and cloud/DevOps fundamentals."
  },
  {
    id: "orange-business",
    name: "Orange Business",
    domain: "Telecommunications & Cloud Services",
    roles: ["Software Engineer Intern"],
    package_ctc: "9.0 LPA",
    numeric_package: 9.0,
    cgpa_cutoff: 7.0,
    allowed_branches: ["CSE", "IT", "ECE"],
    max_backlogs: 0,
    primary_location: "Gurugram",
    placement_years: ["2025"],
    required_skills: ["Networking", "Python", "Java", "Cloud Basics", "Linux"],
    fact_remarks: "Came to campus 2 months after releasing forms. Offered 9.0 LPA CTC with easy interview process.",
    observation_remarks: "Requires solid grasp of computer networks, basic puzzles, and core OOP concepts."
  },
  {
    id: "playsimple-games",
    name: "PlaySimple Games",
    domain: "Mobile Gaming & Analytics",
    roles: ["Associate Software Engineer", "Associate Business Analyst"],
    package_ctc: "8.0 LPA",
    numeric_package: 8.0,
    cgpa_cutoff: 7.0,
    allowed_branches: ["CSE", "IT", "ECE"],
    max_backlogs: 0,
    primary_location: "Bangalore",
    placement_years: ["2025"],
    required_skills: ["C++", "Data Structures", "SQL", "Python", "Problem Solving"],
    fact_remarks: "Shortlisted based on 10th and 12th Board marks (80%+ in both). Offered 8.0 LPA CTC.",
    observation_remarks: "Rigorous technical interviews evaluating logic, algorithms, and analytical problem solving."
  },
  {
    id: "optmyzr",
    name: "Optmyzr",
    domain: "SaaS & PPC Analytics",
    roles: ["Software Development Engineer", "SDE Testing"],
    package_ctc: "14.0 LPA",
    numeric_package: 14.0,
    cgpa_cutoff: 7.5,
    allowed_branches: ["CSE", "IT", "ECE"],
    max_backlogs: 0,
    primary_location: "Hyderabad",
    placement_years: ["2025"],
    required_skills: ["Python", "JavaScript", "Selenium", "Data Structures", "SQL"],
    fact_remarks: "Hired for SDE and SDE Testing roles offering 14.0 LPA CTC + 40k/month stipend.",
    observation_remarks: "Evaluates full-stack web concepts and automated test framework architecture."
  },
  {
    id: "neilsen",
    name: "Neilsen",
    domain: "Audience Measurement & Data Analytics",
    roles: ["Software Engineer Intern"],
    package_ctc: "8.5 LPA",
    numeric_package: 8.5,
    cgpa_cutoff: 7.0,
    allowed_branches: ["CSE", "IT", "ECE", "AI/DS"],
    max_backlogs: 0,
    primary_location: "Bangalore",
    placement_years: ["2025"],
    required_skills: ["SQL", "Python", "Data Analysis", "ETL", "Statistics"],
    fact_remarks: "Visited campus twice. Shortlisting based on 10th and 12th Board marks (85%+ average). Offered 8.5 LPA.",
    observation_remarks: "Shortlisting strictly enforces high high school board percentages."
  },
  {
    id: "invoice-cloud",
    name: "Invoice Cloud",
    domain: "FinTech & Payment Solutions",
    roles: ["Trainee Software Engineer"],
    package_ctc: "7.5 LPA",
    numeric_package: 7.5,
    cgpa_cutoff: 6.5,
    allowed_branches: ["CSE", "IT", "ECE"],
    max_backlogs: 0,
    primary_location: "Hyderabad",
    placement_years: ["2025"],
    required_skills: ["C#", ".NET", "SQL", "JavaScript", "REST APIs"],
    fact_remarks: "Development-focused hiring drive offering 7.5 LPA CTC for Trainee Software Engineers.",
    observation_remarks: "Evaluates web framework development and relational database management."
  },
  {
    id: "otipy",
    name: "Otipy (Crofarm)",
    domain: "AgriTech & Supply Chain Software",
    roles: ["Software Developer Intern"],
    package_ctc: "7.0 LPA",
    numeric_package: 7.0,
    cgpa_cutoff: 7.0,
    allowed_branches: ["CSE", "IT", "ECE"],
    max_backlogs: 0,
    primary_location: "Gurugram",
    placement_years: ["2025"],
    required_skills: ["Node.js", "Python", "React", "MongoDB", "SQL"],
    fact_remarks: "Shortlisting based on 10th and 12th Board marks (90%+ average). Offered 7.0 LPA CTC.",
    observation_remarks: "Requires solid full-stack JavaScript skills and modern backend API design."
  },
  {
    id: "juspay",
    name: "Juspay",
    domain: "FinTech & Payments Infrastructure",
    roles: ["Software Developer Engineering", "Product Engineer"],
    package_ctc: "27.0 LPA",
    numeric_package: 27.0,
    cgpa_cutoff: 8.0,
    allowed_branches: ["CSE", "IT", "ECE"],
    max_backlogs: 0,
    primary_location: "Bangalore",
    placement_years: ["2025"],
    required_skills: ["Functional Programming", "Haskell", "Data Structures", "Algorithms", "C++", "Java"],
    fact_remarks: "One of the toughest campus recruiters. Offered 27.0 LPA CTC + 40k/month stipend.",
    observation_remarks: "Selection relies heavily on functional programming paradigms and deep algorithmic puzzle solving."
  },
  {
    id: "telaverge-communications",
    name: "Telaverge Communications",
    domain: "Telecom & Cloud Automation",
    roles: ["Software Engineer - Research and Development"],
    package_ctc: "12.6 LPA",
    numeric_package: 12.6,
    cgpa_cutoff: 7.5,
    allowed_branches: ["CSE", "IT", "ECE"],
    max_backlogs: 0,
    primary_location: "Bangalore",
    placement_years: ["2025"],
    required_skills: ["C++", "Python", "Networking Protocols", "Linux", "Data Structures"],
    fact_remarks: "Evaluated candidates strictly based on self-built technical projects. Offered 12.6 LPA CTC.",
    observation_remarks: "Projects in networking, socket programming, or low-level systems grant a strong advantage."
  },
  {
    id: "wissen-technology",
    name: "Wissen Technology",
    domain: "FinTech & High-Frequency Trading Software",
    roles: ["Tech Intern", "Java Devloper Intern"],
    package_ctc: "12.6 LPA",
    numeric_package: 12.6,
    cgpa_cutoff: 7.5,
    allowed_branches: ["CSE", "IT", "ECE"],
    max_backlogs: 0,
    primary_location: "Bangalore, Hyderabad, Pune, Mumbai",
    placement_years: ["2025"],
    required_skills: ["Java", "Multithreading", "Data Structures", "Algorithms", "SQL"],
    fact_remarks: "Coding assessment conducted on pen and paper. Offered 12.6 LPA CTC.",
    observation_remarks: "Evaluates manual code syntax writing without IDE assistance and deep Java concurrency concepts."
  },
  {
    id: "samsung-electro-mechanics",
    name: "Samsung Electro Mechanics",
    domain: "Consumer Electronics & R&D",
    roles: ["Machine Learning", "C# .Net / WPF", "UI/UX Developer", "VC++ MFC Developer", "Quality Control"],
    package_ctc: "11.5 LPA",
    numeric_package: 11.5,
    cgpa_cutoff: 7.0,
    allowed_branches: ["CSE", "IT", "ECE", "AI/DS"],
    max_backlogs: 0,
    primary_location: "Bangalore",
    placement_years: ["2025"],
    required_skills: ["Python", "C#", "C++", "Machine Learning", "WPF", "UI/UX Design", "Automation"],
    fact_remarks: "Visited campus 3 times hiring across Machine Learning, Full Stack, UI/UX, and Quality Control roles offering 11.5 LPA CTC.",
    observation_remarks: "Requires minimum Employability Test score of 150+ for candidate shortlisting."
  },
  {
    id: "bajaj-finserv",
    name: "Bajaj Finserv",
    domain: "Financial Services & SalesForce",
    roles: ["Full Stack and Sales Force Intern", "Java Salesforce Developer", "Full Stack"],
    package_ctc: "12.0 LPA",
    numeric_package: 12.0,
    cgpa_cutoff: 7.0,
    allowed_branches: ["CSE", "IT", "ECE"],
    max_backlogs: 0,
    primary_location: "Pune, Bangalore",
    placement_years: ["2025"],
    required_skills: ["Java", "Salesforce Apex", "LWC", "Full Stack Development", "SQL"],
    fact_remarks: "Hackathon-based selection offering 12.0 LPA CTC + 35k/month stipend.",
    observation_remarks: "Evaluates Salesforce platform customization alongside core Java web development."
  },
  {
    id: "salescode-ai",
    name: "SalesCode.ai",
    domain: "AI Sales & Enterprise Automation",
    roles: ["Software Engineer Trainee", "Business Analyst", "Technical Project Associate", "QA Trainee"],
    package_ctc: "10.0 LPA",
    numeric_package: 10.0,
    cgpa_cutoff: 7.0,
    allowed_branches: ["CSE", "IT", "ECE"],
    max_backlogs: 0,
    primary_location: "Gurugram",
    placement_years: ["2025"],
    required_skills: ["Python", "Machine Learning", "SQL", "React", "Node.js", "QA Automation"],
    fact_remarks: "Recruited 10+ students across Full Stack SDE, Business Analyst, and QA Trainee roles.",
    observation_remarks: "Focuses on AI application architecture and rapid product prototyping."
  },
  {
    id: "dbs-tech-india",
    name: "DBS Tech India",
    domain: "Banking Tech & Enterprise Systems",
    roles: ["Apprenticeship Program", "Full Stack Engineer"],
    package_ctc: "14.0 LPA",
    numeric_package: 14.0,
    cgpa_cutoff: 7.5,
    allowed_branches: ["CSE", "IT", "ECE"],
    max_backlogs: 0,
    primary_location: "Hyderabad",
    placement_years: ["2025"],
    required_skills: ["Java", "Spring Boot", "React", "Microservices", "SQL"],
    fact_remarks: "8-month work-from-home internship with stipend scaling to 36k/month, converting to 14.0 LPA full-time offer.",
    observation_remarks: "Evaluates enterprise Java microservices and modern frontend frameworks."
  },
  {
    id: "deloitte-usi",
    name: "Deloitte USI",
    domain: "Analytics & Consulting",
    roles: ["Data Analyst", "Analyst - Business Technology", "Risk & Financial Advisory"],
    package_ctc: "8.5 LPA",
    numeric_package: 8.5,
    cgpa_cutoff: 6.5,
    allowed_branches: ["CSE", "IT", "ECE", "AI/DS", "Mechanical", "Civil"],
    max_backlogs: 0,
    primary_location: "Pan-India (Hyderabad, Gurgaon, Bangalore, Mumbai)",
    placement_years: ["2024", "2025", "2026"],
    required_skills: ["SQL", "Python", "Power BI", "Excel", "Data Visualization", "Problem Solving"],
    fact_remarks: "Deloitte USI visited campus for 3 consecutive placement cycles offering a fixed CTC of 7.5 LPA plus 1.0 LPA performance bonus.",
    observation_remarks: "Historical placement records indicate high conversion for candidates demonstrating proficiency in SQL JOINs and Power BI."
  },
  {
    id: "coders-brain",
    name: "Coders Brain",
    domain: "Cloud Data Engineering & AI",
    roles: ["Data Engineer (Python / Databricks / PySpark / Azure)"],
    package_ctc: "10.0 LPA",
    numeric_package: 10.0,
    cgpa_cutoff: 7.0,
    allowed_branches: ["CSE", "IT", "ECE", "AI/DS"],
    max_backlogs: 0,
    primary_location: "Noida",
    placement_years: ["2025"],
    required_skills: ["Python", "Databricks", "PySpark", "Azure Data Lake", "SQL"],
    fact_remarks: "Recruited for specialized Cloud Data Engineering roles utilizing Databricks and PySpark at 10.0 LPA.",
    observation_remarks: "Requires strong hands-on experience with distributed PySpark dataframes and Azure cloud ETL pipelines."
  },
  {
    id: "flipkart",
    name: "Flipkart",
    domain: "E-Commerce & Cybersecurity",
    roles: ["Infosec Intern", "Software Engineer"],
    package_ctc: "18.0 LPA",
    numeric_package: 18.0,
    cgpa_cutoff: 8.0,
    allowed_branches: ["CSE", "IT", "ECE"],
    max_backlogs: 0,
    primary_location: "Bangalore (Hybrid model)",
    placement_years: ["2025"],
    required_skills: ["Cybersecurity", "Network Security", "Python", "C++", "Data Structures"],
    fact_remarks: "Recruited Infosec Interns offering 18.0 LPA CTC under hybrid working model.",
    observation_remarks: "Focuses on security vulnerability assessment, cryptography fundamentals, and secure coding practices."
  },
  {
    id: "purestorage",
    name: "PureStorage",
    domain: "Enterprise Data Storage & Automation",
    roles: ["Deal Analysis Automation Intern - Excel & SFDC Integration"],
    package_ctc: "14.0 LPA",
    numeric_package: 14.0,
    cgpa_cutoff: 7.5,
    allowed_branches: ["CSE", "IT", "ECE"],
    max_backlogs: 0,
    primary_location: "Hyderabad, Bangalore",
    placement_years: ["2025"],
    required_skills: ["Python", "Salesforce API", "Excel VBA", "SQL", "Automation"],
    fact_remarks: "Hired for Deal Analysis Automation Intern integrating Salesforce (SFDC) and complex Excel models at 14.0 LPA.",
    observation_remarks: "Requires strong analytical modeling capabilities and REST API integration skills."
  },
  {
    id: "morgan-stanley",
    name: "Morgan Stanley",
    domain: "Investment Banking & Tech",
    roles: ["Cyber Track Apprenticeship Program", "Software Engineer"],
    package_ctc: "16.0 LPA",
    numeric_package: 16.0,
    cgpa_cutoff: 8.0,
    allowed_branches: ["CSE", "IT", "ECE"],
    max_backlogs: 0,
    primary_location: "Bangalore, Mumbai",
    placement_years: ["2025"],
    required_skills: ["Cybersecurity", "C++", "Java", "Linux Internals", "Data Structures"],
    fact_remarks: "Recruited for Cyber Track Apprenticeship Program in Bangalore and Mumbai offering 16.0 LPA.",
    observation_remarks: "Requires deep understanding of operating systems, network security protocols, and C++/Java DSA."
  },
  {
    id: "blinkit",
    name: "Blinkit (Zomato)",
    domain: "Quick Commerce & Tech",
    roles: ["Business Analyst Intern", "Software Engineer"],
    package_ctc: "12.0 LPA",
    numeric_package: 12.0,
    cgpa_cutoff: 7.5,
    allowed_branches: ["CSE", "IT", "ECE", "AI/DS"],
    max_backlogs: 0,
    primary_location: "Gurugram, Punjab",
    placement_years: ["2025"],
    required_skills: ["SQL", "Python", "Data Analytics", "Excel", "Problem Solving"],
    fact_remarks: "Offered 12.0 LPA CTC for Business Analyst Interns in Gurugram.",
    observation_remarks: "Evaluates real-time delivery optimization metrics, SQL data extraction, and business logic."
  },
  {
    id: "myntra",
    name: "Myntra",
    domain: "E-Commerce & Fashion Tech",
    roles: ["Software Developer Interns", "SDE-1"],
    package_ctc: "18.0 LPA",
    numeric_package: 18.0,
    cgpa_cutoff: 8.0,
    allowed_branches: ["CSE", "IT", "ECE"],
    max_backlogs: 0,
    primary_location: "Bangalore",
    placement_years: ["2025"],
    required_skills: ["Data Structures", "Algorithms", "Java", "React", "System Design"],
    fact_remarks: "Pool hiring drive with strict college filtering. Offered 18.0 LPA CTC.",
    observation_remarks: "High bar for data structures, algorithmic efficiency, and scalable web architecture."
  },
  {
    id: "rippling",
    name: "Rippling",
    domain: "Workforce & HR Tech SaaS",
    roles: ["Frontend Role", "Software Engineer"],
    package_ctc: "30.0 LPA",
    numeric_package: 30.0,
    cgpa_cutoff: 8.5,
    allowed_branches: ["CSE", "IT", "ECE"],
    max_backlogs: 0,
    primary_location: "Bangalore",
    placement_years: ["2025"],
    required_skills: ["React", "TypeScript", "JavaScript ES6+", "Data Structures", "Web Performance"],
    fact_remarks: "Internship-to-FTE drive offering 30.0 LPA CTC. Online assessments feature lengthy React component design tasks.",
    observation_remarks: "Evaluates production-grade React UI construction, state management, and frontend performance."
  },
  {
    id: "codenation",
    name: "CodeNation",
    domain: "High-Frequency Tech & Algorithmic Software",
    roles: ["Software Development Engineer"],
    package_ctc: "35.0 LPA",
    numeric_package: 35.0,
    cgpa_cutoff: 8.5,
    allowed_branches: ["CSE", "IT", "ECE"],
    max_backlogs: 0,
    primary_location: "Remote / Bangalore",
    placement_years: ["2025"],
    required_skills: ["Competitive Programming", "C++", "Data Structures", "Advanced Algorithms", "System Design"],
    fact_remarks: "Premier algorithmic tech recruiter offering 35.0 LPA CTC for Software Development Engineers.",
    observation_remarks: "Requires elite competitive programming ability (Codeforces Candidate Master / Master equivalent)."
  },
  {
    id: "autodesk",
    name: "Autodesk",
    domain: "3D Design & Engineering Software",
    roles: ["Software Development Engineer (SDE)"],
    package_ctc: "22.0 LPA",
    numeric_package: 22.0,
    cgpa_cutoff: 8.0,
    allowed_branches: ["CSE", "IT", "ECE"],
    max_backlogs: 0,
    primary_location: "Bangalore, Pune",
    placement_years: ["2025"],
    required_skills: ["C++", "Data Structures", "Dynamic Programming", "Algorithms", "Graphics Math"],
    fact_remarks: "Offered 22.0 LPA CTC for SDE roles in Bangalore and Pune.",
    observation_remarks: "Interviews test core Data Structures & Algorithms with emphasis on memoization and dynamic programming."
  },
  {
    id: "eightfold-ai",
    name: "Eightfold AI",
    domain: "AI Talent Intelligence Platform",
    roles: ["Agentic AI - Engineering Intern", "Software Engineer"],
    package_ctc: "16.0 LPA",
    numeric_package: 16.0,
    cgpa_cutoff: 8.0,
    allowed_branches: ["CSE", "IT", "ECE", "AI/DS"],
    max_backlogs: 0,
    primary_location: "Bangalore, Noida",
    placement_years: ["2025", "2026"],
    required_skills: ["Agentic AI", "Python", "LLMs", "FastAPI", "Machine Learning", "Data Structures"],
    fact_remarks: "Hired for Agentic AI and Engineering Intern roles in Bangalore and Noida offering 16.0 LPA.",
    observation_remarks: "Prioritizes practical experience building agentic workflows, LLM tool-calling, and Python APIs."
  },
  {
    id: "goldman-sachs",
    name: "Goldman Sachs",
    domain: "Investment Banking & Quantitative Engineering",
    roles: ["Quantitative Analyst", "Data Engineer", "Software Engineer"],
    package_ctc: "20.0 LPA",
    numeric_package: 20.0,
    cgpa_cutoff: 8.0,
    allowed_branches: ["CSE", "IT", "ECE", "Mathematics & Computing"],
    max_backlogs: 0,
    primary_location: "Bangalore",
    placement_years: ["2025", "2026"],
    required_skills: ["Python", "C++", "SQL", "Spark", "Probability", "Linear Algebra", "Algorithms"],
    fact_remarks: "Goldman Sachs offered 20.0 LPA for Quantitative Engineering and Data Infrastructure roles.",
    observation_remarks: "Requires rigorous mathematical problem solving, probability calculations, and low-latency algorithm optimization."
  }
];

export const Companies = ({ studentProfile, setActiveTab, onAskAboutCompany }) => {
  const [companiesList, setCompaniesList] = useState(DEFAULT_PDF_COMPANIES);
  const [loading, setLoading] = useState(false);
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
          <span>CAMPUS PLACEMENT KNOWLEDGE BASE (PDF INGESTED)</span>
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
          <span>Showing <strong className="text-white">{filteredCompanies.length}</strong> verified PDF recruiting drives</span>
          {studentProfile && (
            <span>Your Current CGPA: <strong className="text-emerald-400">{studentProfile.cgpa} / 10.0</strong></span>
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
                year: comp.placement_years ? comp.placement_years.join(', ') : comp.year || '2025',
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
