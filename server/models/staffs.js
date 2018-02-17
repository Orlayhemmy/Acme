export default (sequelize, DataTypes) => {
  const Staffs = sequelize.define('Staffs', {
    staff_id: {
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
    middlename: DataTypes.STRING,
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
    }
  });
  Staffs.associate = (models) => {
    Staffs.belongsTo(models.Class, {
      foreignKey: 'classId',
    });
    Staffs.hasOne(models.Subjects, {
      foreignKey: 'staffId',
    })
  };
  return Staffs;
};