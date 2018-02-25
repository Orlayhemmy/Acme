export default (sequelize, DataTypes) => {
  const Week = sequelize.define('Week', {
    weekId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    weekname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    current: {
      type: DataTypes.BOOLEAN,
    },
  });
  Week.associate = (models) => {
    Week.belongsTo(models.LessonNote, {
      foreignKey: 'weekId',
    });
  }
  return Week;
};