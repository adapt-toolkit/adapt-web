const mongoose = require('mongoose');
const crypto = require('crypto');

const CategorySchema = mongoose.Schema({
    category_name: String,
    title: String,
    index: Number,
    description: String
})

module.exports = mongoose.model('Category', CategorySchema);