# Makefile
.PHONY: help build up down restart logs clean rebuild

# Variables
COMPOSE_FILE = docker-compose.yml
PROJECT_NAME = leadsmanager
# Usa docker-compose si existe; si no, cae a podman-compose (Podman no trae
# el binario "docker-compose", pero podman-compose lee el mismo archivo).
COMPOSE := $(shell command -v docker-compose 2>/dev/null || command -v podman-compose 2>/dev/null || echo docker-compose)

help: ## Mostrar esta ayuda
	@echo "Comandos disponibles (usando: $(COMPOSE)):"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Construir las imágenes
	$(COMPOSE) -f $(COMPOSE_FILE) build

up: ## Levantar los contenedores
	$(COMPOSE) -f $(COMPOSE_FILE) up -d

up-logs: ## Levantar los contenedores y mostrar logs
	$(COMPOSE) -f $(COMPOSE_FILE) up

down: ## Detener y remover los contenedores
	$(COMPOSE) -f $(COMPOSE_FILE) down

restart: ## Reiniciar los contenedores
	$(COMPOSE) -f $(COMPOSE_FILE) restart

logs: ## Mostrar logs de todos los servicios
	$(COMPOSE) -f $(COMPOSE_FILE) logs -f

logs-backend: ## Mostrar logs del backend
	$(COMPOSE) -f $(COMPOSE_FILE) logs -f backend

logs-frontend: ## Mostrar logs del frontend
	$(COMPOSE) -f $(COMPOSE_FILE) logs -f frontend

clean: ## Limpiar contenedores, redes y volúmenes no utilizados
	$(COMPOSE) -f $(COMPOSE_FILE) down -v --remove-orphans

rebuild: ## Reconstruir y levantar los contenedores
	$(COMPOSE) -f $(COMPOSE_FILE) down
	$(COMPOSE) -f $(COMPOSE_FILE) build --no-cache
	$(COMPOSE) -f $(COMPOSE_FILE) up -d

status: ## Mostrar estado de los contenedores
	$(COMPOSE) -f $(COMPOSE_FILE) ps

exec-backend: ## Acceder al shell del contenedor backend
	$(COMPOSE) -f $(COMPOSE_FILE) exec backend /bin/bash

exec-frontend: ## Acceder al shell del contenedor frontend
	$(COMPOSE) -f $(COMPOSE_FILE) exec frontend /bin/sh

# Comandos de desarrollo
dev-backend: ## Ejecutar solo el backend en modo desarrollo
	cd backend-lm && uv run uvicorn src.main:app --reload --host 0.0.0.0 --port 8000

dev-frontend: ## Ejecutar solo el frontend en modo desarrollo
	cd frontend-lm && pnpm run dev

# Comandos de testing
test-backend: ## Ejecutar tests del backend
	cd backend-lm && uv run pytest

test-frontend: ## Ejecutar tests del frontend
	cd frontend-lm && pnpm test