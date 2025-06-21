import datetime as _dt
import pydantic as _pydantic
from typing import Optional
from ..users.user_schema import User


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
    owner: Optional[User] = None

    class Config:
        from_attributes = True
