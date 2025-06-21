# Leads Manager API 📊

[![Estado del Build](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/tu-usuario/leads-manager)
[![Versión de Python](https://img.shields.io/badge/python-3.13+-blue)](https://www.python.org/)

**Leads Manager** es una API RESTful, robusta y escalable para la gestión de clientes potenciales (leads), desarrollada con el moderno framework **FastAPI** y el poderoso ORM **SQLAlchemy**.

## ✨ Características Principales

* **Gestión de Usuarios**: Sistema completo para crear y autenticar usuarios.
* **Autenticación Segura**: Implementación de JSON Web Tokens (JWT) para proteger los endpoints.
* **Gestión de Leads (CRUD)**: Operaciones completas para Crear, Leer, Actualizar y Eliminar leads.
* **Arquitectura Moderna**: Estructura de proyecto en capas, limpia y fácil de mantener.
* **Validación de Datos**: Uso de Pydantic para una validación de datos robusta y automática.
* **Documentación Interactiva**: Documentación de la API generada automáticamente con Swagger UI y ReDoc.

## 🛠️ Stack Tecnológico

-   **Backend**:
    -   [FastAPI](https://fastapi.tiangolo.com/): Framework web de alto rendimiento para construir APIs.
    -   [SQLAlchemy](https://www.sqlalchemy.org/): The Python SQL Toolkit and Object Relational Mapper.
    -   [Pydantic](https://docs.pydantic.dev/): Validación de datos y gestión de configuraciones.
    -   [PyJWT](https://pyjwt.readthedocs.io/): Implementación de JSON Web Tokens.
    -   [Passlib](https://passlib.readthedocs.io/): Biblioteca para hashing de contraseñas.
-   **Base de Datos**:
    -   SQLite (para desarrollo)
    -   Totalmente compatible con PostgreSQL, MySQL, etc. (para producción).
-   **Frontend** (Planificado):
    -   React.js | Redux | Material UI

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una arquitectura en capas para separar responsabilidades y facilitar el mantenimiento.

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

Sigue estos pasos para levantar el proyecto en tu máquina local.

### Pre-requisitos

-   Python 3.13 o superior.
-   Un gestor de paquetes como `pip` o `uv`.
-   Git.

### Pasos

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/leads-manager.git
    cd leads-manager
    ```

2.  **Crea y activa un entorno virtual:**
    ```bash
    python -m venv venv
    # En Windows
    # venv\Scripts\activate
    # En macOS/Linux
    source venv/bin/activate
    ```

3.  **Instala las dependencias:**
    *(El flag `-e` instala el proyecto en modo editable)*
    ```bash
    # Con pip
    pip install -e .

    # o con uv
    uv pip install -e .
    ```

4.  **Ejecuta el servidor:**
    ```bash
    uvicorn src.main:app --reload
    ```
    El servidor estará corriendo en `http://localhost:8000`. El flag `--reload` reiniciará el servidor automáticamente con cada cambio en el código.

5.  **Accede a la documentación interactiva:**
    Una vez que el servidor esté en ejecución, abre tu navegador y ve a:
    -   **Swagger UI**: `http://localhost:8000/docs`
    -   **ReDoc**: `http://localhost:8000/redoc`

## 📈 Estado del Proyecto

-   [x] ✅ Backend API con FastAPI.
-   [x] ✅ Modelos de datos para `Users` y `Leads`.
-   [x] ✅ Autenticación de usuarios con JWT.
-   [x] ✅ Endpoints CRUD completos para `Users`.
-   [x] ✅ Endpoints CRUD completos para `Leads`.
-   [ ] 🔄 Frontend con React (Planificado).

## 🗺️ Roadmap / Próximos Pasos

-   [ ] Añadir roles y permisos de usuario (ej. `admin`, `sales_rep`).
-   [ ] Implementar funcionalidades de filtrado y búsqueda avanzada para leads.
-   [ ] Desarrollar el frontend con React para consumir la API.
-   [ ] Implementar un sistema de notificaciones (ej. al asignar un nuevo lead).
-   [ ] Añadir reportes y un dashboard de estadísticas.
-   [ ] Configurar Docker para un despliegue más sencillo.

## 🤝 Cómo Contribuir

¡Las contribuciones son bienvenidas! Si quieres mejorar este proyecto, por favor sigue estos pasos:

1.  Haz un **Fork** de este repositorio.
2.  Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3.  Haz tus cambios y haz **Commit** (`git commit -m 'Añade nueva funcionalidad'`).
4.  Haz **Push** a tu rama (`git push origin feature/nueva-funcionalidad`).
5.  Abre un **Pull Request**.
