# DVein Innovations — Project Setup & Working Instructions

## Overview

This is a full-stack web application:

- **Frontend** — React 19 + Vite + TailwindCSS (served on port 5173 in dev)
- **Backend** — FastAPI + Uvicorn, JSON-file database (served on port 5000 in dev)
- **Admin Panel** — Browser-based CMS at `/admin/cms` (data stored in browser localStorage / IndexedDB)

---

## Prerequisites

| Tool | Minimum Version | Check command |
|------|----------------|---------------|
| Node.js | 18+ | `node -v` |
| npm | 9+ | `npm -v` |
| Python | 3.10+ | `python --version` |

---

## 1. Clone / Open the Project

```
project root/
├── frontend/          ← React app
├── python_backend/    ← FastAPI backend
├── SETUP.md           ← this file
└── README.md
```

---

## 2. Backend Setup

```bash
cd python_backend
```

### Create & activate virtual environment

**Windows:**
```bash
python -m venv .venv
.venv\Scripts\activate
```

**macOS / Linux:**
```bash
python3 -m venv .venv
source .venv/bin/activate
```

### Install dependencies

```bash
pip install -r requirements.txt
```

### Configure environment variables

Copy the example env file and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Required only for contact form / job application emails
SMTP_HOST=smtp-relay.brevo.com     # or smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_smtp_password
COMPANY_EMAIL=info@dveininnovations.com
```

> **Email is optional.** If `EMAIL_USER` is not set, the backend still runs normally — form submissions are saved to `data/applications.json` but no emails are sent.

### Run the backend

```bash
uvicorn main:app --host 0.0.0.0 --port 5000 --reload
```

Backend is now running at **http://localhost:5000**

API endpoints available:
- `GET  /api/public/jobs`
- `GET  /api/public/services`
- `GET  /api/public/trainings`
- `GET  /api/public/products`
- `GET  /api/public/success-stories`
- `GET  /api/public/training-page`
- `POST /api/public/apply`
- `POST /api/public/contact`

---

## 3. Frontend Setup

Open a **new terminal**, then:

```bash
cd frontend
npm install
npm run dev
```

Frontend is now running at **http://localhost:5173**

> The Vite dev server automatically proxies all `/api` and `/uploads` requests to `http://localhost:5000`, so both servers must be running for full functionality.

---

## 4. Admin Panel

### Login

Navigate to: **http://localhost:5173/admin**

| Field | Value |
|-------|-------|
| Email | `admin@dveininnovations.com` |
| Password | `dvein@admin2025` |

### How it works

- Changes saved in the admin panel are stored in the **browser's localStorage** (falls back to IndexedDB for large data like uploaded images).
- Data **persists across browser restarts and server restarts** — it lives in the browser, not the server.
- Logging out does **not** clear your saved content.
- The "Reset to Default" button on each section reverts only that section to the built-in defaults.

### What you can edit

Every page section is editable from the CMS panel:
- Hero slides (image, text, buttons)
- Welcome section, Stats, How We Do It, Why Choose Us
- Testimonials, Meet the Team, Footer
- Internships, Courses, Products, Student Projects, Software Solutions
- Our Story, Collaborations, Career Hub, Contact details

---

## 5. Production Build

### Build the frontend

```bash
cd frontend
npm run build
```

This creates `frontend/dist/`. The FastAPI backend automatically serves these static files — so **a single `uvicorn` process serves the entire app** in production.

### Run production server

```bash
cd python_backend
uvicorn main:app --host 0.0.0.0 --port 5000
```

Visit **http://localhost:5000** — the full app is served from the backend.

---

## 6. Deploy to Render

1. Push code to GitHub.
2. Create a new **Web Service** on [render.com](https://render.com).
3. Set **Root Directory** to `python_backend`.
4. Build command: `pip install -r requirements.txt`
5. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add environment variables: `EMAIL_USER`, `EMAIL_PASS`, `COMPANY_EMAIL` (optional).

> **Note:** Build the frontend (`npm run build`) and commit `frontend/dist/` before deploying so the backend can serve the static files.

---

## 7. Project Data Files

All backend data is stored as JSON files in `python_backend/data/`:

| File | Contents |
|------|----------|
| `jobs.json` | Job listings shown on Career Hub |
| `services.json` | Services shown on the Services page |
| `trainings.json` | Training modules |
| `products.json` | Products listing |
| `applications.json` | Job applications submitted by users |
| `success_stories.json` | Success stories (auto-created on first submission) |

These files are the database — back them up to preserve data.

---

## 8. Troubleshooting

| Problem | Fix |
|---------|-----|
| Frontend shows CORS error | Make sure backend is running on port 5000 |
| Admin panel changes lost | Do NOT clear browser storage / localStorage |
| Email not sending | Check `.env` credentials; email is optional |
| Port 5000 already in use | Change port: `uvicorn main:app --port 5001` and update `vite.config.js` proxy target |
| `npm install` fails | Delete `node_modules/` and `package-lock.json`, then retry |
| Python `ModuleNotFoundError` | Activate venv first: `.venv\Scripts\activate` (Windows) |

---

## Quick Start (one-liner summary)

```bash
# Terminal 1 — Backend
cd python_backend && pip install -r requirements.txt && uvicorn main:app --port 5000 --reload

# Terminal 2 — Frontend
cd frontend && npm install && npm run dev
```

Then open **http://localhost:5173**
