from fastapi import Depends, APIRouter
from sqlalchemy import orm as _orm

from typing import List

from src.models import models as _models
from src.services import services as _services
from src.services.usersServices import users_services as _user_services
from src.services.usersServices import auth_users_services as _auth_users_services
from src.schemas import schemas as _schemas

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

@router.post("/", response_model=_schemas.User)
async def create_user(
    user: _schemas.UserCreate,
    db: _orm.Session = Depends(_services.get_db)
):
    return await _user_services.create_user(user, db)

@router.get("/", response_model=List[_schemas.User])
async def read_users(
    db: _orm.Session = Depends(_services.get_db),
    current_user: _schemas.User = Depends(_auth_users_services.get_current_user)
):
    return db.query(_models.User).all()


@router.get("/me")
async def get_user(user: _schemas.User = Depends(_auth_users_services.get_current_user)):
    return user