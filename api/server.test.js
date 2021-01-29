const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

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

  describe('server', () => {
    describe('[GET] /api/todos', () => {
      it('responds with 200 OK', async () => {
        const res = await request(server).get('/api/todos')
        expect(res.status).toBe(200)
      })
      it('returns the right number of todos', async () => {
        let res
        await db('todos').insert(todo1)
        res = await request(server).get('/api/todos')
        expect(res.body).toHaveLength(1)
  
        await db('todos').insert(todo2)
        res = await request(server).get('/api/todos')
        expect(res.body).toHaveLength(2)
      })
      it('returns the right todos', async () => {
        await db('todos').insert(todo1)
        await db('todos').insert(todo2)
        const res = await request(server).get('/api/todos')
        expect(res.body[0]).toMatchObject({ id: 1, ...todo1 })
        expect(res.body[1]).toMatchObject({ id: 2, ...todo2 })
      })
    })  
    describe('[POST] /api/todos', () => {
        it('responds with the newly created todo', async () => {
          let res
          res = await request(server).post('/api/todos').send(todo1)
          expect(res.body).toMatchObject({ id: 1, ...todo1 })
    
          res = await request(server).post('/api/todos').send(todo2)
          expect(res.body).toMatchObject({ id: 2, ...todo2 })
        })
      })
})