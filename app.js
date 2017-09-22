// app.js

var express = require('express');
var app = express();

// use app.param() to intercept request
// convert all the letters the param 'name' to lower case
app.param('name', (req, res, next) => {
  req.params.name = req.params.name.toLowerCase();
  next();
})

// route with query string
app.get('/blocks', (req, res) => {
  var blocks = ['fixed', 'movable', 'rotating'];
  if (req.query.limit > 0) {
    res.json(blocks.slice(0, req.query.limit))
  } else {
    res.json(blocks);
  }
})

// dynamic route with params
app.get('/blocks/:name', (req, res) => {
  var blocks = {
    fixed: 'fasten securely in position',
    movable: 'capable of being moved',
    rotating: 'move in a circle around its center'
  }

  // handle path not found case
  var desc = blocks[req.params.name];
  if (!desc) {
    res.status(404).json('cannot find ' + req.params.name);
  } else {
    res.status(200).json(desc);
  }
})

app.listen(3000);