# backend-lm/Dockerfile
FROM python:3.13-slim

# Establecer directorio de trabajo
WORKDIR /app

# Instalar uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /usr/local/bin/

# Copiar archivos de configuración
COPY pyproject.toml uv.lock* ./

# Instalar dependencias
RUN uv sync --frozen --no-cache

# Copiar código fuente
COPY src/ ./src/
COPY init_db.py ./

# Crear la base de datos
RUN uv run python init_db.py

# Exponer puerto
EXPOSE 8000

# Comando por defecto
CMD ["uv", "run", "uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]