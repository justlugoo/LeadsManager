from fastapi import Depends, APIRouter
from sqlalchemy import orm as _orm

from typing import List

from src.models import User
from src.services import services as _services
from src.services.users import users_services as _user_services
from src.services.users import auth_users_services as _auth_users_services
from src.schemas import User as UserSchema, UserCreate

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

@router.post("/", response_model=UserSchema)
async def create_user(
    user: UserCreate,
    db: _orm.Session = Depends(_services.get_db)
):
    return await _user_services.create_user(user, db)

@router.get("/", response_model=List[UserSchema])
async def read_users(
    db: _orm.Session = Depends(_services.get_db),
    current_user: UserSchema = Depends(_auth_users_services.get_current_user)
):
    return db.query(User).all()


@router.get("/me")
async def get_user(user: UserSchema = Depends(_auth_users_services.get_current_user)):
    return user
