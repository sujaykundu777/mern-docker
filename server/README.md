# 🚀 Welcome to your new awesome project!

This project has been created using **webpack scaffold**, you can now run

```
npm run build
```

or

```
yarn build
```

to bundle your application


Build Client Image
`$ docker build -t myapp-server:v1 .`

Run the container
`$ docker run -p 8080:8080 myapp-server:v1 `



Package.json scripts
```
"scripts":{
    "dev-bundle": "webpack --mode development",
    "dev-server": "webpack serve --mode development",
    "dev-build": "babel src/index.js -d dist",
    "start": "npm run dev-build && nodemon dist/index.js",
    "start:dev": "nodemon dist/main.js",
}
```