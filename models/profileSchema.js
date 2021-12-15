const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: mongoose.SchemaTypes.String, require: true, unique: true },
    coins: { type: mongoose.SchemaTypes.Number, default: 1 },
});

const model = mongoose.model('ProfileModels', profileSchema);
module.exports = model;