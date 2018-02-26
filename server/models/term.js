export default (sequelize, DataTypes) => {
  const Term = sequelize.define('Term', {
    termId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    termname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    current: {
      type: DataTypes.BOOLEAN,
    },
  });
  Term.associate = (models) => {
    Term.hasMany(models.LessonNote, {
      foreignKey: 'termId',
    });
    Term.hasMany(models.Test, {
      foreignKey: 'termId',
    });
  }
  return Term;
}