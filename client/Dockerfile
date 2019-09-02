# Dockerfile for client

FROM node:10.16-alpine as react-build

# Working directory be app
WORKDIR /var/www/app

# Add package.json
ADD package*.json yarn.lock /var/www/app/

# Install dependencies 
RUN cd /var/www/app & yarn

# copy local files to app folder
COPY . /var/www/app/

# Build react production files
RUN yarn build

# Stage 2 - the production environment
FROM nginx:1.13.3-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

#  replace the default nginx config with custom nginx setup
COPY ./nginx-site.conf /etc/nginx/conf.d/default.conf

# From 'react-build' stage , COPY the client build files to nginx directory
COPY --from=react-build /var/www/app/build /usr/share/nginx/html

# Expose port for nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]