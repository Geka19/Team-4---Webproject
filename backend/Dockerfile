FROM node:21.6.1-slim

LABEL author="Team4"
LABEL version="1.0"

EXPOSE 8085/tcp

RUN groupadd app-gr

RUN useradd -g app-gr usr

RUN mkdir /app

WORKDIR /app

COPY --chown=usr:app-gr . /app

RUN npm install

USER usr

CMD ["node", "server.js"]