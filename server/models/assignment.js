export default (sequelize, DataTypes) => {
  const Assignment = sequelize.define('Assignment', {
    assignmentId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    termId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weekId: {
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
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    upload: {
      type: DataTypes.BOOLEAN,
    },
    preview: {
      type: DataTypes.STRING(133),
    },
  });
  Assignment.associate = (models) => {
    Assignment.belongsTo(models.Term, {
      foreignKey: 'termId',
    });
    Assignment.belongsTo(models.Week, {
      foreignKey: 'weekId',
    });
    Assignment.belongsTo(models.Class, {
      foreignKey: 'classId',
    });
    Assignment.belongsTo(models.Staffs, {
      foreignKey: 'staffId',
    });
    Assignment.hasMany(models.Feedback, {
      foreignKey: 'assignmentId',
    });
  };
  return Assignment;
};
