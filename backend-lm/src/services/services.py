from src.database import database as _database
from src.models import models

def create_database():
    return _database.Base.metadata.create_all(bind=_database.engine)