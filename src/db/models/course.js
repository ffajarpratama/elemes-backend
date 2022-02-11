'use strict';

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    name: DataTypes.STRING,
    price: DataTypes.STRING,
  });

  Course.associate = models => {
    Course.belongsTo(models.Category);
  }
}