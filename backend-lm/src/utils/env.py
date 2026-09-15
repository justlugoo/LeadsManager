import os


def load_dotenv(path: str = ".env") -> None:
    """Carga variables de entorno desde un archivo .env si existe.

    Variables ya definidas en el entorno (por ejemplo, las que pone un
    orquestador como docker-compose) tienen prioridad y no se sobreescriben.
    """
    if not os.path.exists(path):
        return

    with open(path, encoding="utf-8") as env_file:
        for line in env_file:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))
