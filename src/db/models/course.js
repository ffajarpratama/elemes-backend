'use strict';

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    cloudinaryPublicId: DataTypes.STRING,
    cloudinarySecureURL: DataTypes.STRING,
    rating: DataTypes.INTEGER,
  });

  Course.associate = models => {
    Course.belongsTo(models.Category);
  }

  return Course;
}