module.exports = (sequelize, DataTypes) => {
  const Subscriptions = sequelize.define('subscription', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: DataTypes.STRING,
  }, {
    tableName: 'subscriptions',
    createdAt   : 'created_at',
    updatedAt   : 'updated_at',
    timestamps  : true,
    underscored : true
  });
  return Subscriptions;
};
