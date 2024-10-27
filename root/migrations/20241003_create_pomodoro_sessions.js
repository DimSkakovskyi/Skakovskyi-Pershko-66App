/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('pomodoro_sessions', (table) => {
        table.increments('id').primary(); // auto ID
        table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE'); // key to users, deletes session if user is deleted
        table.time('work_duration').notNullable(); // work session
        table.time('break_duration').notNullable(); // break session
        table.integer('number_of_streaks').notNullable(); // pomodoro streaks completed in the session
        table.date('session_date').notNullable(); // the date the session occurred
        table.timestamps(true, true); // created_at and updated_at
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('pomodoro_sessions'); // drop users table if rollback
};
