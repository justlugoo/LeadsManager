from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from starlette import status

from src.services import services as _services
from src.services.users import auth_users_services as _auth_users_services
from sqlalchemy import orm as _orm

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

@router.post("/token")
async def generate_token(
        form_data: OAuth2PasswordRequestForm = Depends(),
        db: _orm.Session = Depends(_services.get_db)
):
    user = await _auth_users_services.authenticate_user(form_data.username, form_data.password, db)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return await _auth_users_services.create_token(user)
