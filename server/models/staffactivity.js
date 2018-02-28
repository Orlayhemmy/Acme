export default (sequelize, DataTypes) => {
  const StaffActivity = sequelize.define('StaffActivity', {
    activityId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    staffId: {
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
  StaffActivity.associate = (models) => {
    StaffActivity.belongsTo(models.Staffs, {
      foreignKey: 'staffId',
    });
  }
  return StaffActivity;
}