import { Model } from 'objection';

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    const Task = require('./Task');
    const Habit = require('./Habit');
    const PomodoroSession = require('./PomodoroSession');

    return {
      tasks: {
        relation: Model.HasManyRelation,
        modelClass: Task,
        join: {
          from: 'users.id',
          to: 'tasks.user_id',
        },
      },
      habits: {
        relation: Model.HasManyRelation,
        modelClass: Habit,
        join: {
          from: 'users.id',
          to: 'habits.user_id',
        },
      },
      pomodoroSessions: {
        relation: Model.HasManyRelation,
        modelClass: PomodoroSession,
        join: {
          from: 'users.id',
          to: 'pomodoro_sessions.user_id',
        },
      },
    };
  }
}

export default User;