import datetime as _dt

import pydantic as _pydantic

# Import User schemas from the new location
from src.schemas.users.user_schema import User, UserCreate, _UserBase

class _LeadBase(_pydantic.BaseModel):
    first_name: str
    last_name: str
    email: str
    company: str
    status: str
    note: str

class LeadCreate(_LeadBase):
    pass

class Lead(_LeadBase):
    id: int
    owner_id: int
    date_created: _dt.datetime
    date_last_updated: _dt.datetime

    class Config:
        from_attributes = True
