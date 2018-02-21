'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Departments', [{
      dept_name: 'HOD',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        dept_name: 'House Parent',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dept_name: 'Matron',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dept_name: 'Principal',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dept_name: 'Subject Teacher',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dept_name: 'Vice Principal',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dept_name: 'Year Tutor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dept_name: 'Vice Principal/Year Tutor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dept_name: 'HOD/Year Tutor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dept_name: 'Entry Officer/Operator',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dept_name: 'Accounting Officer',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Departments', null, {});
  }
};
