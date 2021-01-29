const express = require('express')
const Todos = require('./todos/todos-model')
const server = express()

server.use(express.json())

const { validateTodoId } = require('./middleware/middleware')

// GET - find all todos
server.get('/api/todos', (req, res) => {
    Todos.getAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

// GET - find a todo by id
server.get('/api/todos/:id', validateTodoId, async (req, res) => {
    res.status(200).json(req.action)
})

// POST - add a new todo
server.post('/api/todos', async (req, res, next) => {
    if (!req.body.todo_name || !req.body.todo_description) {
        res.status(400).json({ message: 'missing name or description'})
    } else {
        try {
           const data = await Todos.insert(req.body)
           res.status(201).json(data) 
        } catch(err) {
            next(err)
        }
    }
})
// PUT - updates a todo based on id
server.put('/api/todos/:id', validateTodoId, async (req, res, next) => {
    try {
        const { id } = req.params
        const data = req.body
        if(Object.keys(data).length > 0) {
            const edits = await Todos.update(id, data)
            res.status(200).json(edits)
        } else {
            res.status(400).json({ message: 'more data needed to edit todo'})
        }
    } catch(err) {
        next(err)
    }
})

// DELETE - delete a todo based on id
server.delete('/api/todos/:id', validateTodoId, async (req, res, next) => {
    try {
        const { id } = req.params
        const data = await Todos.remove(id)
        res.status(200).json({ 
            message: `Todo ${id} has been deleted`, 
            delete: data})
    } catch(err) {
        next(err)
    }
})

module.exports = server