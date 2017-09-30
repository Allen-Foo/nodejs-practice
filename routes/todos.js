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

const returnAllTodos = (res) => {
  // get all the todos and send back 
  Todo.find().select({"text": 1, "completed": 1}).exec((err, todos) => {
    if(err)
      res.send(err);

    res.json(todos)
  })
}


// routes for todo
router.route('/')
  .get((req, res) => {
    // use mongoose to get all todos
    returnAllTodos(res)
  })
  .post(parseUrlencoded, (req, res) => {
    console.log('req', req.body);
    Todo.create({
      text: req.body.text,
      completed: false
    }, (err, todo) => {
      if (err)
        res.send(err);

      returnAllTodos(res)
    })
  })

router.route('/:todo_id')
  .delete((req, res) => {
    Todo.remove({
      _id: req.params.todo_id
    }, (err, todo) => {
      if (err) {
        res.send(err)
      }

      returnAllTodos(res)
    })
  })

  module.exports = router
