'use strict';

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
  });

  Category.associate = models => {
    Category.hasMany(models.Course, { onDelete: 'cascade', hooks: true });
  }

  return Category;
}