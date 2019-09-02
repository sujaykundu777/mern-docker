## MERN Docker - 

To run the entire MERN Stack app using single command:

`$ docker-compose up`

And should start the app at http://localhost:80

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
