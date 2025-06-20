# This file is for authentication-related schemas
# Currently, authentication is handled using the User schema
from src.schemas.users.user_schema import User, UserCreate

# Token response schema
import pydantic as _pydantic

class Token(_pydantic.BaseModel):
    access_token: str
    token_type: str
    expires_in: int