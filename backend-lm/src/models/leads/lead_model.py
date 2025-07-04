import datetime as _dt

import sqlalchemy as _sql
import sqlalchemy.orm as _orm

from ...database import database as _database

class Lead(_database.Base):
    __tablename__ = "leads"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    owner_id = _sql.Column(_sql.Integer, _sql.ForeignKey("users.id"))
    first_name = _sql.Column(_sql.String(50), index=True)
    last_name = _sql.Column(_sql.String(50), index=True)
    email = _sql.Column(_sql.String(100), index=True)
    company = _sql.Column(_sql.String(255), index=True, default="")
    note = _sql.Column(_sql.Text, default="")
    status = _sql.Column(_sql.String(20), default="nuevo")
    date_created = _sql.Column(_sql.DateTime, default=lambda: _dt.datetime.now(_dt.UTC))
    date_last_updated = _sql.Column(_sql.DateTime, default=lambda: _dt.datetime.now(_dt.UTC),
                                    onupdate=lambda: _dt.datetime.now(_dt.UTC))
    owner = _orm.relationship("User", back_populates="leads")

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
