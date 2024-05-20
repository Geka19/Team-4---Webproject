FROM node:21.6.1-slim

LABEL author="Team4"
LABEL version="1.0"

WORKDIR /app

COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/
COPY . .

RUN npm install

RUN npm install -g serve

RUN npm run build

EXPOSE 8084/tcp

CMD ["serve", "-s", "build"]