from fastapi import HTTPException
from src.schemas.leads.lead_schema import Lead as LeadSchema    # esquema Pydantic
from src.models import Lead                                     # modelo SQLAlchemy
from src.schemas import User, LeadCreate
from sqlalchemy import orm as _orm
import datetime as _dt

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

async def get_leads(
        user: User,
        db: _orm.Session,
):
    leads = db.query(Lead).filter_by(owner_id=user.id).all()
    return [LeadSchema.model_validate(lead) for lead in leads]

async def _lead_selector(
        lead_id: int,
        user: User,
        db: _orm.Session
):
    lead = (
        db.query(Lead)
        .filter_by(owner_id=user.id)
        .filter(Lead.id == lead_id)
        .first()
    )

    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    return lead

async def get_lead_by_id(
        user: User,
        db: _orm.Session,
        lead_id: int
):
    lead = await _lead_selector(lead_id, user, db)
    return LeadSchema.model_validate(lead)

async def delete_lead(
        lead_id: int,
        user: User,
        db: _orm.Session
):
    lead = await _lead_selector(lead_id, user, db)
    db.delete(lead)
    db.commit()

    return {"message": "Lead deleted successfully"}

async def update_lead(
        lead_id: int,
        lead: LeadCreate,
        user: User,
        db: _orm.Session
):
    lead_db = await _lead_selector(lead_id, user, db)

    lead_db.first_name = lead.first_name
    lead_db.last_name = lead.last_name
    lead_db.email = lead.email
    lead_db.company = lead.company
    lead_db.note = lead.note
    lead_db.status = lead.status
    lead_db.date_last_updated = _dt.datetime.now(_dt.UTC)

    db.commit()
    db.refresh(lead_db)

    return LeadSchema.model_validate(lead_db)