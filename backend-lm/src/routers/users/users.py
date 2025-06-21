from fastapi import Depends, APIRouter
from sqlalchemy import orm as _orm

from typing import List

from ...models import User
from ...services import services as _services
from ...services import users_services as _user_services
from ...services import auth_users_services as _auth_users_services
from ...schemas import User as UserSchema, UserCreate
from ...schemas.users.auth_schema import Token

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

@router.post("/", response_model=Token)
async def register_user(
    user: UserCreate,
    db: _orm.Session = Depends(_services.get_db)
):
    created_user = await _user_services.create_user(user, db)
    return await _auth_users_services.create_token(created_user)

@router.get("/", response_model=List[UserSchema])
async def read_users(
    db: _orm.Session = Depends(_services.get_db),
    current_user: UserSchema = Depends(_auth_users_services.get_current_user)
):
    return db.query(User).all()

@router.get("/me")
async def get_user(user: UserSchema = Depends(_auth_users_services.get_current_user)):
    return user
