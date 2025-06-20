import sqlalchemy as _sql
import sqlalchemy.orm as _orm

from src.database import database as _database
from src.utils.security import verify_password, hash_password


class User(_database.Base):
    __tablename__ = "users"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    email = _sql.Column(_sql.String(255), unique=True, index=True)
    hashed_password = _sql.Column(_sql.String(255))

    leads = _orm.relationship("Lead", back_populates="owner")

    def verify_password(self, password):
        return verify_password(password, self.hashed_password)

    def set_password(self, password):
        self.hashed_password = hash_password(password)