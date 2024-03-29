FROM node:20-alpine

EXPOSE 3000

WORKDIR /app
COPY package*.json .

RUN ["npm", "install"]

COPY . .

RUN touch .env
