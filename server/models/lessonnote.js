export default (sequelize, DataTypes) => {
  const LessonNote = sequelize.define('LessonNote', {
    termId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weekId:  {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    classId:  {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subjectId:  {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content:  {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  lessonNote.associate = (models) => {
    lessonNote.belongsTo(models.Term, {
      foreignKey: 'termId',
    });
    lessonNote.belongsTo(models.Week, {
      foreignKey: 'weekId',
    });
    lessonNote.belongsTo(models.Class, {
      foreignKey: 'classId',
    });
    lessonNote.belongsTo(models.Staffs, {
      foreignKey: 'staffId',
    });
  }
  return LessonNote;
};