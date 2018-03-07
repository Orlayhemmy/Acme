'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Grades', {
      gradeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      termId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ca1: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      ca2: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      ca3: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      exam: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      htcomment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ftcomment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      upload: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      upload2: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    return queryInterface.dropTable('Grades');
  }
};