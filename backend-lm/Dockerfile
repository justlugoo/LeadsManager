# Usa una imagen base de Python ligera para un tamaño menor.
FROM python:3.13-slim

# Establece el directorio de trabajo dentro del contenedor.
# Corregido a 'backend-lm' para que coincida con tu estructura.
WORKDIR /app/backend-lm

# Copia los archivos de configuración de dependencias primero para cacheo eficiente.
COPY pyproject.toml uv.lock ./

# Instala uv y las dependencias usando el archivo de bloqueo.
RUN pip install uv && \
    uv sync

# Copia el resto del código de la aplicación.
COPY . .

# Expone el puerto que tu aplicación FastAPI usará.
EXPOSE 8000

# Define el comando para iniciar la aplicación.
# Usamos "python -m" para que el módulo uvicorn sea encontrado sin errores.
CMD ["python", "-m", "uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]