'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Thread, {foreignKey: 'ThreadId'})
      Comment.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  }
  Comment.init({
    UserId: DataTypes.INTEGER,
    ThreadId: DataTypes.INTEGER,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};