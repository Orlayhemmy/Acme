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
      password: '$2a$10$Bmuaah35zYVHNAk1MbuzmeST4BzkPVfymSCvmGY4P.5u3vUy1vLla',
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