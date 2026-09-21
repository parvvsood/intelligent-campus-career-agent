# Intelligent Campus Career Agent 🎓⚡

> A premium, AI-powered campus career guidance platform designed to help university students explore campus placement statistics, analyze role-based skill gaps, generate step-by-step preparation plans, and interact with data-grounded company insights powered by Microsoft Foundry & FastAPI.

---

## 🌟 Overview

The **Intelligent Campus Career Agent** bridges the gap between campus placement data and student preparation. Rather than manually parsing spreadsheets or relying on unverified advice, students can converse with an intelligent career assistant to get instant, data-backed answers about campus recruiters, CGPA cutoffs, package ranges, skill requirements, customized study plans, and historical hiring trends.

---

## 🏗️ Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                          REACT + VITE FRONTEND                         │
│   (Tailwind CSS, Framer Motion, Lucide Icons, Modern Conversational UI) │
│                                                                        │
│   ┌──────────────┐ ┌────────────────┐ ┌──────────┐ ┌──────────────┐   │
│   │ Landing Page │ │ Career Dash    │ │ AI Chat  │ │ Co. Explorer │   │
│   └──────────────┘ └────────────────┘ └──────────┘ └──────────────┘   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / JSON API
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                             FASTAPI BACKEND                            │
│                                                                        │
│  ┌─────────────────────────┐     ┌──────────────────────────────────┐  │
│  │ API Layer               │     │ Business & Data Services         │  │
│  │ POST /api/chat          │ ──► │ - Career Engine Service          │  │
│  │ GET  /api/companies     │     │ - Placement Knowledge Base       │  │
│  │ GET  /api/student/profile│    │   (Excel / Grounded Datasets)   │  │
│  │ POST /api/student/profile│    │ - Skill Analysis & Study Plan    │  │
│  └─────────────────────────┘     └──────────────────────────────────┘  │
│                                                   │                    │
│                                                   ▼                    │
│                                  ┌──────────────────────────────────┐  │
│                                  │ Foundry Integration Service      │  │
│                                  │ (foundry_service.py)             │  │
│                                  └────────────────┬─────────────────┘  │
└───────────────────────────────────────────────────┼────────────────────┘
                                                    │ Azure SDK / REST
                                                    ▼
                                   ┌──────────────────────────────────┐
                                   │      MICROSOFT FOUNDRY AGENT     │
                                   │  (Connected Placement Knowledge) │
                                   └──────────────────────────────────┘
```

---

## 🚀 Key Features

1. **AI Career Chat Interface**:
   - Claude-inspired clean conversational UI with dark/light aesthetics.
   - Real-time response rendering with Markdown tables, skill badges, and step-by-step study plans.
   - Contextual conversation management with session isolation and prompt suggestions.

2. **Company Explorer**:
   - Interactive filtering by domain (Data Analyst, AI/ML, SDE, DevOps), CGPA threshold, salary package range, location, and recruitment year.
   - Data-grounded company remarks with strict distinction between verified facts and analytical observations.

3. **Student Profile Customization**:
   - Branch, CGPA, graduation year, existing skills, target roles, and preferred locations.
   - Dynamic context injection into career chat sessions for personalized advice.

4. **Skill Analysis & Study Planner**:
   - Automated skill gap analysis comparing student profile against company placement criteria.
   - Milestone-based preparation sequences with recommended topics and practice areas.

5. **Microsoft Foundry & Azure Service Integration**:
   - Direct service adapter (`foundry_service.py`) routing queries to Microsoft Foundry Agents.
   - Dual-mode architecture: Live Azure API mode + Embedded Grounded Knowledge Engine for offline/test environments.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Lucide React Icons, Axios.
- **Backend**: Python 3.12, FastAPI, Uvicorn, Pydantic, Pandas.
- **AI Integration**: Microsoft Azure AI Agent Service / Microsoft Foundry SDK.
- **Testing & Quality**: Pytest, ESLint, Vite Build, GitHub Actions / Issues.

---

## 📁 Repository Structure

```
intelligent-campus-career-agent/
├── .env.example              # Root environment template
├── .gitignore                 # Secrets and build ignore rules
├── README.md                  # Project documentation
├── docs/                      # Architecture diagrams and issue logs
│   ├── ARCHITECTURE.md
│   └── ISSUE_TRACKER.md
├── tests/                     # Integration tests
│   └── README.md
├── frontend/                  # React + Vite application
│   ├── src/
│   │   ├── components/       # Landing, Dashboard, Chat, Company, Profile
│   │   ├── pages/            # Home, Dashboard, Chat, Companies, Profile
│   │   ├── services/         # API integrations
│   │   └── context/          # State management
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── backend/                   # FastAPI application
    ├── app/
    │   ├── api/              # API router endpoints
    │   ├── services/         # Foundry service & Placement data engine
    │   ├── models/           # Pydantic data schemas
    │   ├── data/             # Grounded campus placement datasets
    │   └── main.py           # FastAPI entrypoint
    ├── requirements.txt
    └── tests/                 # Backend pytest test suite
```

---

## 💻 Setup Instructions

### Prerequisites
- Node.js v18+ and npm v9+
- Python 3.10+
- Git

### Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```
Backend API server running at `http://localhost:8000` (Docs: `http://localhost:8000/docs`).

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend application running at `http://localhost:5173`.

---

## 🔐 Environment Variables

Key configuration variables defined in `.env.example`:

| Variable | Description | Default / Example |
|---|---|---|
| `HOST` | Backend server host | `0.0.0.0` |
| `PORT` | Backend server port | `8000` |
| `CORS_ORIGINS` | Allowed frontend origins | `http://localhost:5173` |
| `FOUNDRY_PROJECT_ENDPOINT` | Microsoft Foundry project URL | `https://your-foundry.cognitiveservices.azure.com/` |
| `FOUNDRY_AGENT_ID` | Microsoft Foundry agent ID | `agent-campus-career-v1` |
| `USE_MOCK_FOUNDRY_FALLBACK` | Fallback to local grounded dataset | `true` |

---

## 📋 Development Workflow & Issues

Development is executed sequentially across 18 tracked GitHub Issues (#1 to #18).
Refer to [docs/ISSUE_TRACKER.md](file:///docs/ISSUE_TRACKER.md) for the complete issue roadmap and assigned sub-agent roles.

---

## 📄 License

MIT License. Designed for university placement cells and career guidance programs.
