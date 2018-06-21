module.exports = (sequelize, DataTypes) => {
  const Downloads = sequelize.define('download', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ip: DataTypes.STRING,
    user_agent: DataTypes.STRING,
  }, {
    tableName: 'downloads',
    createdAt   : 'created_at',
    updatedAt   : 'updated_at',
    timestamps  : true,
    underscored : true
  });
  return Downloads;
};
