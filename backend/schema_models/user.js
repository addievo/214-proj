const mongoose = require('mongoose');

module.exports = mongoose.model('user', new mongoose.Schema({
    userID: { type: String },
    password: { type: String },

    firstName: { type: String },
    lastName: { type: String },
    dateOfBirth: {type: String },
    phoneNum: {type: String },
    addressMailing: {type: String },    // ID on database that contains address
    addressBilling: {type: String },    // ID on database that contains address

    points: { type: Number },
    rewardTier: { type: Number},
    nextTier: {type: Number},
	tierProgress: {type: Number},
    orders: [String]
}));