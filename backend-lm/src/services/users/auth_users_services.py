import datetime as _dt
import os
import secrets

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import orm as _orm
import jwt as _jwt

from .users_services import get_user_by_email
from ...models import User
from ...schemas import User as UserSchema
from .. import services as _services

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_SECONDS = int(os.getenv("ACCESS_TOKEN_EXPIRE_SECONDS", "3600"))

JWT_SECRET = os.getenv("JWT_SECRET_KEY")
if not JWT_SECRET:
    JWT_SECRET = secrets.token_hex(32)
    print(
        "ADVERTENCIA: JWT_SECRET_KEY no está definido. Se generó una clave "
        "temporal solo para esta ejecución, por lo que todos los tokens "
        "emitidos se invalidarán al reiniciar el servidor. Define "
        "JWT_SECRET_KEY en tu entorno (o en un archivo .env) para evitarlo."
    )

_credentials_exception = HTTPException(
    status_code=401,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


async def authenticate_user(
        email: str,
        password: str,
        db: _orm.Session
):
    user = get_user_by_email(email, db)

    if not user:
        return False

    if not user.verify_password(password):
        return False

    return user


async def create_token(user: User):
    now = _dt.datetime.now(_dt.timezone.utc)
    payload = {
        "sub": str(user.id),
        "email": user.email,
        "iat": now,
        "exp": now + _dt.timedelta(seconds=ACCESS_TOKEN_EXPIRE_SECONDS),
    }

    token = _jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return dict(
        access_token=token,
        token_type='bearer',
        expires_in=ACCESS_TOKEN_EXPIRE_SECONDS
    )


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: _orm.Session = Depends(_services.get_db)
):
    try:
        payload = _jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except _jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=401, detail="Token expired", headers={"WWW-Authenticate": "Bearer"}
        )
    except _jwt.InvalidTokenError:
        raise _credentials_exception

    user_id = payload.get("sub")
    if user_id is None:
        raise _credentials_exception

    user = db.get(User, int(user_id))
    if not user:
        raise _credentials_exception

    return UserSchema.model_validate(user)
