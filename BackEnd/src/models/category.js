const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: String,
});

const Level = mongoose.model('category', categorySchema);

module.exports = Level;
