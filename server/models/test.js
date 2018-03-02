export default (sequelize, DataTypes) => {
  const Test = sequelize.define('Test', {
    testId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    termId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    staffId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    intro: {
      type: DataTypes.TEXT,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    upload: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  Test.associate = (models) => {
    Test.belongsTo(models.Class, {
      foreignKey: 'classId',
    });
    Test.belongsTo(models.Term, {
      foreignKey: 'termId',
    });
    Test.belongsTo(models.Staffs, {
      foreignKey: 'staffId',
    });
    Test.hasMany(models.Question, {
      foreignKey: 'testId',
    });
    Test.belongsTo(models.Subjects, {
      foreignKey: 'subjectId',
    });
  }
  return Test;
}