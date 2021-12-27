const mongoose = require('mongoose');
// How the fuck do you expect me to explain this??
const statsSchema = new mongoose.Schema({
    userID: { type: mongoose.SchemaTypes.String, require: true, unique: true },
    totalCoinsEarnt: { type: mongoose.SchemaTypes.Number, default: 1 },
    coinsDonated: { type: mongoose.SchemaTypes.Number, default: 0 },
    coinsReceived: { type: mongoose.SchemaTypes.Number, default: 0 },
    netGamble: { type: mongoose.SchemaTypes.Number, default: 0 },
    robSuccess: { type: mongoose.SchemaTypes.Number, default: 0 },
    robFails: { type: mongoose.SchemaTypes.Number, default: 0 },
    timesRobbed: { type: mongoose.SchemaTypes.Number, default: 0 },
});

const model = mongoose.model('StatsModels', statsSchema);
module.exports = model;