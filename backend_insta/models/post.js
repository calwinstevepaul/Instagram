'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    userId: DataTypes.INTEGER,
    postPhoto: DataTypes.STRING,
    postDescription: DataTypes.STRING
  }, {});
  post.associate = function(models) {
    // associations can be defined here
    post.belongsTo(models.user);
    post.hasMany(models.like);
    post.hasMany(models.comment)
    post.hasMany(models.report)



  };
  return post;
};