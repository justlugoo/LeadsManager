from ...models import User
from ...schemas import UserCreate
from sqlalchemy import orm as _orm
from ...utils.security import hash_password
from fastapi import HTTPException, Depends


def get_user_by_email(email: str, db: _orm.Session):
    return db.query(User).filter(User.email == email).first()

async def create_user(user: UserCreate, db: _orm.Session):
    # Verificar si el usuario ya existe
    db_user = get_user_by_email(user.email, db)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_obj = User(
        email=user.email,
        hashed_password=hash_password(user.password)
    )
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    return user_obj
