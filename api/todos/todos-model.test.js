it('is the correct env', () => {
    expect(process.env.DB_ENV)
      .toBe('testing')
})
  
const Todos = require('./todos-model')
const db = require('../../data/dbConfig')
  
const todo1 = { todo_name: 'work on housework', todo_description: '123456' }
const todo2 = { todo_name: 'study Chinese', todo_description: '8901234' }

  
  beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
  })
  beforeEach(async () => {
    await db('todos').truncate()
  })
  afterAll(async () => {
    await db.destroy()
  })

describe('Todos model', () => {
    describe('insert function', () => {
      it('adds todos to db', async () => {
        let all
        await Todos.insert(todo1)
        all = await db('todos')
        expect(all).toHaveLength(1)
  
        await Todos.insert(todo2)
        all = await db('todos')
        expect(all).toHaveLength(2)
      })
      it('resolves to the todo', async () => {
        const todo = await Todos.insert(todo1)
        expect(todo).toMatchObject({ id: 1, ...todo1 })
      })
    })
    describe('update function', () => {
      it('updates the todo', async () => {
        // ?
        // using db, get a todo in the database
        const [id] = await db('todos').insert(todo1)
        // await for the update of said todo
        await Todos.update(id, { todo_name: 'HOUSEWORK' })
        // using db, retrieve the todo
        const updated = await db('todos').where({ id }).first()
        // check the change took
        expect(updated.todo_name).toBe('HOUSEWORK')
      })
      it('resolves to the updated todo', () => {
      })
    })
  })
  