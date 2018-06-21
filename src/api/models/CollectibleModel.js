module.exports = (sequelize, DataTypes) => {
  const Collectibles = sequelize.define('collectible', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_id: DataTypes.INTEGER,

    collectible_file: DataTypes.STRING,
    json_file: DataTypes.STRING,

    hashsum: DataTypes.STRING,
    ext: DataTypes.STRING,

    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER,

    description: DataTypes.TEXT,

    amount: DataTypes.INTEGER,
    eth: DataTypes.FLOAT,

    unsaleable: DataTypes.BOOLEAN,
    sort_order: DataTypes.INTEGER
  }, {
    tableName: 'collectibles',
    createdAt   : 'created_at',
    updatedAt   : 'updated_at',
    timestamps  : true,
    underscored : true
  });

  return Collectibles;
};
