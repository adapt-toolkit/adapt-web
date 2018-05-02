const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
    const Images = sequelize.define('image', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        eth: DataTypes.STRING,
        amount: DataTypes.INTEGER,
        width: DataTypes.INTEGER,
        height: DataTypes.INTEGER,
        ext: DataTypes.STRING,
        category: DataTypes.STRING
    }, {
        tableName: 'image'
    });

    Images.beforeCreate((image, options) => {
        image.name = crypto.createHash('sha256').update(image.name).digest('hex');
    });

    return Images;
};
