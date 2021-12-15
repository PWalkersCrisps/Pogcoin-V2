const mongoose = require('mongoose');
// How the fuck do you expect me to explain this??
const cooldownSchema = new mongoose.Schema({
    userID: { type: mongoose.SchemaTypes.String, require: true, unique: true },
    dailyTimestamp: { type: mongoose.SchemaTypes.Number },
    robTimestamp: { type: mongoose.SchemaTypes.Number },
});

const model = mongoose.model('CooldownModels', cooldownSchema);
module.exports = model;