from src.schemas.leads.lead_schema import Lead as LeadSchema    # esquema Pydantic
from src.models import Lead                                     # modelo SQLAlchemy
from src.schemas import User, LeadCreate
from sqlalchemy import orm as _orm

async def create_lead(
    user: User,
    db: _orm.Session,
    lead: LeadCreate
):
    db_lead = Lead(**lead.model_dump(), owner_id=user.id)
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    return LeadSchema.model_validate(db_lead)
