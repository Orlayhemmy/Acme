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
      type: DataTypes.TEXT,
      allowNull: true,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    topic: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    scope: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    activity: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    objectives: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    materials: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    behaviours: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    assessment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    questions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    reference: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    strategies: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    preview: {
      type: DataTypes.STRING(133),
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