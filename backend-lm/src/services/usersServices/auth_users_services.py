from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import orm as _orm
import jwt as _jwt

from src.services.usersServices.users_services import get_user_by_email
from src.models import models as _models
from src.schemas import schemas as _schemas
from src.services import services as _services

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

JWT_SECRET = 'secretary'

async def authenticate_user(
        email:str,
        password: str,
        db: _orm.Session
):
    user = get_user_by_email(email, db)

    if not user:
        return False

    if not user.verify_password(password):
        return False

    return user


async def create_token(user: _models.User):
    user_obj = _schemas.User.model_validate(user)

    token = _jwt.encode(user_obj.model_dump(), JWT_SECRET)

    return dict(
        access_token=token,
        token_type='bearer',
        expires_in=3600
    )

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: _orm.Session = Depends(_services.get_db)
):
    try:
        payload = _jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        user = db.query(_models.User).get(payload["id"])
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
    except:
        raise HTTPException(
            status_code=401, detail="Invalid Email or Password."
        )

    return _schemas.User.model_validate(user)