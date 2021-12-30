const mongoose = require('mongoose');
// How the fuck do you expect me to explain this??
const cooldownSchema = new mongoose.Schema({
    userID: { type: mongoose.SchemaTypes.String, require: true, unique: true },
    dailyTimestamp: { type: mongoose.SchemaTypes.Date, default: 1577836800000 },
    robTimestamp: { type: mongoose.SchemaTypes.Date, default: 1577836800000 },
});

// 1577836800000 Is the first of January 2020 midnight exactly 01/01/2020 00:00:00.000

const model = mongoose.model('CooldownModels', cooldownSchema);
module.exports = model;