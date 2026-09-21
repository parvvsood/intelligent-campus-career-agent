import json
import os
import uuid
import hashlib
from typing import Dict, Any, Optional, List

class AuthService:
    def __init__(self, data_path: str = "app/data/users.json"):
        self.data_path = data_path
        self.users: Dict[str, Dict[str, Any]] = {}
        self._load_users()

    def _load_users(self):
        if not os.path.exists(self.data_path):
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            alt_path = os.path.join(base_dir, "data", "users.json")
            if os.path.exists(alt_path):
                self.data_path = alt_path

        if os.path.exists(self.data_path):
            try:
                with open(self.data_path, "r", encoding="utf-8") as f:
                    self.users = json.load(f)
            except Exception as e:
                print(f"[AuthService] Error loading users: {e}")
                self.users = {}
        else:
            # Initialize with default student account
            default_id = "user-default-101"
            self.users = {
                "alex@campus.edu": {
                    "id": default_id,
                    "email": "alex@campus.edu",
                    "password_hash": self._hash_password("password123"),
                    "name": "Alex Student",
                    "rollNumber": "2210991234",
                    "branch": "Computer Science & Engineering",
                    "cgpa": 8.7,
                    "graduationYear": 2026,
                    "skills": ["Python", "SQL", "Data Analysis", "React", "Machine Learning"],
                    "preferredRoles": ["Data Analyst", "AI/ML Engineer"],
                    "preferredLocations": ["Bangalore", "Gurugram", "Hyderabad", "Remote"]
                }
            }
            self._save_users()

    def _save_users(self):
        os.makedirs(os.path.dirname(self.data_path), exist_ok=True)
        try:
            with open(self.data_path, "w", encoding="utf-8") as f:
                json.dump(self.users, f, indent=2)
        except Exception as e:
            print(f"[AuthService] Error saving users: {e}")

    def _hash_password(self, password: str) -> str:
        return hashlib.sha256(password.encode("utf-8")).hexdigest()

    def register_user(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        email = str(user_data.get("email", "")).lower().strip()
        if not email:
            raise ValueError("Email address is required for registration.")

        existing_user = self.users.get(email, {})
        user_id = existing_user.get("id") or f"user-{uuid.uuid4().hex[:8]}"
        password_str = str(user_data.get("password", "password123"))
        password_hash = self._hash_password(password_str)

        new_user = {
            "id": user_id,
            "email": email,
            "password_hash": password_hash,
            "name": str(user_data.get("name", "Student")),
            "rollNumber": str(user_data.get("rollNumber", "")),
            "branch": str(user_data.get("branch", "Computer Science & Engineering")),
            "specialization": str(user_data.get("specialization", "Core Stream / General")),
            "cgpa": float(user_data.get("cgpa", 8.0)),
            "graduationYear": int(user_data.get("graduationYear", 2028)),
            "skills": list(user_data.get("skills", [])),
            "preferredRoles": list(user_data.get("preferredRoles", [])),
            "preferredLocations": list(user_data.get("preferredLocations", []))
        }

        self.users[email] = new_user
        self._save_users()
        return new_user

    def authenticate_user(self, email: str, password: str) -> Optional[Dict[str, Any]]:
        email_clean = email.lower().strip()
        user = self.users.get(email_clean)
        if not user:
            return None

        if user["password_hash"] == self._hash_password(password):
            return user
        return None

    def get_user_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        return self.users.get(email.lower().strip())

    def update_user_profile(self, email: str, profile_data: Dict[str, Any]) -> Dict[str, Any]:
        email_clean = email.lower().strip()
        if email_clean not in self.users:
            raise ValueError("User not found.")

        user = self.users[email_clean]
        for key in ["name", "rollNumber", "branch", "specialization", "cgpa", "graduationYear", "skills", "preferredRoles", "preferredLocations"]:
            if key in profile_data and profile_data[key] is not None:
                user[key] = profile_data[key]

        self.users[email_clean] = user
        self._save_users()
        return user

auth_service = AuthService()
