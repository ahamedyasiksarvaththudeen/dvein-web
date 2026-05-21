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
    return {"message": "DVein FastAPI Backend Running"}
