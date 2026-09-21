import json
import os
from typing import List, Dict, Any, Optional

class PlacementDataEngine:
    def __init__(self, data_path: str = "app/data/campus_placements.json"):
        self.data_path = data_path
        self.companies: List[Dict[str, Any]] = []
        self._load_data()

    def _load_data(self):
        # Resolve path relative to backend root
        if not os.path.exists(self.data_path):
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            alt_path = os.path.join(base_dir, "data", "campus_placements.json")
            if os.path.exists(alt_path):
                self.data_path = alt_path

        try:
            with open(self.data_path, "r", encoding="utf-8") as f:
                content = json.load(f)
                self.companies = content.get("companies", [])
        except Exception as e:
            print(f"[PlacementDataEngine] Warning loading data: {e}")
            self.companies = []

    def get_all_companies(self) -> List[Dict[str, Any]]:
        return self.companies

    def find_companies_by_role(self, role_keyword: str) -> List[Dict[str, Any]]:
        keyword = role_keyword.lower().strip()
        matched = []
        for comp in self.companies:
            roles = [r.lower() for r in comp.get("roles", [])]
            domain = comp.get("domain", "").lower()
            skills = [s.lower() for s in comp.get("required_skills", [])]
            if (any(keyword in r for r in roles) or 
                keyword in domain or 
                any(keyword in s for s in skills) or
                ("analyst" in keyword and any("analyst" in r for r in roles)) or
                ("sde" in keyword and any("software" in r for r in roles)) or
                ("ai" in keyword and any("machine learning" in s for s in skills))):
                matched.append(comp)
        return matched if matched else self.companies[:6]

    def find_companies_by_cgpa(self, max_cutoff: float) -> List[Dict[str, Any]]:
        return [c for c in self.companies if c.get("numeric_cgpa", c.get("cgpa_cutoff", 0.0)) <= max_cutoff]

    def get_company_by_name(self, company_name: str) -> Optional[Dict[str, Any]]:
        name_lower = company_name.lower().strip()
        for comp in self.companies:
            if name_lower in comp.get("name", "").lower():
                return comp
        return None

    def get_dynamic_career_paths(self, student_skills: List[str], student_cgpa: float = 8.0) -> List[Dict[str, Any]]:
        """
        Dynamically computes match scores, average packages, top recruiters,
        and required skills for major placement roles based on actual student skills.
        """
        normalized_student_skills = set(s.lower().strip() for s in student_skills)

        role_categories = [
            {
                "role": "Data Analyst & Analytics",
                "domain_key": "data analyst",
                "core_skills": ["sql", "python", "power bi", "excel", "data analysis", "statistics", "data visualization"],
                "fallback_package": "7.5 - 14.0 LPA",
            },
            {
                "role": "AI / ML Engineer & Data Science",
                "domain_key": "ai",
                "core_skills": ["python", "machine learning", "pytorch", "tensorflow", "pyspark", "deep learning", "fastapi"],
                "fallback_package": "12.0 - 25.0 LPA",
            },
            {
                "role": "Software Development Engineer (SDE-1)",
                "domain_key": "software",
                "core_skills": ["data structures", "algorithms", "java", "c++", "system design", "python", "rest api"],
                "fallback_package": "10.0 - 24.0 LPA",
            },
            {
                "role": "Full Stack & Cloud Developer",
                "domain_key": "web",
                "core_skills": ["react", "javascript", "node.js", "html/css", "sql", "devops", "cloud computing"],
                "fallback_package": "8.0 - 18.0 LPA",
            },
        ]

        results = []
        for cat in role_categories:
            matching_companies = self.find_companies_by_role(cat["domain_key"])
            top_recruiter_names = list(set([c["name"] for c in matching_companies]))[:4]
            
            # Calculate match score based on skill intersection
            category_core = set(cat["core_skills"])
            intersection = normalized_student_skills.intersection(category_core)
            
            # Base match score logic
            if category_core:
                match_pct = min(98, max(65, int((len(intersection) / min(4, len(category_core))) * 40) + 60))
            else:
                match_pct = 75

            # Calculate package range from actual matched companies
            packages = [c.get("numeric_package", 0.0) for c in matching_companies if c.get("numeric_package")]
            if packages:
                min_p = min(packages)
                max_p = max(packages)
                pkg_str = f"{min_p:.1f} - {max_p:.1f} LPA"
            else:
                pkg_str = cat["fallback_package"]

            # Aggregate required skills from matching companies
            all_req_skills = []
            for c in matching_companies:
                for s in c.get("required_skills", []):
                    if s not in all_req_skills and len(all_req_skills) < 6:
                        all_req_skills.append(s)

            results.append({
                "role": cat["role"],
                "matchScore": f"{match_pct}% Match",
                "numericMatch": match_pct,
                "avgPackage": pkg_str,
                "topCompanies": top_recruiter_names if top_recruiter_names else ["Deloitte", "Amazon", "Infosys"],
                "keySkills": all_req_skills if all_req_skills else cat["core_skills"][:5],
                "eligibleCount": len([c for c in matching_companies if c.get("cgpa_cutoff", 0.0) <= student_cgpa])
            })

        # Sort by match score descending
        results.sort(key=lambda x: x["numericMatch"], reverse=True)
        return results

placement_db = PlacementDataEngine()
