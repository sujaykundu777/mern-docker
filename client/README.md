
Build Client Image
`$ docker build -t myapp-react:v1 .`

Run the container
`$ docker run -p 80:80 myapp-react:v1 `

If you want to expose to external port
`$ docker run --name some-nginx -d -p 8001:80 myapp-react`