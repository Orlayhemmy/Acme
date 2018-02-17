export default (sequelize, DataTypes) => {
  const Term = sequelize.define('Term', {
    termname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Term.associate = (models) => {
    Term.hasMany(models.LessonNote, {
      foreignKey: 'termId',
    });
  }
  return Term;
}