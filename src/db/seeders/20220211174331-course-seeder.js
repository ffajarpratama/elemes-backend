'use strict';
const { Category } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = await Category.findAll();
    const courses = [];
    for (let i = 0; i < categories.length; i++) {
      courses.push({
        CategoryId: categories[i]['id'],
        name: `Course #${i + 1}`,
        price: '150000',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    return queryInterface.bulkInsert('Courses', courses);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Courses', null, {});
  }
};
