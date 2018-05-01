module.exports = (sequelize, DataTypes) => {
    const Categories = sequelize.define('category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        category_name: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.STRING
    }, {
        tableName: 'category'
    });
    return Categories;
};
