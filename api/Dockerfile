#  Dockerfile for api

FROM node:10.16-alpine

WORKDIR /opt/node_app

# USER node
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm","run","start"]
