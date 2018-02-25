export default (sequelize, DataTypes) => {
  const LessonNote = sequelize.define('LessonNote', {
    noteId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    termId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weekId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    staffId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    scope: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    activity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    objectives: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    materials: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    behaviours: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    assessment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    questions: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    strategies: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preview: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    upload: {
      type: DataTypes.BOOLEAN,
    },
  });
  LessonNote.associate = (models) => {
    LessonNote.belongsTo(models.Term, {
      foreignKey: 'termId',
    });
    LessonNote.belongsTo(models.Week, {
      foreignKey: 'weekId',
    });
    LessonNote.belongsTo(models.Class, {
      foreignKey: 'classId',
    });
    LessonNote.belongsTo(models.Staffs, {
      foreignKey: 'staffId',
    });
    LessonNote.belongsTo(models.Subjects, {
      foreignKey: 'subjectId',
    });
  }
  return LessonNote;
};