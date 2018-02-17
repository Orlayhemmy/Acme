export default (sequelize, DataTypes) => {
  const Week = sequelize.define('Week', {
    weekname: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  Week.associate = (models) => {
    Week.belongsTo(models.LessonNote, {
      foreignKey: 'weekId',
    });
  }
  return Week;
};