'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Questions', {
      questionId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      testId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      opt_a: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      opt_b: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      opt_c: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      opt_d: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      point: {
        type: Sequelize.CHAR(1),
        allowNull: false,
      },
      answer: {
        type: Sequelize.CHAR(1),
        allowNull: false,
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
    return queryInterface.dropTable('Questions');
  }
};