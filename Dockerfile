FROM node:21.6.1-slim

LABEL author="Aliaksei"
LABEL version="0.0.2"

EXPOSE 8084/tcp

RUN groupadd app-gr

RUN useradd -g app-gr usr

RUN mkdir /app

WORKDIR /app

COPY --chown=usr:app-gr . /app

RUN npm install

USER usr

CMD ["node", "server.js"]

# Backend Dockerfile
FROM node:14

WORKDIR /usr/src/backend

COPY backend/package*.json ./
RUN npm install

COPY backend/ .

EXPOSE 3001
CMD ["node", "src/server.js"]

# Frontend Dockerfile
FROM node:14 as build

WORKDIR /usr/src/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .

RUN npm run build

FROM nginx:alpine

COPY --from=build /usr/src/frontend/build /usr/share/nginx/html

EXPOSE 80
