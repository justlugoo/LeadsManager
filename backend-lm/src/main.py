from fastapi import FastAPI
from src.routers.users import users, auth_users
from src.routers.leads import leads
app = FastAPI()

# Users routes
app.include_router(users.router, prefix="/api")
app.include_router(auth_users.router, prefix="/api")

# Leads routes

app.include_router(leads.router, prefix="/api")