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
        type: Sequelize.TEXT,
        allowNull: true,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      topic: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      scope: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      activity: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      objectives: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      materials: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      behaviours: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      assessment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      questions: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      reference: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      strategies: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      preview: {
        type: Sequelize.STRING(133),
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