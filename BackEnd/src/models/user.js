const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    fullName: String,
    avatar: String,
    isAdmin: Boolean,
    statistics: {
        liked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'document' }],
        disliked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'document' }],
    },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
