from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

load_dotenv()

from database import JsonDatabase
from routers import public


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.db = JsonDatabase("data")
    print("JSON/InstantDB Database initialised")
    os.makedirs("uploads", exist_ok=True)
    yield


os.makedirs("uploads", exist_ok=True)

app = FastAPI(title="DVein API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(public.router, prefix="/api/public")


@app.get("/")
async def root():
    dist_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "dist"))
    index_path = os.path.join(dist_dir, "index.html")
    if os.path.exists(index_path):
        from fastapi.responses import FileResponse
        return FileResponse(index_path, media_type="text/html")
    return {"message": "DVein FastAPI Backend Running"}


# Mount frontend static files (if present) to serve built assets.
dist_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "dist"))
if os.path.isdir(dist_dir):
    try:
        app.mount("/", StaticFiles(directory=dist_dir, html=True), name="frontend")
    except Exception:
        pass
