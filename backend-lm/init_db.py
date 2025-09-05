from src.database import database as _database
from src.models.users import User
from src.models.leads import Lead

def create_database():
    _database.Base.metadata.create_all(bind=_database.engine)
    print("¡Base de datos y tablas creadas correctamente!")

if __name__ == "__main__":
    create_database()