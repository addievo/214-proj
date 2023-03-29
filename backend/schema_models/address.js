const mongoose = require('mongoose');

module.exports = mongoose.model('address', new mongoose.Schema({
    streetAddress: { type: String }, // string because it might be 'unit 3/182' for example
    postcode: { type: Number },
    state: { type: String }
}));