// server.js
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
// import './config/mongodb.config';
// import postRouter from './routes/post.router';

const app = express();
const PORT = 8080;

// Our DB Configuration
//require('./src/database');

// Routes
//const postRouter = require('./routes/post.router.js');

// const CLIENT_BUILD_PATH = path.join(__dirname, "../../client/build");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// Static files
// app.use(express.static(CLIENT_BUILD_PATH));

// Server API's
// app.use('/api/posts', postRouter);

// send the frontend react
// app.get('/', (req, res) => {
//   res.status(200).send('Hello World !');
// })


// Server React Client
// app.get("/", function(req, res) {
//   res.sendFile(path.join(CLIENT_BUILD_PATH , "index.html"));
// });


app.get('/', (req, res) => {
  res.status(200).send("API Gateway");
})


app.get('/abc', function(req, res){
  res.send('Hello world again');
})

app.listen(PORT, function () {
    console.log(`Server Listening on ${PORT}`);
});

export default app;
