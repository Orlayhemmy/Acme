export default (sequelize, DataTypes) => {
  const Subjects = sequelize.define('Subjects', {
    subjectname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    staffId: {
      type: DataTypes.INTEGER,
    },
  });
  Subjects.associate = (models) => {
    Subjects.belongsTo(models.Staffs, {
      foreignKey: 'staffId',
    });
  }
  return Subjects;
};