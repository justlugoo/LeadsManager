import datetime as _dt

import sqlalchemy as _sql
import sqlalchemy.orm as _orm
import passlib.hash as _hash

from src.database import database as _database

class User(_database.Base):
    __tablename__ = "users"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    email = _sql.Column(_sql.String(255), unique=True, index=True)
    hashed_password = _sql.Column(_sql.String(255))

    leads = _orm.relationship("Lead", back_populates="owner")

    def verify_password(self, password):
        return _hash.bcrypt.verify(password, self.hashed_password)

    def set_password(self, password):
        self.hashed_password = _hash.bcrypt.hash(password)

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
    date_created = _sql.Column(_sql.DateTime, default=_dt.datetime.now)
    date_last_updated = _sql.Column(_sql.DateTime, default=_dt.datetime.now, onupdate=_dt.datetime.now)

    owner = _orm.relationship("User", back_populates="leads")

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
