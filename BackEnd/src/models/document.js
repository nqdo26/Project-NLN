const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    title: String,
    description: String,
    createAt: Date,
    link: String,
    type: String,
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'category' }],
    level: { type: mongoose.Schema.Types.ObjectId, ref: 'level' },
    statistics: {
        views: Number,
        saved: Number,
        downloaded: Number,
        liked: Number,
        disliked: Number,
    },
});

const Document = mongoose.model('document', documentSchema);

module.exports = Document;
