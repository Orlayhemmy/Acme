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
    },
    opt_a: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    opt_b: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    opt_c: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    opt_d: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer: {
      type: DataTypes.CHAR(1),
      allowNull: false,
    },
    point: {
      type: DataTypes.CHAR(1),
      allowNull: false,
    },
  });
  Question.associate = (models) => {
    Question.belongsTo(models.Test, {
      foreignKey: 'testId',
    });
  }
  return Question;
}