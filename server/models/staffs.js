export default (sequelize, DataTypes) => {
  const Staffs = sequelize.define('Staffs', {
    staffId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middlename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: DataTypes.STRING,
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    classId: {
      type: DataTypes.INTEGER,
    },
    subjectId: {
      type: DataTypes.INTEGER,
    },
    deptId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    HOD: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
  Staffs.associate = (models) => {
    Staffs.belongsTo(models.Class, {
      foreignKey: 'classId',
    });
    Staffs.belongsTo(models.Subjects, {
      foreignKey: 'subjectId',
    });
    Staffs.hasMany(models.LessonNote, {
      foreignKey: 'staffId',
    });
    Staffs.belongsTo(models.Department, {
      foreignKey: 'deptId',
    });
    Staffs.hasMany(models.TeacherClasses, {
      foreignKey: 'staffId',
    });
    Staffs.hasMany(models.Test, {
      foreignKey: 'staffId',
    });
  };
  return Staffs;
};