// app.js

// set up ========================
var express = require('express');
var app = express();
var mongoose = require('mongoose');               

var blocksRouter = require('./routes/blocks');
var todosRouter = require('./routes/todos');


// configuration =================
mongoose.connect("mongodb://localhost:27017/todoDB", {
  useMongoClient: true
})
// router is mounted in a particular root url
// only requests to /blocks/* will be sent to our "router"
app.use('/blocks', blocksRouter);
app.use('/todos', todosRouter);

// start the server on port 3000
app.listen(3000);
