'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('LessonNotes', {
      noteId: {
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
      subjectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      topic: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      scope: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      activity: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      objectives: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      materials: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      behaviours: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      assessment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      questions: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      reference: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      strategies: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      preview: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      upload:  {
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
    return queryInterface.dropTable('LessonNotes');
  }
};