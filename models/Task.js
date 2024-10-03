const { Model } = require('objection');
const User = require('./User');

class Task extends Model {
  static get tableName() {
    return 'tasks';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'tasks.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = Task;