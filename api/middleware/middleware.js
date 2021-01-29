const Todos = require('../todos/todos-model')

const validateTodoId = async (req, res, next) => {
    const { id } = req.params
    try {
        const action = await Actions.get(id)
        if(!action) {
            res.status(404).json({ message: `action ${id} not found` })
        } else {
            req.action = action
            next()
        }
    } catch(err) {
        res.status(500).json({
            message: 'there was an error validating the id',
            error: err
        })
    }
}


module.exports = { validateTodoId }