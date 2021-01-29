const db = require('../data/dbConfig')

module.exports = {
    getAll,
    findById,
    insert,
    remove
  }
  
  function getAll() {
    return db('todos')
  }
  
  function findById(id) {
    return db('todos').where({ id }).first()
  }
  
  function insert(data) {
    return db('todos')
    .insert(data, 'id')
    .then(ids => ({ id: ids[0], ...data}))
  }
  
  function remove(id) {
    return db('todos').where('id', id).del()
  }
  