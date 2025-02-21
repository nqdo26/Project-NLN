const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
    title: String,
});

const Level = mongoose.model('level', levelSchema);

module.exports = Level;
