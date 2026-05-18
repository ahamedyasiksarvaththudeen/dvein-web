# DVein Innovations — Project Documentation

## Overview
Full-stack web application for DVein Innovations, a Chennai-based IT company offering software development, training/internships, and student project services.

## Tech Stack

### Frontend
- **React 19** + **Vite 7** (port 5173)
- **Tailwind CSS** with custom colors (`dveinBlue: #0056D2`, `dveinGreen: #10B981`)
- **Framer Motion** for animations
- **React Router v7** for routing
- **react-icons** v5.5.0 (use `react-icons/fa` and `react-icons/fa6` for FaXTwitter)

### Backend
- **FastAPI** (Python) + **Uvicorn** (port 5000)
- **Motor** (async MongoDB) for database
- **JWT** authentication for admin
- **python-dotenv** for environment variables

## Running Locally

```bash
# Backend (from python_backend/)
python -m uvicorn main:app --host 0.0.0.0 --port 5000 --reload

# Frontend (from frontend/)
npm install
npm run dev
```

Or double-click the batch files from the project root:
- `start_backend.bat` — starts FastAPI backend
- `start_project.bat` — starts Vite frontend

## Project Structure

```
dvein.update1/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnimatedRoadmap.jsx   # Reusable animated roadmap/timeline
│   │   │   ├── Footer.jsx            # Site footer with social links
│   │   │   ├── Navbar.jsx            # Navigation with hidden admin login
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.jsx              # Landing page
│   │   │   ├── Training.jsx          # Internship/training page
│   │   │   ├── CoursesPage.jsx       # Academy/courses page
│   │   │   ├── SoftwareSolutions.jsx # Software services page
│   │   │   ├── StudentProjects.jsx   # Student projects hub
│   │   │   ├── Collaborations.jsx    # Enterprise collaboration
│   │   │   ├── CareerHub.jsx         # Career opportunities
│   │   │   └── Admin/               # Admin dashboard (JWT protected)
│   │   └── App.jsx                  # Router setup
│   ├── tailwind.config.js           # Custom colors config
│   └── vite.config.js
├── python_backend/
│   ├── main.py                      # FastAPI entry point
│   ├── routers/                     # API route handlers
│   ├── database.py                  # MongoDB connection
│   ├── auth_utils.py               # JWT helpers
│   └── requirements.txt
├── start_project.bat               # Launches Vite frontend
├── start_backend.bat               # Launches FastAPI (uses python -m uvicorn)
└── CLAUDE.md                       # This file
```

## Key Routes

| URL | Component | Notes |
|-----|-----------|-------|
| `/` | Home.jsx | Landing page |
| `/services/software` | SoftwareSolutions.jsx | Animated roadmap |
| `/services/courses` | CoursesPage.jsx | Academy + animated roadmap |
| `/training` | Training.jsx | Internship application |
| `/student-projects` | StudentProjects.jsx | Animated roadmap |
| `/collaboration` | Collaborations.jsx | Enterprise collab |
| `/career-hub` | CareerHub.jsx | Jobs |
| `/contact` | Contact.jsx | Contact form |
| `/admin-dashboard` | Dashboard.jsx | Admin panel (JWT) |

## Important Details

### Admin Login
Hidden behind clicking the DVein logo in the Navbar. Opens a modal with username/password. Calls `POST /api/auth/admin/login`. On success stores JWT in `localStorage.adminToken` and navigates to `/admin-dashboard`.

### Forms & Applications
- **Internship Apply Now** → opens `https://forms.gle/GEWGy11JyF1mBuMe6`
- **Browse Curriculum / Enroll Now** → opens `https://forms.gle/GEWGy11JyF1mBuMe6`
- WhatsApp fallback: `https://wa.me/919500181230`
- Email: `info@dveininnovations.com`

### Social Links
- Facebook: `https://www.facebook.com/share/1752aXvNUP/`
- Instagram: `https://www.instagram.com/dvein_innovations`
- LinkedIn: `https://www.linkedin.com/company/dvein-innovations/`
- Twitter/X: `https://x.com/dveininnovation`

### Contact
- Phone: `+91 95001 81230` (tel link opens dialpad)
- Email: `info@dveininnovations.com` (mailto link opens mail client)
- Address: Alpha City IT Park, No.25, OMR, Navalur, Chennai – 600130

### Known Issues
- `pip.exe` is blocked by Device Guard policy on this machine — always use `python -m uvicorn` and `python -m pip` instead of the script executables.

## GitHub Repository
`https://github.com/Prasanth-T30/Dvein.git` (branch: `main`)

## Tailwind Custom Colors
```js
// tailwind.config.js
colors: {
  dveinBlue: '#0056D2',
  dveinGreen: '#10B981',
}
```
