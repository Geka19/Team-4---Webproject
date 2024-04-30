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

CMD ["node", "backend/server.js"]