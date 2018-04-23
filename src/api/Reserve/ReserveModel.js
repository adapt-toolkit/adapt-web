const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReserveSchema = mongoose.Schema({
    email: {type: String, unique: true},
    image: { type: Schema.Types.ObjectId, ref: 'Image' },
    confirmed: Boolean
})

module.exports = mongoose.model('Reserve', ReserveSchema);