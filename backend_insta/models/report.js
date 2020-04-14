'use strict';
module.exports = (sequelize, DataTypes) => {
  const report = sequelize.define('report', {
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  report.associate = function(models) {
    // associations can be defined here
    report.belongsTo(models.user)
    report.belongsTo(models.post)
  };
  return report;
};