export default (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    feedbackId: {
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
      type: DataTypes.TEXT,
      allowNull: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    assignmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    upload: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
