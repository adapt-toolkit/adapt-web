module.exports = (sequelize, DataTypes) => {
    const Downloads = sequelize.define('download', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ip: DataTypes.STRING,
        userAgent: DataTypes.STRING,
    }, {
        tableName: 'download'
    });
    return Downloads;
};
