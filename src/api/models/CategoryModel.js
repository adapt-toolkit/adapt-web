const mongoose = require('mongoose');
const crypto = require('crypto');

const CategorySchema = mongoose.Schema({
    category_name: String,
    title: String,
    index: Number,
    description: String
})

module.exports = mongoose.model('Category', CategorySchema);

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
