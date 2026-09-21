from fastapi import APIRouter, Query
from typing import Optional, List
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
