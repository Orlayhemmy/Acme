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
  }
  return LessonNote;
};