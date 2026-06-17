from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

load_dotenv()

from database import JsonDatabase
from routers import public

# Resolve the frontend dist directory once at startup
_DIST_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.db = JsonDatabase("data")
    print("JSON/InstantDB Database initialised")
    os.makedirs("uploads", exist_ok=True)
    yield


os.makedirs("uploads", exist_ok=True)

app = FastAPI(title="DVein API", lifespan=lifespan)

# BE-22: Restrict CORS to the production domain (or comma-separated list via env var)
_raw_origins = os.getenv("ALLOWED_ORIGINS", "https://dveininnovations.com,https://dvein-web.web.app")
ALLOWED_ORIGINS = [o.strip() for o in _raw_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Serve uploaded files ────────────────────────────────────────────────────────
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# ── Serve built frontend static assets (JS / CSS / images) ────────────────────
if os.path.isdir(_DIST_DIR):
    try:
        app.mount("/assets", StaticFiles(directory=os.path.join(_DIST_DIR, "assets")), name="assets")
    except Exception:
        pass

# ── API routes ─────────────────────────────────────────────────────────────────
app.include_router(public.router, prefix="/api/public")


# ── SPA catch-all — serves index.html for every non-API path ──────────────────
# This is critical for React Router (BrowserRouter): direct navigation to
# /training, /contact, /admin/login, etc. must return index.html so the
# client-side router can take over.
@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    # 1. Try the exact static file first (favicon.ico, robots.txt, etc.)
    candidate = os.path.join(_DIST_DIR, full_path)
    if os.path.isfile(candidate):
        return FileResponse(candidate)

    # 2. Fall back to index.html for all SPA routes
    index_path = os.path.join(_DIST_DIR, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path, media_type="text/html")

    # 3. Backend not yet built — return a helpful message
    return {"message": "Frontend not built. Run: cd frontend && npm run build"}
