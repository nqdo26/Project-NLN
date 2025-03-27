const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    fullName: String,
    avatar: String,
    isAdmin: {
        type: Boolean,
        default: false,
    },
    statistics: {
        liked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'document' }],
        disliked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'document' }],
        saved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'document' }],
    },
    recentlyRead: [
        {
            document: { type: mongoose.Schema.Types.ObjectId, ref: 'document' },
            readAt: { type: Date, default: Date.now }
        }
    ]
});

const User = mongoose.model('user', userSchema);

module.exports = User;
