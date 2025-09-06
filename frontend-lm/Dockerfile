# frontend-lm/Dockerfile.gcp
FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa de producción con Nginx para Cloud Run
FROM nginx:alpine

# Copiar configuración de Nginx para GCP
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar archivos construidos
COPY --from=builder /app/dist /usr/share/nginx/html

# Cloud Run necesita que el servidor escuche en el puerto definido por $PORT
EXPOSE 8080

# Script para usar el puerto dinámico de Cloud Run
RUN echo 'server { listen $PORT; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf.template

CMD ["sh", "-c", "envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
