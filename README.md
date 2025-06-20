# Leads Manager 📊

Sistema de gestión de clientes potenciales (leads) desarrollado con FastAPI y SQLAlchemy.

## 📋 Descripción

Leads Manager es una aplicación web para gestionar clientes potenciales, permitiendo a los equipos de ventas registrar, hacer seguimiento y convertir leads en clientes.

## 🛠️ Stack Tecnológico

- **Backend**: 
  - [FastAPI](https://fastapi.tiangolo.com/) - Framework web moderno y de alto rendimiento
  - [SQLAlchemy](https://www.sqlalchemy.org/) - ORM para interactuar con la base de datos
  - [Pydantic](https://docs.pydantic.dev/) - Validación de datos y serialización
  - [PyJWT](https://pyjwt.readthedocs.io/) - Manejo de tokens JWT para autenticación
  - [Passlib](https://passlib.readthedocs.io/) - Gestión segura de contraseñas

- **Base de datos**:
  - SQLite (desarrollo)
  - Compatible con PostgreSQL, MySQL (producción)

- **Frontend** (Próximamente):
  - React.js - Biblioteca para construir interfaces de usuario
  - Redux - Gestión de estado
  - Material UI - Componentes de interfaz de usuario

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una arquitectura en capas:

```
backend-lm/
├── src/
│   ├── database/       # Configuración de la base de datos
│   ├── models/         # Modelos de datos (SQLAlchemy)
│   ├── schemas/        # Esquemas de validación (Pydantic)
│   ├── services/       # Lógica de negocio
│   ├── routers/        # Endpoints de la API
│   ├── utils/          # Utilidades (seguridad, etc.)
│   └── main.py         # Punto de entrada de la aplicación
└── pyproject.toml      # Dependencias del proyecto
```

## 🔄 API Endpoints

### Autenticación

- `POST /api/auth/token` - Obtener token de autenticación
  
### Usuarios

- `POST /api/users/` - Crear un nuevo usuario
- `GET /api/users/` - Listar todos los usuarios (requiere autenticación)
- `GET /api/users/me` - Obtener información del usuario actual

### Leads (Próximamente)

- `GET /api/leads/` - Listar todos los leads
- `POST /api/leads/` - Crear un nuevo lead
- `GET /api/leads/{id}` - Obtener detalles de un lead específico
- `PUT /api/leads/{id}` - Actualizar información de un lead
- `DELETE /api/leads/{id}` - Eliminar un lead

## 🚀 Instalación y Configuración

### Requisitos

- Python 3.13 o superior
- pip o uv (gestor de paquetes)

### Pasos de instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/leads-manager.git
   cd leads-manager
   ```

2. Instalar dependencias:
   ```bash
   pip install -e .
   # o con uv
   uv pip install -e .
   ```

3. Ejecutar el servidor de desarrollo:
   ```bash
   uvicorn src.main:app --reload
   ```

4. Acceder a la documentación de la API:
   ```
   http://localhost:8000/docs
   ```

## ⚠️ Estado del Desarrollo

Este proyecto se encuentra actualmente en fase de desarrollo activo:

- ✅ Backend API con FastAPI
- ✅ Autenticación de usuarios con JWT
- ✅ Modelos de datos para usuarios y leads
- 🔄 Endpoints para gestión de leads (en progreso)
- 🔜 Frontend con React (planificado)

## 📝 Próximos Pasos

- Implementar endpoints completos para la gestión de leads
- Añadir funcionalidades de filtrado y búsqueda
- Desarrollar el frontend con React
- Implementar sistema de notificaciones
- Añadir reportes y estadísticas

