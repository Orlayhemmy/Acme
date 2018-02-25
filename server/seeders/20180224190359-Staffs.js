'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Staffs', [{
      firstname: 'Williams',
      lastname: 'Oyeleke',
      middlename: 'Ayomide',
      dob: 'march 22, 1972',
      address: '20 valleyview lane',
      origin: 'Ekiti',
      mobile: '08034343434',
      sex: 'male',
      password: '$2a$10$Bmuaah35zYVHNAk1MbuzmeST4BzkPVfymSCvmGY4P.5u3vUy1vLla',
      classId: '1',
      subjectId: '1',
      deptId: '1',
      staffId: 'ys240',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Staffs', null, {});
  }
}