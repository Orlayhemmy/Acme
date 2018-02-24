export default (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    assignmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    upload: {
      type: DataTypes.BOOLEAN,
    },
  });
  Feedback.associate = (models) => {
    Feedback.belongsTo(models.Assignment, {
      foreignKey: 'assignmentId',
    });
    Feedback.belongsTo(models.Students, {
      foreignKey: 'studentId',
    });
  };
  return Feedback;
};
