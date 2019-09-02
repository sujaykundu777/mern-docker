#  Dockerfile for api

FROM node:10.16-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

# copy local files to app folder
COPY --chown=node:node . .

EXPOSE 8080

CMD ["npm","run","start"]
