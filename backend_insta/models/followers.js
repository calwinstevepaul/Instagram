'use strict';
module.exports = (sequelize, DataTypes) => {
  const followers = sequelize.define('followers', {
    userId: DataTypes.INTEGER,
    followerId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  followers.associate = function(models) {
    followers.belongsTo(models.user)
    followers.belongsTo(models.user,{as:'follower'})
    // associations can be defined here
  };
  return followers;
};