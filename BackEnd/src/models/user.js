const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    description: String,
    avatar: String,
    terms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'term' }],
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'course' }],
    note: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
