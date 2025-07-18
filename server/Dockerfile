FROM node:24-alpine3.21

WORKDIR /app

COPY package*.json ./

RUN npm install

ENV PORT=8080
ENV LOG_PORT=5432
ENV LOG_DB=auth_db
ENV POST_PORT=5433
ENV POST_DB=posts_db

COPY . .

CMD ["npm", "run", "server"]
