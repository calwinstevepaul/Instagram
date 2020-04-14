'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profilePic: DataTypes.STRING,
    isprivate:  DataTypes.BOOLEAN
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    user.hasMany(models.post);
    user.hasMany(models.like);
    user.hasMany(models.comment);
    user.hasMany(models.replycomment);
    user.hasMany(models.followers);
    user.hasMany(models.report);




  };
  return user;
};