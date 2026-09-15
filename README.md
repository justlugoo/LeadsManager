# Leads Manager 📊

[![Python](https://img.shields.io/badge/python-3.13+-blue)](https://www.python.org/)
[![Node.js](https://img.shields.io/badge/node-22+-green)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-11-orange)](https://pnpm.io/)
[![Svelte](https://img.shields.io/badge/svelte-5-orange)](https://svelte.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-5.9-blue)](https://www.typescriptlang.org/)

**Leads Manager** es un proyecto simple de gestión de leads: una API en **FastAPI** + **SQLAlchemy** con autenticación JWT, y un frontend en **Svelte 5** + **TypeScript** que la consume. En esencia es un **CRUD de leads** (crear, listar, editar, eliminar) con estados (Nuevo, Contactado, Calificado, Propuesta, Negociación, Ganado, Perdido) y un dashboard con métricas calculadas sobre esos mismos datos.

Sirve tal cual para llevar un seguimiento básico de contactos/clientes potenciales a nivel personal o de un equipo pequeño — cada usuario ve solo sus propios leads. No es un CRM completo (no hay roles, notificaciones ni integraciones), pero la base (API en capas, auth JWT, frontend con estado y rutas protegidas) está lista para construir esas funcionalidades encima si hacen falta.

## ✨ Características

- **Autenticación JWT**: registro, login y rutas protegidas.
- **CRUD de leads**: crear, listar (con filtros y búsqueda), ver detalle, editar y eliminar. Cada lead pertenece a un único usuario.
- **Dashboard**: métricas simples (conteos, distribución por estado, leads recientes) derivadas del CRUD.
- **Documentación interactiva** de la API vía Swagger UI y ReDoc.

## 🛠️ Stack Tecnológico

**Backend**: FastAPI, SQLAlchemy, Pydantic, PyJWT, Passlib
**Frontend**: Svelte 5, TypeScript, Vite, svelte-spa-router, Tailwind CSS, Axios
**Base de datos**: SQLite por defecto, compatible con PostgreSQL/MySQL

## 🏗️ Estructura del Proyecto

```
LeadsManager/
├── backend-lm/                # API (FastAPI)
│   ├── src/
│   │   ├── database/          # Configuración de la base de datos
│   │   ├── models/             # Modelos SQLAlchemy
│   │   ├── schemas/            # Esquemas Pydantic
│   │   ├── services/           # Lógica de negocio
│   │   ├── routers/            # Endpoints de la API
│   │   ├── utils/               # Seguridad, carga de .env, etc.
│   │   └── main.py
│   └── pyproject.toml
└── frontend-lm/                # Frontend (Svelte + TypeScript)
    └── src/
        ├── lib/                  # api.ts, tipos, stores (auth, layout), UI (Button, Card, ...), íconos
        ├── layout/                # MainLayout, Sidebar, Header, PageHeader
        ├── routes/                # Auth, Dashboard, LeadsList, LeadForm, LeadDetail, Profile
        └── App.svelte             # Router + guard de autenticación
```

## 🔄 Endpoints de la API

| Método   | Ruta                    | Descripción                        | Auth |
| :------- | :---------------------- | :---------------------------------- | :--: |
| `GET`    | `/`                      | Estado de la API                    |  No  |
| `POST`   | `/api/auth/token`        | Obtiene un token de acceso (JWT)    |  No  |
| `POST`   | `/api/users/`             | Crea un nuevo usuario               |  No  |
| `GET`    | `/api/users/me`           | Datos del usuario autenticado       |  ✅  |
| `POST`   | `/api/leads/`             | Crea un lead                        |  ✅  |
| `GET`    | `/api/leads/?skip=&limit=`| Lista los leads del usuario (paginado, `limit` máx. 500) |  ✅  |
| `GET`    | `/api/leads/{lead_id}`    | Obtiene un lead por su ID           |  ✅  |
| `PUT`    | `/api/leads/{lead_id}`    | Actualiza un lead                   |  ✅  |
| `DELETE` | `/api/leads/{lead_id}`    | Elimina un lead                     |  ✅  |

## 🚀 Instalación y Uso Local

### Pre-requisitos

- Python 3.13+, `uv` (o `pip`)
- Node.js 22+, [`pnpm`](https://pnpm.io/installation)
- Git
- Docker o [Podman](https://podman.io/) + `podman-compose` (opcional, solo para la opción con contenedores)

### Backend

```bash
cd backend-lm
uv sync                     # o: pip install -e .
cp -n .env.example .env     # ajusta JWT_SECRET_KEY, etc. (-n: no sobrescribe si ya existe)
uv run uvicorn src.main:app --reload
```

El servidor corre en `http://localhost:8000` (las tablas se crean automáticamente al arrancar). Variables de entorno disponibles en [`backend-lm/.env.example`](backend-lm/.env.example).

### Frontend

```bash
cd frontend-lm
pnpm install
pnpm run dev
```

El frontend corre en `http://localhost:5173` (proxy configurado a `http://localhost:8000` para `/api`).

### Con Docker o Podman (todo containerizado)

La forma más rápida de levantar todo (backend + frontend) sin instalar nada de Python/Node en tu máquina:

```bash
cp -n .env.example .env     # solo la primera vez (-n: no sobrescribe si ya existe)
make up                     # detecta automáticamente docker-compose o podman-compose
```

Frontend en `http://localhost:3000`, backend en `http://localhost:8000`. Ver `make help` para más comandos (`logs`, `down`, `rebuild`, etc.).

> **Importante**: si `JWT_SECRET_KEY` queda vacío en `.env`, el backend genera una clave temporal distinta en cada reinicio — eso invalida las sesiones abiertas cada vez que hagas `make down`/`make up`. Revisa que `.env` tenga un valor real ahí (no lo vuelvas a sobrescribir con `cp .env.example .env` sin el `-n`).

> En Fedora/RHEL con Podman y SELinux, el volumen de la base de datos ya usa el sufijo `:Z` en `docker-compose.yml` para que el contenedor pueda escribir en él.

### Acceso

- Frontend: `http://localhost:5173` (dev) o `http://localhost:3000` (Docker)
- Documentación de la API: `http://localhost:8000/docs` · `http://localhost:8000/redoc`

## 🧩 Ampliarlo

La base cubre lo esencial (auth, CRUD, ownership por usuario), lo que deja espacio para sumar funcionalidades según la necesidad, por ejemplo:

- Roles y permisos de usuario (admin, vendedor, etc.)
- Notas o historial de actividad por lead
- Notificaciones y recordatorios
- Exportación de datos (CSV, etc.)
- Paginación en el frontend (la API ya soporta `skip`/`limit`)
- Tests automatizados
