'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Students', [{
      firstname: 'Anita',
      lastname: 'Colson',
      middlename: 'Ayomide',
      dob: 'march 22, 1972',
      address: '20 valleyview lane',
      origin: 'Ekiti',
      mobile: '08034343434',
      sex: 'male',
      password: 'colson',
      classId: '1',
      studentId: 'yss240',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Students', null, {});
  }
}