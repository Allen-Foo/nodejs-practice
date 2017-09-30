// app.js

// set up ========================
var express = require('express');
var app = express();
var mongoose = require('mongoose');   
var bodyParser = require('body-parser');

// import all the routes
var blocksRouter = require('./routes/blocks');
var todosRouter = require('./routes/todos');


// configuration =================
mongoose.connect("mongodb://localhost:27017/todoDB", {
  useMongoClient: true
})


app.use(express.static(__dirname + '/apidocs'));               // set apidocs as the static files location
app.use(bodyParser.urlencoded({'extended':false}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                    // parse application/json

// router is mounted in a particular root url
// only requests to /blocks/* will be sent to our "router"
app.use('/blocks', blocksRouter);
app.use('/todos', todosRouter);

// start the server on port 3000
app.listen(3000);
