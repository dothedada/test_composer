# --- Etapa 1: "Builder" - Construcción de la aplicación ---
# Se utiliza una imagen de Node.js para construir el proyecto de Vite.
# 'AS builder' le da un nombre a esta etapa para poder referenciarla más tarde.
FROM node:24-alpine3.21 AS builder

# Declara los argumentos que se pueden pasar desde docker-compose.yml durante la construcción.
# Estos se usarán como variables de entorno en el proceso de build de Vite.
ARG VITE_BACK_PATH
ARG VITE_BACK_PORT

# Establece el directorio de trabajo en '/app'.
WORKDIR /app

# Copia los archivos de dependencias y aprovecha el caché de Docker.
COPY package*.json ./

# Instala todas las dependencias necesarias para construir el proyecto.
RUN npm install

# Copia todo el código fuente del frontend al contenedor.
COPY . .

# Ejecuta el script 'build' de Vite (definido en package.json).
# Esto compila el código React/JS en archivos estáticos (HTML, CSS, JS) en la carpeta '/app/dist'.
RUN npm run build

# --- Etapa 2: "Production" - Servidor web para producción ---
# Se utiliza una imagen de Nginx, que es un servidor web muy ligero y eficiente.
FROM nginx:1.25-alpine

# Copia los archivos estáticos generados en la etapa 'builder'.
# '--from=builder' indica que se debe copiar desde la etapa anterior.
# Se copian los contenidos de '/app/dist' (del builder) a '/usr/share/nginx/html' (en el contenedor de Nginx),
# que es el directorio por defecto desde donde Nginx sirve archivos.
# Esto resulta en una imagen final muy pequeña, sin Node.js ni el código fuente.
COPY --from=builder /app/dist /usr/share/nginx/html

# Expone el puerto 80, el puerto estándar para HTTP, en el que Nginx escucha.
EXPOSE 80

# El comando por defecto para iniciar el servidor Nginx.
# '-g "daemon off;"' asegura que Nginx se ejecute en primer plano, manteniendo el contenedor activo.
CMD ["nginx", "-g", "daemon off;"]
