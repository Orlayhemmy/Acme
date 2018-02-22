'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Classes', [{
      classname: 'Grade 7',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
    {
      classname: 'Grade 8',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      classname: 'Grade 9',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Classes', null, {});
  }
}