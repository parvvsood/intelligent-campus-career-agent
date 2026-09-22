<div align="center">

# 🚀 SkillRouter — Intelligent Campus Career Agent 🎓⚡

> **A premium, AI-powered university career guidance & placement analytics platform.**  
> Powered by **Microsoft Azure AI Foundry (`gpt-5.1`)**, **FastAPI**, and **React + Vite**.

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Azure AI Foundry](https://img.shields.io/badge/AI_Engine-Azure_AI_Foundry-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white)](https://azure.microsoft.com/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

</div>

## 📌 Table of Contents
- [🌟 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🏗️ System Architecture](#️-system-architecture)
- [🛠️ Technology Stack](#️-technology-stack)
- [🚀 Quick Start & Installation](#-quick-start--installation)
  - [Prerequisites](#prerequisites)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Backend Setup (FastAPI)](#2-backend-setup-fastapi)
  - [3. Frontend Setup (React + Vite)](#3-frontend-setup-react--vite)
- [🔐 Environment Configuration](#-environment-configuration)
- [📡 API Documentation Matrix](#-api-documentation-matrix)
- [🧪 Testing & Quality Verification](#-testing--quality-verification)
- [📄 License & Roadmap](#-license--roadmap)

---

## 🌟 Overview

**SkillRouter** bridges the gap between raw university campus placement data and student preparation. Instead of manually combing through unorganized Excel spreadsheets, students can interact with a live **Microsoft Azure AI Foundry Agent** (`CAMPUS-PLACEMENT-ASSISTENT:2`) grounded in verified campus recruitment statistics.

Students get instant, data-backed insights regarding:
- 📊 **Company Recruitment Records**: CGPA cutoffs, package ranges (LPA), visiting years, and eligibility criteria.
- 🎯 **Skill Gap Analysis**: Matching student profiles against historical hiring patterns.
- 📅 **Custom Study Roadmaps**: Step-by-step 30-day or 60-day preparation sequences for targeted technical roles.
- 👤 **Academic Profile Sync**: Registration-style profile management with real-time navbar badge updates and backend persistence.

---

## ✨ Key Features

### 💬 1. Intelligent AI Career Chat (`SkillRouter Engine`)
- **Direct Azure AI Foundry Integration**: Connected to live `CAMPUS-PLACEMENT-ASSISTENT:2` using Azure AI Projects SDK.
- **Context-Aware Responses**: Automatically injects student degree, specialization, CGPA, and target roles into prompt execution.
- **Persistent Chat History**: Stores isolated chat sessions per student account in `localStorage`, maintaining conversations seamlessly across page reloads (<kbd>F5</kbd>).
- **Token Protection Guard**: Requires authenticated student login to protect Azure AI Foundry API tokens.

### 🏢 2. Interactive Company Explorer
- Multi-parameter filtering by **Domain** (AI/ML, SDE, Data Science, DevOps), **CGPA Threshold**, **Salary Package Range (LPA)**, and **Recruitment Year**.
- Detailed company detail drawers displaying eligibility remarks, required technical stacks, and visiting history.

### 👤 3. Academic & Career Profile Manager
- **Registration-Style Dropdowns**: Select Branch, Graduation Year (*2024–2028*), and Specialization Track (*AI & Machine Learning*, *AI & Future Technologies*, *Core Stream / General*).
- **50+ Categorized Technical Skill Selector**: Interactive search filter, category groupings (*Programming Languages*, *Web & Cloud*, *AI/ML & Data*, *Core CS*), custom skill entries, and skill summary counters.
- **Interactive Role & Location Chips**: Click-to-toggle target roles and preferred work locations.
- **Real-Time Header Badge Sync**: Profile updates instantly reflect in the navbar user badge and persist in backend storage (`PUT /api/auth/profile`).

### 🔐 4. Student Authentication & Modals
- Clean Login and Sign-Up modals with instant email/password validation.
- Responsive **Logout Re-verification Modal** with backdrop blur (`backdrop-blur-md`) and bold red action button.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          REACT + VITE FRONTEND (SkillRouter)                │
│       (Tailwind CSS, Framer Motion, Lucide Icons, Modern Dark Theme)        │
│                                                                             │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│   │ Landing Page │  │  Career Chat │  │ Co. Explorer │  │ Profile Mgmt │    │
│   └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ HTTP / JSON REST API
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                             FASTAPI BACKEND SERVER                          │
│                                                                             │
│  ┌─────────────────────────┐      ┌──────────────────────────────────────┐  │
│  │ API Endpoints           │      │ Business & Data Services             │  │
│  │  - POST /api/chat       │ ───► │  - Foundry Service Adapter           │  │
│  │  - GET  /api/companies  │      │  - Career Engine (Local Fallback)    │  │
│  │  - POST /api/auth/login │      │  - Placement Knowledge Base (Excel)  │  │
│  │  - PUT  /api/auth/prof  │      │  - User Authentication & Storage     │  │
│  └─────────────────────────┘      └──────────────────────────────────────┘  │
│                                                       │                     │
│                                                       ▼ (asyncio.to_thread) │
│                                   ┌──────────────────────────────────────┐  │
│                                   │ Azure AI Projects SDK Adapter        │  │
│                                   └───────────────────┬──────────────────┘  │
└───────────────────────────────────────────────────────┼─────────────────────┘
                                                        │ Azure HTTPS API
                                                        ▼
                                    ┌──────────────────────────────────────┐
                                    │    MICROSOFT AZURE AI FOUNDRY AGENT  │
                                    │     (CAMPUS-PLACEMENT-ASSISTENT:2)   │
                                    └──────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technologies & Tools |
|---|---|
| **Frontend UI** | React 18, Vite 6, Tailwind CSS, Framer Motion, Lucide React, Axios |
| **Backend Server** | Python 3.12, FastAPI, Uvicorn, Pydantic v2, Pandas |
| **AI Agent Service** | Microsoft Azure AI Agent Service (`gpt-5.1`), Azure AI Projects SDK |
| **Authentication** | JWT Token Sessions, Local Storage Sync, Password Hashing |
| **Testing & Quality** | Pytest 8, Vite Production Compiler, ESLint |

---

## 🚀 Quick Start & Installation

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **Python**: v3.10 or higher
- **Git**

### 1. Clone Repository
```bash
git clone https://github.com/parvvsood/skillRouter-CampusPlacement-Agent.git
cd skillRouter-CampusPlacement-Agent
```

### 2. Backend Setup (FastAPI)
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env

# Start FastAPI Uvicorn Server
py -3 -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
> 📍 **Backend API running at**: `http://127.0.0.1:8000`  
> 📑 **Swagger API Docs**: `http://127.0.0.1:8000/docs`

### 3. Frontend Setup (React + Vite)
Open a new terminal window:
```bash
cd frontend

# Install Node dependencies
npm install

# Start Vite Development Server
npm run dev
```
> 🌐 **Frontend Application running at**: `http://localhost:5173`

---

## 🔐 Environment Configuration

Create a `.env` file in the `backend/` directory based on `.env.example`:

```env
HOST=127.0.0.1
PORT=8000
CORS_ORIGINS=http://localhost:5173

# Azure AI Foundry Configuration
FOUNDRY_PROJECT_ENDPOINT=https://pranjal2961beai24-3888-resource.services.ai.azure.com/api/projects/pranjal2961beai24-3888
FOUNDRY_AGENT_ID=CAMPUS-PLACEMENT-ASSISTENT:2
FOUNDRY_AGENT_NAME=CAMPUS-PLACEMENT-ASSISTENT
FOUNDRY_AGENT_VERSION=2
FOUNDRY_API_KEY=your_azure_ai_foundry_api_key

# Set to true for offline / local fallback mode
USE_MOCK_FOUNDRY_FALLBACK=false
```

---

## 📡 API Documentation Matrix

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/chat` | Send query to Azure AI Foundry Agent with student context | Yes |
| `GET` | `/api/companies` | Fetch placement companies with domain & CGPA filtering | No |
| `POST` | `/api/auth/register` | Register new student account | No |
| `POST` | `/api/auth/login` | Authenticate student credentials | No |
| `PUT` | `/api/auth/profile` | Update academic profile, skills, and preferences | Yes |
| `GET` | `/api/health` | Backend service health check | No |

---

## 🧪 Testing & Quality Verification

### Run Backend Unit & Integration Tests
```bash
cd backend
py -3 -m pytest
```
> ✅ **10/10 Tests Passing** across authentication, company explorer, grounded career engine, and Azure AI Foundry adapter.

### Run Frontend Production Build
```bash
cd frontend
npm run build
```
> ⚡ **Vite Production Build Clean** (0 errors).

---

## 📄 License & Roadmap

Distributed under the **MIT License**. Designed for university placement cells, career guidance departments, and student placement assistance programs.

Developed with ❤️ by **Parv Sood**.
