const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const Collectibles = sequelize.define('collectible', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_id: DataTypes.INTEGER,

    hashsum: DataTypes.STRING,
    ext: DataTypes.STRING,

    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER,

    description: DataTypes.TEXT,

    amount: DataTypes.INTEGER,
    eth: DataTypes.FLOAT
  }, {
    tableName: 'collectibles',
    createdAt   : 'created_at',
    updatedAt   : 'updated_at',
    timestamps  : true,
    underscored : true
  });

  return Collectibles;
};
