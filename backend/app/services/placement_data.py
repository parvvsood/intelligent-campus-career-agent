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

    def get_all_companies() -> List[Dict[str, Any]]:
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
                (keyword == "data analyst" and any("analyst" in r for r in roles))):
                matched.append(comp)
        return matched

    def find_companies_by_cgpa(self, max_cutoff: float) -> List[Dict[str, Any]]:
        return [c for c in self.companies if c.get("numeric_cgpa", c.get("cgpa_cutoff", 0.0)) <= max_cutoff]

    def get_company_by_name(self, company_name: str) -> Optional[Dict[str, Any]]:
        name_lower = company_name.lower().strip()
        for comp in self.companies:
            if name_lower in comp.get("name", "").lower():
                return comp
        return None

placement_db = PlacementDataEngine()
