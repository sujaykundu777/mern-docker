## MERN-Docker - Starter for building MERN Apps using Docker

![MERN DOCKER diagram](https://github.com/sujaykundu777/mern-docker/blob/master/3-tier-diagram.png?raw=true)
### Prerequisites:

You must have Docker Installed in your System !

### How to run the App :

Article - ![Tutorial](https://dev.to/sujaykundu777/utilizing-the-power-of-docker-while-building-mern-apps-using-mern-docker-4olb)

##### In Development Mode :

First copy the content of **docker-compose-dev.yml** to **docker-compose.yml**

and also copy the content of **server/src/index.dev.js** to **server/src/index.js**

Run the app using :

`$ docker-compose up --build --remove-orphans`

or

`$ docker-compose up -d`

Above command will start the services on (-d) detach mode (similar like running the app in background)

Then you can check the status of the containers by running:

`$ docker ps`

The App should be App :

visit client : http://localhost:3000

visit server : http://localhost:8080

To check the status of the running containers :

`docker-compose ps`

##### In Production Mode :

First copy the content of **docker-compose-prod.yml** to **docker-compose.yml**

and also copy the content of **server/src/index.prod.js** to **server/src/index.js**

Run the app using :

` $ docker-compose up --build -remove-orphans`

The App should be up at http://localhost:8080

### Build the image for server :
docker build -t myapp-server:1 .
docker images
docker run --name "myapp-server" -p 80:8080 myapp-server:1
docker ps