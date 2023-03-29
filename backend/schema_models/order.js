const mongoose = require('mongoose');

module.exports = mongoose.model('order', new mongoose.Schema({
    date: { type: String },
    items: [String]
}));