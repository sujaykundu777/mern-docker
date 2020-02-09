// server.js
const express = require('express');
const path = require("path");

const app = express();
const bodyParser = require('body-parser');
const PORT = 8080;

// Our DB Configuration
require('./src/database');

// Routes
const postRouter = require('./src/routes/post.router');

const CLIENT_BUILD_PATH = path.join(__dirname, "../client/build");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// Static files
app.use(express.static(CLIENT_BUILD_PATH));

app.use('/posts', postRouter);

// Server React Client
app.get("/", function(req, res) {
  res.sendFile(path.join(CLIENT_BUILD_PATH , "index.html"));
});

app.listen(PORT, function () {
    console.log(`Server Listening on ${PORT}`);
});
