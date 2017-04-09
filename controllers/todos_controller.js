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
  Todo.findById({_id: req.params.id}, function (err, todo) {
    if (err)console.log(err)
    res.render('show', {specificTodo: todo})
  })
})

routerCreate.post('/todos', function (req, res) {
  res.send(req.body)
  var formData = req.body
  var data = {
    name: formData.name,
    description: formData.description,
    completed: formData.completed
  }

  if (!data.description || data.description === '') {
    data.description = 'no description'
  }

  if (data.completed === '' || !data.completed) {
    data.completed = false
  }

  if (data.name.length >= 5 && (data.completed === 'true' || data.completed === 'false')) {
      connection.collection('todos').insert(data, function(err, record){
        if(err)console.error(err)
        console.log('entry saved');
      })
    } else {
      console.log('invalid entry; entry not saved in database')
    }

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
