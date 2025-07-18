# Etapa de levantamiento
FROM node:24-alpine3.21 AS builder

ARG VITE_BACK_PATH
ARG VITE_BACK_PORT

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# --- Etapa de Producción (Production Stage) ---
FROM nginx:1.25-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]