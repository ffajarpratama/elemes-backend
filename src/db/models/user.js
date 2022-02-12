'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    cloudinaryPublicId: DataTypes.STRING,
    cloudinarySecureURL: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, { paranoid: true });

  return User;
}