from fastapi import FastAPI, APIRouter
from src.routers.users import users, auth_users
from src.routers.leads import leads

app = FastAPI(
    title="Lead Manager API",
    description="API for managing leads and users",
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


app.include_router(api_router)          # Agregar el router principal a la app
