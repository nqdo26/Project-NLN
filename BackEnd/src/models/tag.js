const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    name: String,
    color: String,
});

const Tag = mongoose.model('tag', tagSchema);

module.exports = Tag;
