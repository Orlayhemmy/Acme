export default (sequelize, DataTypes) => {
  const Subjects = sequelize.define('Subjects', {
    subjectId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    subjectname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Subjects.associate = (models) => {
    Subjects.hasMany(models.Staffs, {
      foreignKey: 'subjectId',
    });
    Subjects.hasMany(models.LessonNote, {
      foreignKey: 'subjectId',
    });
  }
  return Subjects;
};