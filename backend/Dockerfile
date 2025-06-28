# syntax=docker/dockerfile:1

# Use official Node.js LTS image

FROM node:current-slim



WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN apt-get update && apt-get upgrade -y && apt-get clean




RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]

