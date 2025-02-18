const mongoose = require('mongoose');

// Test Schema
const testSchema = new mongoose.Schema({
    name: String,
    gradeWeight: Number,
    maxScore: Number,
    score: Number,
    date: Date,
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
