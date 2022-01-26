const mongoose = require('mongoose');

const uzytkownikSchema = new mongoose.Schema({
    login: String,
    haslo: String,
})

module.exports = mongoose.model('Uzytkownik',uzytkownikSchema);