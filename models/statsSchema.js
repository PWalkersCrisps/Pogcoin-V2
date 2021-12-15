const mongoose = require('mongoose');
// How the fuck do you expect me to explain this??
const statsSchema = new mongoose.Schema({
    userID: { type: mongoose.SchemaTypes.String, require: true, unique: true },
    totalCoinsEarnt: { type: mongoose.SchemaTypes.Number },
    coinsDonated: { type: mongoose.SchemaTypes.Number },
    coinsReceived: { type: mongoose.SchemaTypes.Number },
    netGamble: { type: mongoose.SchemaTypes.Number },
    robSuccess: { type: mongoose.SchemaTypes.Number },
    robFails: { type: mongoose.SchemaTypes.Number },
    timesRobbed: { type: mongoose.SchemaTypes.Number },
});

const model = mongoose.model('StatsModels', statsSchema);
module.exports = model;