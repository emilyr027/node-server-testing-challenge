
exports.up = function(knex) {
  return knex.schema
  .createTable('todos', tbl => {
      tbl.increments()
      tbl.string('todo_name', 128).notNullable().unique()
      tbl.string('todo_description').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('todos')
};

