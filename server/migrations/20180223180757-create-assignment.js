'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Assignments', {
      assignmentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      termId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      weekId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      classId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      staffId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      upload: {
        type: Sequelize.BOOLEAN,
        DefaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Assignments');
  }
};