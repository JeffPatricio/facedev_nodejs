exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('github_user').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('image');
    table.string('background');
    table.string('title');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
