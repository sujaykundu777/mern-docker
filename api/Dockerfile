#  Dockerfile for api

FROM node:10.16-alpine

WORKDIR /var/www/api

# Add package.json
ADD package*.json /var/www/api/

# Install dependencies 
RUN cd /var/www/api & npm install

# copy local files to app folder
COPY . /var/www/api/

EXPOSE 8080

CMD ["npm","run","start"]
