/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tasks', (table) => {
        table.increments('id').primary(); // ID (auto)
        table.integer('user_id').unsigned().notNullable().references('users.id').onDelete('CASCADE'); // foreign key to users, deletes task if user is deleted
        table.string('title').notNullable(); //title
        table.text('description').notNullable(); //description of task
        table.enu('status', ['pending', 'in-progress', 'completed']).notNullable(); //status
        table.timestamps(true, true); //created at, updated at
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('tasks'); // drop users table if rollback
};
