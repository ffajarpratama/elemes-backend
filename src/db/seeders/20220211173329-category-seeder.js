'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const categories = [];
    for (let i = 1; i <= 5; i++) {
      categories.push({
        name: `Course Category #${i}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert('Categories', categories);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
