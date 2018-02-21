export default (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    deptId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    dept_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Department.associate = (models) => {
    Department.hasMany(models.Staffs, {
      foreignKey: 'deptId',
    });
  };
  return Department;
};