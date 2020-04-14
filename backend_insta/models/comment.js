'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {});
  comment.associate = function(models) {
    comment.belongsTo(models.user);
    comment.belongsTo(models.post);
    // associations can be defined here
    comment.hasMany(models.replycomment)
    

  };
  return comment;
};