# This file is for authentication-related schemas
# Currently, authentication is handled using the User schema
import pydantic as _pydantic
from .user_schema import User, UserCreate

# Token response schema

class Token(_pydantic.BaseModel):
    access_token: str
    token_type: str
    expires_in: int
