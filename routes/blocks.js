var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var blocks = {
  fixed: 'fasten securely in position',
  movable: 'capable of being moved',
  rotating: 'move in a circle around its center'
}

// see the doc link here
// https://expressjs.com/en/4x/api.html#router
router.route('/')
// route with query string
  .get((req, res) => {
    var blocksNames = Object.keys(blocks);
    if (req.query.limit > 0) {
      res.json(blocksNames.slice(0, req.query.limit));
    } else {
      res.json(blocksNames);
    }
  })
  .post(parseUrlencoded, (req, res) => {
    var newBlock = req.body;

    console.log('req body', req.body);
    blocks[newBlock.name] = newBlock.description;
    console.log('blocks', blocks);

    res.status(201).json(newBlock.name);
  })

// dynamic route with params
router.route('/:name')
  .get((req, res) => {

    // handle path not found case
    var desc = blocks[req.params.name];
    if (!desc) {
      res.status(404).json('cannot find ' + req.params.name);
    } else {
      res.status(200).json(desc);
    }
  })
  .delete((req, res) => {
    delete blocks[req.params.name];
    
    // console.log('blocks', blocks);
    res.sendStatus(200);
  })

module.exports = router