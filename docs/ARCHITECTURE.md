# Architecture Specifications — Intelligent Campus Career Agent

## Overview

The Intelligent Campus Career Agent uses a decoupled 3-tier architecture:
1. **Frontend Tier (React + Vite + Tailwind CSS)**: Single-page application providing Landing, Dashboard, AI Chat, Company Explorer, and Profile pages.
2. **Backend Tier (FastAPI + Pydantic + Pandas)**: RESTful API server managing request validation, session context, company search engine, skill analyzer, and Foundry integration adapter.
3. **AI & Knowledge Tier (Microsoft Foundry / Grounded Knowledge Base)**: Microsoft Azure AI Agent service connected to campus placement records or local structured dataset.

## Data Flow Diagram

```
User Query (React Chat UI)
       │
       ▼
POST /api/chat (FastAPI)
       │
  ┌────┴──────────────────────────┐
  │ Chat Router & Schema Validation │
  └────┬──────────────────────────┘
       │
  ┌────▼──────────────────────────┐
  │ Foundry Service Adapter       │
  │ (foundry_service.py)          │
  └────┬──────────────────────────┘
       │
  ┌────┴──────────────────────────┐
  │ Microsoft Foundry / Grounded   │
  │ Placement Knowledge Engine     │
  └────┬──────────────────────────┘
       │
  ┌────▼──────────────────────────┐
  │ Structured JSON Response      │
  │ - Answer text                 │
  │ - Relevant companies list     │
  │ - Required skills matrix      │
  │ - Custom study plan cards     │
  │ - Fact vs Observation remarks │
  └────┬──────────────────────────┘
       │
       ▼
Rendered Chat UI (React)
```
