var todosController = require('./controllers/todos_controller')

var mongoose = require('mongoose')
var dbURI = 'mongodb://localhost/todo-list'
mongoose.connect(dbURI)
var connection = mongoose.connection

mongoose.Promise = global.Promise

// TODO. include express and body-parser, plugin in the todos controller and start listening

var express = require('express')
var app = express()
var port = 8000


app.set('view engine', 'ejs')

var ejsLayouts = require('express-ejs-layouts')
app.use(ejsLayouts)


// handle the post request
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(todosController.routerIndex)
app.use(todosController.routerShow)
app.use(todosController.routerCreate)


app.listen(port, function (err) {
  if (err) {
    console.log(err)
  }
  console.log('express is running on port ' + port)
})
