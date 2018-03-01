export default (sequelize, DataTypes) => {
  const StudentActivity = sequelize.define('StudentActivity', {
    activityId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    studentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
  });
  StudentActivity.associate = (models) => {
    StudentActivity.belongsTo(models.Students, {
      foreignKey: 'studentId',
    });
  }
  return StudentActivity;
}