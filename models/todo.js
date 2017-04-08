const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  name: { type: String, required: true, min: [5, 'Too short'] },
  description: { type: String },
  completed: { type: Boolean }
})

const todo = mongoose.model('Todos', todoSchema)

module.exports = todo
