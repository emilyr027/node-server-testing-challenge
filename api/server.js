const express = require('express')

const todosRouter = require('./todos/todos-router')

const server = express()

server.use(express.json())
server.use('/api/todos', todosRouter)

module.exports = server