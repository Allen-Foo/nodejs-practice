// app.js

var express = require('express');
var app = express();

var blocksRouter = require('./routes/blocks');

// router is mounted in a particular root url
// only requests to /blocks/* will be sent to our "router"
app.use('/blocks', blocksRouter);


// start the server on port 3000
app.listen(3000);
