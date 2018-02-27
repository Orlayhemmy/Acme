export default (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    questionId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    testId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });
  Question.associate = (models) => {
    Question.belongsTo(models.Test, {
      foreignKey: 'testId',
    });
  }
  return Question;
}