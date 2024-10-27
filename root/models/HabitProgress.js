const { Model } = require('objection');
const Habit = require('./Habit');

class HabitProgress extends Model {
  static get tableName() {
    return 'habit_progress';
  }

  static get relationMappings() {
    return {
      habit: {
        relation: Model.BelongsToOneRelation,
        modelClass: Habit,
        join: {
          from: 'habit_progress.habit_id',
          to: 'habits.id',
        },
      },
    };
  }
}

module.exports = HabitProgress;