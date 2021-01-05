# Dockerfile for client

# Stage 1: Build react client
FROM node:14.15.3-alpine3.12

# Working directory be app
WORKDIR /usr/app

COPY package*.json ./

# Install dependencies
RUN npm install

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm","start"]