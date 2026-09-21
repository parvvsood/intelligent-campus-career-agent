# Intelligent Campus Career Agent — Test Suite

This directory contains integration and end-to-end tests for the Intelligent Campus Career Agent platform.

## Test Categories

1. **Backend Tests** (`backend/tests/`):
   - Health check endpoints (`/api/health`)
   - Chat endpoint validation (`/api/chat`)
   - Placement data engine queries (`career_engine.py`)
   - Foundry service fallback adapter (`foundry_service.py`)

2. **Frontend Tests & Build Verification** (`frontend/`):
   - JSX syntax & component compilation (`npm run build`)
   - State management and API contract compatibility

## Running Tests

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Build Test
```bash
cd frontend
npm run build
```
