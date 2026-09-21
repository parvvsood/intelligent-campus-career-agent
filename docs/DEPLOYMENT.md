# Production Deployment Guide — Intelligent Campus Career Agent

## Overview

The Intelligent Campus Career Agent platform is designed for containerized deployment or standalone dual-tier execution (React Frontend + FastAPI Backend).

---

## Containerized Deployment (Docker)

### Build & Run via Docker Compose
```bash
docker-compose up -d --build
```
Access the application at `http://localhost:8000`.

---

## Standalone Deployment

### 1. Backend (FastAPI + Uvicorn)
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### 2. Frontend (Vite Static Build)
```bash
cd frontend
npm install
npm run build
```
Serve the `dist/` directory using NGINX, Vercel, Netlify, or Azure Static Web Apps.

---

## Environment Variable Checklist

| Variable | Description | Production Value |
|---|---|---|
| `FOUNDRY_PROJECT_ENDPOINT` | Microsoft Foundry Agent project URL | `https://<your-project>.cognitiveservices.azure.com/` |
| `FOUNDRY_AGENT_ID` | Microsoft Foundry Agent identifier | `agent-campus-career-v1` |
| `AZURE_TENANT_ID` | Azure Active Directory Tenant ID | Production Azure Tenant ID |
| `AZURE_CLIENT_ID` | Azure Service Principal Client ID | Production Client ID |
| `AZURE_CLIENT_SECRET` | Azure Service Principal Secret | Secure Secret |
| `USE_MOCK_FOUNDRY_FALLBACK` | Grounded dataset fallback mode | `false` (for live Azure API) |
