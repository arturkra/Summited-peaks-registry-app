const mongoose = require('mongoose');

const przejscieSchema = new mongoose.Schema({
    nazwaGory: String,
    dataPrzejscia: String,
    wysokoscGory: Number,
    krajGory: String,
    uwagiPrzejscia: String
})

module.exports = mongoose.model("Przejscie", przejscieSchema);