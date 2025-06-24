# Leads Manager 📊

[![Estado del Build](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/tu-usuario/leads-manager)
[![Versión de Python](https://img.shields.io/badge/python-3.13+-blue)](https://www.python.org/)
[![Versión de Node.js](https://img.shields.io/badge/node-18+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-19.1.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.8.3-blue)](https://www.typescriptlang.org/)

**Leads Manager** es una aplicación completa de gestión de clientes potenciales (leads) con una **API RESTful** robusta desarrollada en **FastAPI** y **SQLAlchemy**, y un **frontend moderno** construido con **React** y **TypeScript**. Esta solución integral permite a equipos de ventas y marketing gestionar eficientemente su pipeline de leads, desde la captura inicial hasta la conversión final, proporcionando herramientas avanzadas de seguimiento, análisis y gestión de relaciones con clientes potenciales.

## ✨ Características Principales

### 🔐 Autenticación y Usuarios
* **Sistema de Autenticación Completo**: Login y registro con validación de formularios
* **Autenticación Segura**: Implementación de JSON Web Tokens (JWT) para proteger los endpoints
* **Gestión de Usuarios**: Sistema completo para crear y autenticar usuarios
* **Rutas Protegidas**: Navegación segura con componentes de protección de rutas

### 📋 Gestión de Leads
* **CRUD Completo**: Crear, Leer, Actualizar y Eliminar leads
* **Estados de Leads**: Sistema de estados con colores y iconos (Nuevo, Contactado, Calificado, Propuesta, Negociación, Ganado, Perdido)
* **Filtros Avanzados**: Búsqueda por nombre, email, empresa y filtrado por estado
* **Vista Detallada**: Página dedicada para ver y editar información completa de cada lead

### 🎨 Interfaz de Usuario
* **Diseño Moderno**: Interfaz elegante con gradientes personalizados y componentes intuitivos
* **Componentes Reutilizables**: Sistema de componentes UI modular y consistente
* **Responsive Design**: Optimizado para dispositivos móviles y desktop
* **Animaciones Suaves**: Transiciones y efectos visuales para mejor UX
* **Iconografía**: Uso de Heroicons para iconos consistentes

### 📊 Dashboard y Analytics
* **Dashboard Interactivo**: Resumen visual de métricas importantes
* **Estadísticas en Tiempo Real**: Total de leads, nuevos leads, tasa de conversión
* **Gráficos de Estado**: Distribución de leads por estado
* **Leads Recientes**: Lista de los leads más recientes con acceso rápido

### 🏗️ Arquitectura
* **Arquitectura en Capas**: Separación clara de responsabilidades
* **Validación de Datos**: Uso de Pydantic para validación robusta
* **Documentación Interactiva**: API documentada con Swagger UI y ReDoc
* **TypeScript**: Tipado estático para mayor seguridad y desarrollo eficiente

## 🛠️ Stack Tecnológico

### Backend
-   **[FastAPI](https://fastapi.tiangolo.com/)**: Framework web de alto rendimiento para construir APIs
-   **[SQLAlchemy](https://www.sqlalchemy.org/)**: The Python SQL Toolkit and Object Relational Mapper
-   **[Pydantic](https://docs.pydantic.dev/)**: Validación de datos y gestión de configuraciones
-   **[PyJWT](https://pyjwt.readthedocs.io/)**: Implementación de JSON Web Tokens
-   **[Passlib](https://passlib.readthedocs.io/)**: Biblioteca para hashing de contraseñas

### Frontend
-   **[React 19](https://reactjs.org/)**: Biblioteca para interfaces de usuario
-   **[TypeScript](https://www.typescriptlang.org/)**: Superset de JavaScript con tipado estático
-   **[Vite](https://vitejs.dev/)**: Herramienta de construcción rápida para desarrollo
-   **[React Router DOM](https://reactrouter.com/)**: Enrutamiento declarativo para React
-   **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS utility-first
-   **[Axios](https://axios-http.com/)**: Cliente HTTP para realizar peticiones a la API
-   **[Heroicons](https://heroicons.com/)**: Iconos SVG optimizados

### Base de Datos
-   **SQLite** (para desarrollo)
-   Totalmente compatible con **PostgreSQL**, **MySQL**, etc. (para producción)

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una arquitectura en capas para separar responsabilidades y facilitar el mantenimiento.

```
leadManager/
├── backend-lm/                    # API Backend (FastAPI)
│   ├── src/
│   │   ├── database/             # Configuración de la base de datos
│   │   ├── models/               # Modelos de datos (SQLAlchemy)
│   │   ├── schemas/              # Esquemas de validación (Pydantic)
│   │   ├── services/             # Lógica de negocio
│   │   ├── routers/              # Endpoints de la API
│   │   ├── utils/                # Utilidades (seguridad, etc.)
│   │   └── main.py               # Punto de entrada de la aplicación
│   └── pyproject.toml            # Dependencias del proyecto
└── frontend-lm/                   # Frontend (React + TypeScript)
    ├── src/
    │   ├── components/           # Componentes reutilizables
    │   │   ├── auth/             # Componentes de autenticación
    │   │   ├── layout/           # Componentes de layout
    │   │   ├── leads/            # Componentes específicos de leads
    │   │   └── ui/               # Componentes UI base
    │   ├── pages/                # Páginas de la aplicación
    │   │   ├── auth/             # Páginas de autenticación
    │   │   ├── dashboard/        # Dashboard principal
    │   │   ├── leads/            # Páginas de gestión de leads
    │   │   └── profile/          # Página de perfil
    │   ├── services/             # Servicios de API
    │   ├── hooks/                # Custom hooks de React
    │   ├── context/              # Contextos de React
    │   ├── types/                # Definiciones de tipos TypeScript
    │   ├── config/               # Configuraciones
    │   └── routes/               # Configuración de rutas
    ├── public/                   # Archivos estáticos
    └── package.json              # Dependencias del frontend
```

## 🔄 Endpoints de la API

A continuación se detallan los endpoints disponibles actualmente.

| Método HTTP | Ruta                       | Descripción                                  | Requiere Autenticación |
| :---------- | :------------------------- | :------------------------------------------- | :--------------------: |
| `GET`       | `/`                        | Mensaje de bienvenida de la API              |           No           |
| `POST`      | `/api/auth/token`          | Obtiene un token de acceso (JWT)             |           No           |
| `POST`      | `/api/users/`              | Crea un nuevo usuario                        |           No           |
| `GET`       | `/api/users/`              | Lista todos los usuarios                     |           ✅           |
| `GET`       | `/api/users/me`            | Obtiene datos del usuario autenticado        |           ✅           |
| `POST`      | `/api/leads/`              | Crea un nuevo lead                           |           ✅           |
| `GET`       | `/api/leads/`              | Lista todos los leads                        |           ✅           |
| `GET`       | `/api/leads/{lead_id}`     | Obtiene un lead por su ID                    |           ✅           |
| `PUT`       | `/api/leads/{lead_id}`     | Actualiza un lead por su ID                  |           ✅           |
| `DELETE`    | `/api/leads/{lead_id}`     | Elimina un lead por su ID                    |           ✅           |

## 🚀 Instalación y Uso Local

Sigue estos pasos para levantar el proyecto completo en tu máquina local.

### Pre-requisitos

-   Python 3.13 o superior
-   Node.js 18 o superior
-   Un gestor de paquetes como `pip` o `uv`
-   Git

### Backend Setup

1.  **Navega al directorio del backend:**
    ```bash
    cd backend-lm
    ```

2.  **Crea y activa un entorno virtual:**
    ```bash
    python -m venv venv
    # En Windows
    venv\Scripts\activate
    # En macOS/Linux
    source venv/bin/activate
    ```

3.  **Instala las dependencias:**
    ```bash
    # Con pip
    pip install -e .

    # o con uv
    uv pip install -e .
    ```

4.  **Ejecuta el servidor backend:**
    ```bash
    uvicorn src.main:app --reload
    ```
    El servidor estará corriendo en `http://localhost:8000`

>[!NOTE]
> Antes de usar la aplicación, asegúrate de ejecutar `python init_db.py` para crear las tablas necesarias en la base de datos.

### Frontend Setup

1.  **Navega al directorio del frontend:**
    ```bash
    cd frontend-lm
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    # o
    yarn install
    ```

3.  **Ejecuta el servidor de desarrollo:**
    ```bash
    npm run dev
    # o
    yarn dev
    ```
    El frontend estará corriendo en `http://localhost:5173`

### Acceso a la Aplicación

-   **Frontend**: `http://localhost:5173`
-   **API Documentation**: `http://localhost:8000/docs`
-   **ReDoc**: `http://localhost:8000/redoc`

## 🎯 Características del Frontend

### 🔐 Sistema de Autenticación
- **Login/Register Sliding Card**: Interfaz elegante con animaciones suaves
- **Validación de Formularios**: Validación en tiempo real con mensajes de error
- **Persistencia de Sesión**: Tokens JWT almacenados en localStorage
- **Rutas Protegidas**: Navegación automática a login si no está autenticado

### 📋 Gestión de Leads
- **Lista de Leads**: Tabla responsive con filtros y búsqueda
- **Formulario de Creación/Edición**: Formularios intuitivos con validación
- **Vista Detallada**: Página completa con toda la información del lead
- **Estados Visuales**: Badges con colores y iconos para cada estado
- **Acciones Rápidas**: Editar, eliminar y cambiar estado directamente

### 📊 Dashboard
- **Métricas Principales**: Tarjetas con estadísticas clave
- **Gráficos de Estado**: Distribución visual de leads por estado
- **Leads Recientes**: Lista de los últimos leads agregados
- **Navegación Rápida**: Acceso directo a crear nuevos leads

### 🎨 Componentes UI
- **Sistema de Diseño**: Componentes consistentes y reutilizables
- **Paleta de Colores**: Diseño moderno y elegante con gradientes personalizados
- **Responsive**: Optimizado para todos los tamaños de pantalla
- **Animaciones**: Transiciones suaves y efectos visuales
- **Iconografía**: Iconos consistentes con Heroicons

## 📈 Estado del Proyecto

### ✅ Completado
-   [x] Backend API con FastAPI
-   [x] Modelos de datos para `Users` y `Leads`
-   [x] Autenticación de usuarios con JWT
-   [x] Endpoints CRUD completos para `Users`
-   [x] Endpoints CRUD completos para `Leads`
-   [x] Frontend con React y TypeScript
-   [x] Sistema de autenticación completo
-   [x] Dashboard interactivo con estadísticas
-   [x] Gestión completa de leads (CRUD)
-   [x] Sistema de filtros y búsqueda
-   [x] Componentes UI reutilizables
-   [x] Diseño responsive y moderno
-   [x] Navegación protegida
-   [x] Validación de formularios

### 🔄 En Desarrollo
-   [ ] Sistema de notificaciones
-   [ ] Exportación de datos
-   [ ] Paginación avanzada
-   [ ] Búsqueda global

### 📋 Planificado
-   [ ] Roles y permisos de usuario (admin, sales_rep)
-   [ ] Filtrado y búsqueda avanzada
-   [ ] Sistema de notificaciones en tiempo real
-   [ ] Reportes y analytics avanzados
-   [ ] Configuración de Docker
-   [ ] Tests automatizados
-   [ ] PWA (Progressive Web App)
