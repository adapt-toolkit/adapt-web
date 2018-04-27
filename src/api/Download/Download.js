const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DownloadSchema = mongoose.Schema({
    userAgent: String,
    ip: String
})

module.exports = mongoose.model('Download', DownloadSchema);