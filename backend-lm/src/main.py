from fastapi import FastAPI
from src.routers.users import users, auth_users
app = FastAPI()

# Users routes
app.include_router(users.router, prefix="/api")
app.include_router(auth_users.router, prefix="/api")