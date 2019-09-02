#  Dockerfile for api

FROM node:10.16-alpine

WORKDIR /var/www/mern-app/api

# Add package.json
ADD package*.json /var/www/mern-app/api

# Install dependencies 
RUN cd /var/www/mern-app/api & npm install

# copy local files to app folder
COPY . /var/www/mern-app/api/

EXPOSE 8080

CMD ["npm","run","start"]
