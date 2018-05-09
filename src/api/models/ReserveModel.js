const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Reserves = sequelize.define('reserve', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuid()
    },
    collectible_id: DataTypes.INTEGER,

    email: DataTypes.STRING,
    confirmed: DataTypes.BOOLEAN
  }, {
    tableName: 'reserves',
    createdAt   : 'created_at',
    updatedAt   : 'updated_at',
    timestamps  : true,
    underscored : true
  });
  return Reserves;
};
