# React + Next.js + FastAPI + Carbon Design System Template

This project is a template for building web applications using Next.js (React) for the frontend, FastAPI for the backend, and IBM's Carbon Design System for the UI components.

## Project Structure

- `frontend/`: The Next.js React application.
- `backend/`: The FastAPI Python backend application.

## Prerequisites

- Node.js (v18+)
- Python (v3.9+)

## Getting Started

### 1. Backend (FastAPI)

1. Navigate to the backend directory:
   `cd backend`

2. Create and activate a virtual environment (optional but recommended):
   `python -m venv venv`
   `source venv/bin/activate`

3. Install the dependencies:
   `pip install -r requirements.txt`

4. Start the FastAPI development server:
   `uvicorn main:app --reload --port 8000`

   The backend will be available at `http://localhost:8000`.

### 2. Frontend (Next.js)

1. Navigate to the frontend directory:
   `cd frontend`

2. Install the dependencies:
   `npm install`

3. Start the Next.js development server:
   `npm run dev`

   The frontend will be available at `http://localhost:3000`.

## Configuration

By default, the frontend is configured to communicate with the backend running on `http://localhost:8000`. If you change the backend port or URL, you can configure it in `frontend/config.ts`.

## Available Pages

- `/login`: A mock authentication login page.
- `/dashboard`: A mock dashboard displaying data using the Carbon Design System `DataTable`.
