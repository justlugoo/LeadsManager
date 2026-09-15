from src.utils.env import load_dotenv

load_dotenv()

import os
from contextlib import asynccontextmanager

from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from src.routers.users import users, auth_users
from src.routers.leads import leads
from src.services.services import create_database


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_database()
    yield


app = FastAPI(
    title="Lead Manager API",
    description="API for managing leads and users",
    lifespan=lifespan,
)

# Orígenes permitidos por CORS, configurables por entorno (coma-separados).
_default_origins = "http://localhost:5173,http://localhost:3000"
cors_origins = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", _default_origins).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Lead Manager API is running"}

# Crear un router principal para /api
api_router = APIRouter(prefix="/api")

# Agregar todos los sub-routers (sin prefix repetido)
api_router.include_router(users.router)
api_router.include_router(auth_users.router)
api_router.include_router(leads.router)

app.include_router(api_router)  # Agregar el router principal a la app
