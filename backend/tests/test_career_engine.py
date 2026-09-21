import pytest
from app.services.career_engine import career_engine
from app.services.placement_data import placement_db

def test_placement_db_loaded():
    companies = placement_db.get_all_companies()
    assert len(companies) >= 5

def test_company_recommendation_query():
    res = career_engine.process_query("Which companies hire for Data Analyst roles?")
    assert "Deloitte" in res["answer"] or "Data Analyst" in res["answer"]
    assert "metadata" in res
    assert "companies" in res["metadata"]
