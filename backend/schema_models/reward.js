const mongoose = require('mongoose');

module.exports = mongoose.model('reward', new mongoose.Schema({
    fileName: { type: String },
    tierName: { type: String },
    rewardTier: { type: Number },
    cost: { type: Number },
    description: { type: String }
}));