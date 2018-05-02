const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
    const Reserves = sequelize.define('reserve', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: uuid()
        },
        email: DataTypes.STRING,
        confirmed: DataTypes.BOOLEAN,
        image_id: DataTypes.INTEGER
    }, {
        tableName: 'reserve'
    });
    return Reserves;
};
