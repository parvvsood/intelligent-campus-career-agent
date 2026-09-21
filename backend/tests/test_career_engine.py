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

def test_skill_study_plan_query():
    res = career_engine.process_query("What skills should I prepare for Data Analyst placements and give me a study plan?")
    assert "SQL" in res["answer"]
    assert "metadata" in res
    assert "studyPlan" in res["metadata"]
    assert len(res["metadata"]["studyPlan"]) >= 3

def test_company_remarks_query():
    res = career_engine.process_query("What are your remarks about Deloitte?")
    assert "FACT" in res["answer"]
    assert "OBSERVATION" in res["answer"]
    assert "Deloitte" in res["answer"]
