/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('habits', (table) => {
        table.increments('id').primary(); // habit ID
        table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE'); // foreign key to users, deletes habit if user is deleted
        table.string('title').notNullable();
        table.text('description').notNullable();
        table.enu('status', ['active', 'paused', 'completed']).notNullable(); // habit status, limited to 'active', 'paused', or 'completed'
        table.integer('current_streak').notNullable().defaultTo(0); 
        table.integer('max_streak').notNullable().defaultTo(0); 
        table.timestamps(true, true); // created at, updated at
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('habits'); // drop users table if rollback
};
