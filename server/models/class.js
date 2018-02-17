export default (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    classname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Class.associate = (models) => {
    Class.hasOne(models.Staffs, {
      foreignKey: 'classId',
    });
    Class.hasMany(models.Students, {
      foreignKey: 'classId',
    });
    Class.hasMany(models.LessonNote, {
      foreignKey: 'classId',
    });
  };
  return Class;
};