FROM node:21-alpine AS build

WORKDIR /usr/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:21-alpine

WORKDIR /usr/app

COPY --from=build /usr/app/dist ./dist

COPY package*.json .

RUN npm install --production

EXPOSE 3000

CMD ["npm","run","start:prod"]