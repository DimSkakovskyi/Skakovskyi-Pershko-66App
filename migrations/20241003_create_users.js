/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();      // ID (auto)
        table.string('username').notNullable();  // username
        table.string('email').notNullable().unique(); // email
        table.string('password').notNullable();  // password
        table.timestamps(true, true); // created at, updated at
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');  // drop users table if rollback
};
