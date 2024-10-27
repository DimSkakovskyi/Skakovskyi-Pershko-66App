/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('habit_progress', (table) => {
        table.increments('id').primary(); // auto ID
        table.integer('habit_id').unsigned().references('habits.id').onDelete('CASCADE'); // // foreign key to users, deletes task if user is deleted
        table.date('progress_date').notNullable(); // date when progress was recorded
        table.boolean('status').notNullable(); // status of the habit on that day (true if completed, false otherwise)
        table.timestamps(true, true); // created_at and updated_at
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('habit_progress'); // drop users table if rollback
};
