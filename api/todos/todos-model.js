const db = require('../../data/dbConfig')

module.exports = {
    getAll,
    findById,
    insert,
    update,
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

  async function update(id, changes) {
    return db('todos').update(changes)
      .where({ id })
  }
  
  function remove(id) {
    return db('todos').where('id', id).del()
  }
  