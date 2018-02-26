export default (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    classId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
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
    Class.hasMany(models.TeacherClasses, {
      foreignKey: 'classId',
    });
    Class.hasMany(models.Test, {
      foreignKey: 'classId',
    });
  };
  return Class;
};