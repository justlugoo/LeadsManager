from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from src.routers.users import users, auth_users
from src.routers.leads import leads

app = FastAPI(
    title="Lead Manager API",
    description="API for managing leads and users",
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://leadsmanager-frontend-577637376682.us-central1.run.app/"],  # Tu frontend
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],  # Todos los headers
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