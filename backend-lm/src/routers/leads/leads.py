from fastapi import Depends, APIRouter
from sqlalchemy import orm as _orm

from ...schemas import (
    lead_schema as _lead_schema,
    user_schema as _user_schema
)

from ...services import (
    users as _users,
    services as _services,
    leads_services as _leads_services
)
router = APIRouter(
    prefix="/leads",
    tags=["leads"],
)

@router.post('/', response_model=_lead_schema.Lead)
async def register_lead(
        lead: _lead_schema.LeadCreate,
        user: _user_schema.User = Depends(_users.get_current_user),
        db: _orm.Session = Depends(_services.get_db)
):
    return await _leads_services.create_lead(user=user, db=db, lead=lead)
