# syntax=docker/dockerfile:1

# Use official Node.js LTS image
FROM node:23.11.0-slim


WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]

