// app.js

var express = require('express');
var app = express();

var blocksRouter = require('./routes/blocks');

// router is mounted in a particular root url
// only requests to /blocks/* will be sent to our "router"
app.use('/blocks', blocksRouter);

// use app.param() to intercept request
// convert all the letters the param 'name' to lower case
// app.param('name', (req, res, next) => {
//   req.params.name = req.params.name.toLowerCase();
//   next();
// })

// start the server on port 3000
app.listen(3000);
