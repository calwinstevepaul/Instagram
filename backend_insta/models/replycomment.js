'use strict';
module.exports = (sequelize, DataTypes) => {
  const replycomment = sequelize.define('replycomment', {
    userId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER,
    replycomments: DataTypes.STRING
  }, {});
  replycomment.associate = function(models) {
    // associations can be defined here
    replycomment.belongsTo(models.user)
    replycomment.belongsTo(models.comment)

  };
  return replycomment;
};