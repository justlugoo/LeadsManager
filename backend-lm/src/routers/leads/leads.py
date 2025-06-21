from typing import List, Dict
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

# Crear lead
@router.post('/', response_model=_lead_schema.Lead)
async def create_lead(
        lead: _lead_schema.LeadCreate,
        user: _user_schema.User = Depends(_users.get_current_user),
        db: _orm.Session = Depends(_services.get_db)
):
    return await _leads_services.create_lead(user=user, db=db, lead=lead)

# Obtener TODOS los leads del usuario
@router.get('/', response_model=List[_lead_schema.Lead])
async def get_all_leads(
        user: _user_schema.User = Depends(_users.get_current_user),
        db: _orm.Session = Depends(_services.get_db)
):
    return await _leads_services.get_leads(user=user, db=db)

# Obtener un lead específico por ID
@router.get('/{lead_id}', response_model=_lead_schema.Lead)
async def get_lead(
        lead_id: int,
        user: _user_schema.User = Depends(_users.get_current_user),
        db: _orm.Session = Depends(_services.get_db)
):
    return await _leads_services.get_lead_by_id(user=user, db=db, lead_id=lead_id)

# Eliminar un lead
@router.delete('/{lead_id}', response_model=Dict[str, str])
async def delete_lead(
        lead_id: int,
        user: _user_schema.User = Depends(_users.get_current_user),
        db: _orm.Session = Depends(_services.get_db)
):
    result = await _leads_services.delete_lead(lead_id, user, db)
    return result

# Actualizar un lead
@router.put('/{lead_id}', response_model=_lead_schema.Lead)
async def update_lead(
        lead_id: int,
        lead: _lead_schema.LeadCreate,
        user: _user_schema.User = Depends(_users.get_current_user),
        db: _orm.Session = Depends(_services.get_db)
):
    updated_lead = await _leads_services.update_lead(lead_id, lead, user, db)
    return updated_lead