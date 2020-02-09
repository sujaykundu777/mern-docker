# Dockerfile for client

# Stage 1: Build react client
FROM node:10.16-alpine

# Working directory be app
WORKDIR /usr/app

COPY package*.json ./

# Install dependencies
RUN yarn install

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["yarn","start"]