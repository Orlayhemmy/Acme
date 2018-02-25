'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Weeks', [{
      weekname: '1',
      current: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        weekname: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        weekname: '3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        weekname: '4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        weekname: '5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        weekname: '6',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        weekname: '7',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        weekname: '8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        weekname: '9',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        weekname: '10',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        weekname: '11',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Weeks', null, {});
  }
};
