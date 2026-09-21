from fastapi import APIRouter, Query, Body
from typing import Optional, List, Dict, Any
from app.services.placement_data import placement_db

router = APIRouter()

@router.get("/companies", tags=["Companies"])
async def get_companies(
    role: Optional[str] = Query(None, description="Filter by role domain"),
    max_cgpa: Optional[float] = Query(None, description="Maximum CGPA threshold")
):
    companies = placement_db.get_all_companies()
    if role and role.strip() and role != "All":
        companies = placement_db.find_companies_by_role(role)
    if max_cgpa is not None:
        companies = [c for c in companies if c.get("cgpa_cutoff", 0.0) <= max_cgpa]

    return {
        "count": len(companies),
        "companies": companies
    }

@router.post("/career-paths", tags=["Companies"])
async def get_recommended_career_paths(payload: Dict[str, Any] = Body(...)):
    skills = payload.get("skills", ["Python", "SQL", "Data Analysis"])
    cgpa = payload.get("cgpa", 8.0)
    paths = placement_db.get_dynamic_career_paths(student_skills=skills, student_cgpa=cgpa)
    return {
        "count": len(paths),
        "career_paths": paths
    }
