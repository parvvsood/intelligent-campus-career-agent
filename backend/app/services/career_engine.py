from typing import Dict, Any, List
from app.services.placement_data import placement_db

class CareerEngineService:
    def process_query(self, message: str, student_profile: Dict[str, Any] = None) -> Dict[str, Any]:
        msg_lower = message.lower().strip()
        profile = student_profile or {}
        cgpa = profile.get("cgpa", 8.0)
        branch = profile.get("branch", "Computer Science & Engineering")
        skills = profile.get("skills", ["Python", "SQL", "Data Analysis"])

        # Query Type 1: Skill Analysis & Study Plan
        if any(w in msg_lower for w in ["skill", "prepare", "study plan", "roadmap", "preparation"]):
            return self._generate_skill_study_plan(msg_lower, skills, profile)

        # Query Type 2: Company Remarks (Fact vs Observation)
        elif any(w in msg_lower for w in ["remark", "deloitte", "amazon", "zs", "microsoft", "accenture", "goldman"]):
            return self._generate_company_remarks(msg_lower)

        # Query Type 3: General Placement / Recruiter Search
        else:
            return self._generate_company_recommendations(msg_lower, cgpa, branch)

    def _generate_company_recommendations(self, msg_lower: str, cgpa: float, branch: str) -> Dict[str, Any]:
        matched = placement_db.find_companies_by_role(msg_lower)
        if not matched:
            matched = placement_db.get_all_companies()[:4]

        # Format markdown response
        table_rows = []
        company_metadata = []
        for c in matched:
            table_rows.append(
                f"| **{c['name']}** | {c['package_ctc']} | {c['cgpa_cutoff']} CGPA | {', '.join(c['roles'][:2])} | {c['primary_location']} |"
            )
            company_metadata.append({
                "name": c['name'],
                "role": c['roles'][0],
                "package": c['package_ctc'],
                "cutoff": f"{c['cgpa_cutoff']} CGPA",
                "location": c['primary_location']
            })

        table_str = "\n".join(table_rows)

        answer_markdown = f"""### Grounded Campus Placement Recruiter Insights

Based on verified campus placement records for **{branch}** (Your CGPA: **{cgpa}**):

| Company Name | Package (CTC) | Min CGPA | Target Roles | Primary Location |
|---|---|---|---|---|
{table_str}

### Key Recruitment Insights:
- **CGPA Eligibility Status**: {len([c for c in matched if c['cgpa_cutoff'] <= cgpa])} out of {len(matched)} matching recruiters are within your current CGPA range.
- **Top In-Demand Skills**: SQL, Python, Problem Solving, Data Structures, Power BI.
- **Recruitment Window**: Drives conducted across 2024–2026 placement cycles."""

        return {
            "answer": answer_markdown,
            "metadata": {
                "companies": company_metadata,
                "query_type": "company_recommendation"
            }
        }

    def _generate_skill_study_plan(self, msg_lower: str, existing_skills: List[str], profile: Dict[str, Any]) -> Dict[str, Any]:
        target_role = "Data Analyst & AI/ML" if "analyst" in msg_lower or "ai" in msg_lower else "Software Engineering (SDE)"
        
        study_plan_metadata = [
            {
                "phase": "Phase 1: Foundation (Week 1-2)",
                "duration": "15 Hours",
                "topic": "SQL & Relational Query Optimization",
                "details": "Master Window functions (DENSE_RANK, LEAD/LAG), CTEs, GROUP BY HAVING aggregations, and Indexing."
            },
            {
                "phase": "Phase 2: Core Stack (Week 3)",
                "duration": "12 Hours",
                "topic": "Python Data Stack & API Development",
                "details": "Deep dive into Pandas dataframes, NumPy array manipulations, data cleaning, and REST APIs with FastAPI."
            },
            {
                "phase": "Phase 3: Domain Case Studies (Week 4)",
                "duration": "10 Hours",
                "topic": "Business Case Analysis & Technical Interviews",
                "details": "Practice Guesstimates, revenue metric decomposition, data visualization dashboards, and mock technical rounds."
            }
        ]

        answer_markdown = f"""### Customized 4-Week Placement Preparation Plan

Target Domain: **{target_role}**
Your Current Skills: `{', '.join(existing_skills)}`

#### 🎯 Week 1-2: Advanced SQL & Data Manipulation
- **Focus Areas**: Window Functions (`DENSE_RANK()`, `ROW_NUMBER()`), Complex JOINs, Subqueries, CTEs.
- **Practice Platform**: LeetCode SQL 50 & HackerRank Advanced SQL.
- **Expected Outcome**: Ability to write optimized multi-table queries in technical screening rounds.

#### ⚡ Week 3: Python Analytics & Frameworks
- **Focus Areas**: Pandas data cleaning, vectorization, FastAPI backend routing, data visualization.
- **Practice Projects**: Build a mini-project analyzing campus recruitment datasets or REST API.

#### 🚀 Week 4: Business Problem Solving & Mock Interviews
- **Focus Areas**: Metric breakdown (CAC, LTV, Churn), Guesstimates framework, presentation of insights.
- **Practice Focus**: Deloitte & ZS Associates case study patterns."""

        return {
            "answer": answer_markdown,
            "metadata": {
                "studyPlan": study_plan_metadata,
                "query_type": "study_plan"
            }
        }

    def _generate_company_remarks(self, msg_lower: str) -> Dict[str, Any]:
        # Search company in DB
        matched_comp = None
        for name in ["deloitte", "amazon", "zs", "microsoft", "accenture", "goldman"]:
            if name in msg_lower:
                matched_comp = placement_db.get_company_by_name(name)
                break

        if not matched_comp:
            matched_comp = placement_db.get_all_companies()[0]

        fact = matched_comp.get("fact_remarks", f"Recruiter visited campus offering {matched_comp['package_ctc']} for {matched_comp['roles'][0]}.")
        obs = matched_comp.get("observation_remarks", "Candidates clearing initial technical screening exhibit strong fundamental coding ability.")

        answer_markdown = f"""### Data-Grounded Remarks for **{matched_comp['name']}**

> [!IMPORTANT]
> **Verified Ground Truth Facts vs Data Observations**

**FACT (VERIFIED CAMPUS PLACEMENT DATABASE)**:
- {fact}
- **Package Offered**: **{matched_comp['package_ctc']}**
- **Min Eligibility Cutoff**: **{matched_comp['cgpa_cutoff']} CGPA** (Backlogs: {matched_comp['max_backlogs']})
- **Roles Offered**: {', '.join(matched_comp['roles'])}
- **Hiring Window**: {', '.join(matched_comp['placement_years'])}

---

**DATA-BASED OBSERVATION**:
- {obs}
- **Key Required Tech Stack**: `{', '.join(matched_comp['required_skills'])}`

*Note: Remarks are grounded strictly in recorded college placement data. Culture, unrecorded salaries, or unverified claims are omitted.*"""

        return {
            "answer": answer_markdown,
            "metadata": {
                "company_name": matched_comp['name'],
                "query_type": "company_remarks"
            }
        }

career_engine = CareerEngineService()
