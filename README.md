## MERN Docker - 

To run the entire MERN Stack app using single command:

Create a .env file with the environment variables in the root directory :

```
MONGO_USERNAME=sammy
MONGO_PASSWORD=password
MONGO_HOSTNAME=127.0.0.1
MONGO_PORT=27017
MONGO_DB=mern_docker_db
```

Then run,

`$ docker-compose up`

And should start the client at http://localhost:80 and backend at http://localhost:8080

# Client Config 

Move to client directory 
`$ cd client`

Build the image
`docker build -t webapp-client .`

Lookup for local images, you should have webapp-client:latest
`docker images` 

Run the image as container
`docker run -i -p 80:80 -t webapp-client ` 

Show running containers
`docker ps`

Execute commands (Get inside the client container. replace container_name)
`docker exec -it <container_name> sh`
