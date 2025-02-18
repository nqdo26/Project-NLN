const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'document' }],
    total: Number,
});

const Library = mongoose.model('library', librarySchema);

module.exports = Library;
