const { Model } = require('objection');
const User = require('./User');

class PomodoroSession extends Model {
  static get tableName() {
    return 'pomodoro_sessions';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'pomodoro_sessions.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = PomodoroSession;