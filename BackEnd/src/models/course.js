const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    owner: String,
    emoji: String,
    color: String,
    cover: String,
    name: String,
    description: String,
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tag' }],
    startDate: Date,
    endDate: Date,
    term: { type: mongoose.Schema.Types.ObjectId, ref: 'term' },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'lesson' }],
    statistics: { type: mongoose.Schema.Types.ObjectId, ref: 'statistics' },
    note: String,
});

const Course = mongoose.model('course', courseSchema);

module.exports = Course;
