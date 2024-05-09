FROM node:21.6.1-slim

LABEL author="Team4"
LABEL version="1.0"

EXPOSE 8050/tcp

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["node", "server.js"]