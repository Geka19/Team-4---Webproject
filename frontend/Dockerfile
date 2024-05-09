FROM node:21.6.1-slim

LABEL author="Team4"
LABEL version="1.0"

WORKDIR /app

COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/
COPY . .

RUN npm install

EXPOSE 3000/tcp

CMD ["npm", "start"]