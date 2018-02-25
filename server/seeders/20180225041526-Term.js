'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Terms', [{
      termname: '1',
      current: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        termname: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        termname: '3',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Terms', null, {});
  }
};
