export default (sequelize, DataTypes) => {
  const Grades = sequelize.define('Grades', {
    gradeId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    termId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ca1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ca2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ca3: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    exam: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    htcomment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ftcomment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    upload: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    upload2: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  Grades.associate = (models) => {
    Grades.belongsTo(models.Assignment, {
      foreignKey: 'assignmentId',
    });
    Grades.belongsTo(models.Students, {
      foreignKey: 'studentId',
    });
  };
  return Grades;
};
