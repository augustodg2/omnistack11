
exports.up = function(knex) {
  return knex.schema.createTable('incidents', (table) => {
    table.increments() // PK AI
    
    table.string('ong_id').notNullable().references('ongs.id') // FK
    table.string('title').notNullable()
    table.string('description').notNullable()
    table.decimal('value').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents')
};
