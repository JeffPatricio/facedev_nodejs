exports.up = function (knex) {
  return knex.schema.createTable('feed', (table) => {
    table.increments();
    table.text('description');
    table.string('image');
    table.integer('user_id').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('feed');
};
