export default (sequelize, DataTypes) => {
  const TeacherClasses = sequelize.define('TeacherClasses', {
    staffId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  TeacherClasses.associate = (models) => {
    TeacherClasses.belongsTo(models.Staffs, {
      foreignKey: 'staffId',
    });
    TeacherClasses.belongsTo(models.Class, {
      foreignKey: 'classId',
    });
  };
  return TeacherClasses;
};