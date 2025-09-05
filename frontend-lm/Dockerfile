# Etapa 1: Construcción de la aplicación React
FROM node:20-alpine AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app/frontend

# Copia los archivos de configuración de dependencias primero para cacheo eficiente.
COPY package.json package-lock.json ./

# Instala las dependencias de tu proyecto
RUN npm install

# Copia el resto de tu código fuente al contenedor.
COPY . .

# Construye la aplicación de React para producción
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copia el resultado de la construcción (la carpeta 'dist') a Nginx.
COPY --from=build /app/frontend/dist /usr/share/nginx/html

# Expone el puerto del servidor
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]