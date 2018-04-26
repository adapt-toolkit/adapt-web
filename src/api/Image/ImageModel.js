const mongoose = require('mongoose');
const crypto = require('crypto');

const ImageSchema = mongoose.Schema({
    id: String,
    description: String,
    eth: Number,
    amount: Number,
    width: Number,
    height: Number,
    ext: String,
    category: String,
    reserves: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reserve'}]
})

ImageSchema.pre('save', function(next) {
    this.id = crypto.createHash('sha256').update(this.id).digest('hex');
    next();
})

module.exports = mongoose.model('Image', ImageSchema);