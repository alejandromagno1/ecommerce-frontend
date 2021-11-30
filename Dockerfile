#Primera Etapa
FROM node:10-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD ng build --configuration production

#Segunda Etapa
FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/ecommerce /usr/share/nginx/html