const express = require('express')
const Todos = require('./todos-model')
const router = express.Router()

const { validateTodoId } = require('../middleware/middleware')

// GET - find all todos
router.get('/', async (req, res, next) => {
    try {
        const data = await Todos.getAll()
        res.status(200).json(data)
    } catch(err) {
        next(err)
    }
})

// GET - find a todo by id
router.get('/:id', validateTodoId, async (req, res) => {
    res.status(200).json(req.action)
})

// POST - add a new todo
router.post('/', async (req, res, next) => {
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

// DELETE - delete a todo based on id
router.delete('/:id', validateTodoId, async (req, res, next) => {
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

module.exports = router