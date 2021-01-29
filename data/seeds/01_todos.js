
exports.seed = function(knex, Promise) {
  return knex('todos').insert([   
    { todo_name: 'Update LinkedIn Profile', todo_description: 'abcdefg' },
    { todo_name: 'Apply for two jobs', todo_description: 'hijklmnop' }
  ])
}