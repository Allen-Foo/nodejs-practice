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
  /**
   * @api {get} /todos Get all the todos
   * @apiName GetTodos
   * @apiGroup Todos
   *
   * @apiSuccess {Array} todos The array of todos
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     [
   *       {
   *         "_id": "59ce380340e5e152b5126762",
   *         "text": "test",
   *         "completed": false
   *       },
   *       {
   *         "_id": "59ce383840e5e152b5126763",
   *         "text": "allen",
   *         "completed": true
   *       },
   *     ]
   */
  .get((req, res) => {
    // use mongoose to get all todos
    returnAllTodos(res)
  })
  /**
   * @api {post} /todos Create new todo
   * @apiName CreateNewTodo
   * @apiGroup Todos
   *
   * @apiParam {String} text the name of the new todo
   * @apiParamExample {json} param example
   * {
   *   "text": "this is for test"
   * }
   *
   * @apiSuccess {Array} todos The array of todos
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     [
   *       {
   *         "_id": "59ce380340e5e152b5126762",
   *         "text": "test",
   *         "completed": false
   *       },
   *       {
   *         "_id": "59ce383840e5e152b5126763",
   *         "text": "allen",
   *         "completed": true
   *       },
   *     ]
   */
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
  /**
   * @api {put} /todos/:todo_id Update the status of todo
   * @apiName UpdateTodos
   * @apiGroup Todos
   *
   * @apiParam {String} id The todo id    
   * @apiParamExample {json} param example
   *  {
   *    "todo_id": "59ce380340e5e152b5126762"
   *  }
   *
   * @apiSuccess {Array} todos The array of todos
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     [
   *       {
   *         "_id": "59ce380340e5e152b5126762",
   *         "text": "test",
   *         "completed": false
   *       },
   *       {
   *         "_id": "59ce383840e5e152b5126763",
   *         "text": "allen",
   *         "completed": true
   *       },
   *     ]
   */
  .put((req, res) => {
    Todo.where({ _id: req.params.todo_id})
      .update({text: req.body.text, completed: req.body.completed})
      .exec((err, todo) => {
        if (err)
          res.send(err)

        returnAllTodos(res)
      })
  })
  /**
   * @api {delete} /todos/:todo_id Delete a todo item
   * @apiName DeleteTodo
   * @apiGroup Todos
   *
   * @apiParam {String} id The todo id    
   * @apiParamExample {json} param example
   *  {
   *    "todo_id": "59ce380340e5e152b5126762"
   *  }
   *  
   * @apiSuccess {Array} todos The array of todos
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     [
   *       {
   *         "_id": "59ce380340e5e152b5126762",
   *         "text": "test",
   *         "completed": false
   *       },
   *       {
   *         "_id": "59ce383840e5e152b5126763",
   *         "text": "allen",
   *         "completed": true
   *       },
   *     ]
   */
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
