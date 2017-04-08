const Todo = require('../models/todo')
var mongoose = require('mongoose')
var connection = mongoose.connection

// TODO. import express and create a Router, replace the methods below with routes e.g.
// router.post('/', function(req,res) => {
//  Todo.create(req.body, function (err, todo) {
//    res.json(todo)
//  }
// })

var express = require('express')
var routerIndex = express.Router()
var routerShow = express.Router()
var routerCreate = express.Router()

routerIndex.get('/todos', function (req, res) {
  Todo.find({}, function (err, todos) {
    if (err) console.error(err)
    res.render('homepage', {allTodos: todos})
  })
})

routerShow.get('/todos/:id', function (req, res) {
  Todo.find({}, function (err, todos) {
    if (err)console.error(err)
    var todoId = req.params.id
    todos.forEach(function (eachTodo) {
      if (eachTodo.id === todoId) {
        res.render('show', {specificTodo: eachTodo})
      }
    })
  })
})

routerCreate.post('/todos', function (req, res) {
  var formData = req.body
  res.send(req.body)
  var data = {
    name: formData.name,
    description: formData.description,
    completed: formData.completed
  }
  connection.collection('todos').insert(data)
})

// function create (params) {
//   Todo.create(params, function (err, todo) {
//     if (err) {
//       console.log(err)
//       return
//     }
//     console.log(todo)
//   })
// }

// function list () {
//   Todo.find({}, function (err, todos) {
//     if (err) {
//       console.log(err)
//       return
//     }
//     console.log(todos)
//   })
// }
//
// function show (id) {
//   Todo.findById(id, function (err, todo) {
//     if (err) return console.log(err)
//     console.log(todo)
//   })
// }
//
// function update (id, params) {
//   Todo.findOneAndUpdate({ _id: id }, params, function (err, todo) {
//     if (err) console.log(err)
//     console.log(todo)
//   })
// }
//
// function destroy (id) {
//   Todo.findOneAndRemove({ _id: id }, function (err) {
//     if (err) console.log(err)
//     console.log('User deleted!')
//   })
// }

module.exports = {
  routerIndex,
  routerShow,
  routerCreate
}
