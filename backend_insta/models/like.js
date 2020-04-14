'use strict';
module.exports = (sequelize, DataTypes) => {
  const like = sequelize.define('like', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  like.associate = function(models) {
    like.belongsTo(models.user)
    like.belongsTo(models.post)

    // associations can be defined here
  };
  return like;
};