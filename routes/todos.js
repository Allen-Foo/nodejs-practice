// todo.js
var mongoose = require('mongoose');

var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

// define model by mongoose
var Todo = mongoose.model('Todo', {
  text: String,
  completed: Boolean
})


// routes for todo
router.route('/')
  .get((req, res) => {
    // use mongoose to get all todos
    Todo.find().select({"text": 1, "completed": 1, "_id": 0}).exec((err, todos) => {
      if(err)
        res.send(err);

      res.json(todos)
    })
  })
  .post(parseUrlencoded, (req, res) => {
    console.log('req', req.body);
    Todo.create({
      text: req.body.text,
      completed: false
    }, (err, todo) => {
      if (err)
        res.send(err);

      // get all the todos and send back 
      Todo.find().select({"text": 1, "completed": 1, "_id": 0}).exec((error, todos) => {
        if (error)
          res.send(error);
        res.json(todos)
      })
    })
  })

  module.exports = router
