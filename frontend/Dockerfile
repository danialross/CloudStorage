FROM node:21-alpine

WORKDIR /usr/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","run","dev"]