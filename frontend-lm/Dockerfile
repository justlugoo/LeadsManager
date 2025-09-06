# frontend-lm/Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa de producción con Nginx para Cloud Run
FROM nginx:alpine

# Instalar gettext para envsubst
RUN apk add --no-cache gettext

# Crear template de configuración de nginx
RUN echo 'server {' > /etc/nginx/conf.d/default.conf.template && \
    echo '    listen ${PORT};' >> /etc/nginx/conf.d/default.conf.template && \
    echo '    server_name _;' >> /etc/nginx/conf.d/default.conf.template && \
    echo '    root /usr/share/nginx/html;' >> /etc/nginx/conf.d/default.conf.template && \
    echo '    index index.html;' >> /etc/nginx/conf.d/default.conf.template && \
    echo '' >> /etc/nginx/conf.d/default.conf.template && \
    echo '    # Manejar rutas de React Router (SPA)' >> /etc/nginx/conf.d/default.conf.template && \
    echo '    location / {' >> /etc/nginx/conf.d/default.conf.template && \
    echo '        try_files $uri $uri/ /index.html;' >> /etc/nginx/conf.d/default.conf.template && \
    echo '    }' >> /etc/nginx/conf.d/default.conf.template && \
    echo '' >> /etc/nginx/conf.d/default.conf.template && \
    echo '    # Configuración para archivos estáticos' >> /etc/nginx/conf.d/default.conf.template && \
    echo '    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {' >> /etc/nginx/conf.d/default.conf.template && \
    echo '        expires 1y;' >> /etc/nginx/conf.d/default.conf.template && \
    echo '        add_header Cache-Control "public, immutable";' >> /etc/nginx/conf.d/default.conf.template && \
    echo '    }' >> /etc/nginx/conf.d/default.conf.template && \
    echo '' >> /etc/nginx/conf.d/default.conf.template && \
    echo '    # Security headers' >> /etc/nginx/conf.d/default.conf.template && \
    echo '    add_header X-Frame-Options "SAMEORIGIN" always;' >> /etc/nginx/conf.d/default.conf.template && \
    echo '    add_header X-Content-Type-Options "nosniff" always;' >> /etc/nginx/conf.d/default.conf.template && \
    echo '    add_header X-XSS-Protection "1; mode=block" always;' >> /etc/nginx/conf.d/default.conf.template && \
    echo '}' >> /etc/nginx/conf.d/default.conf.template

# Copiar archivos construidos
COPY --from=builder /app/dist /usr/share/nginx/html

# Eliminar configuración por defecto de nginx
RUN rm /etc/nginx/conf.d/default.conf

# Cloud Run asigna el puerto dinámicamente
EXPOSE $PORT

# Script de inicio que configura el puerto dinámico
CMD envsubst '$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
