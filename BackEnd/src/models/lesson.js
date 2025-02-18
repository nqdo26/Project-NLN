const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    owner: String,
    name: String,
    description: String,
    content: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'course' },
});

const Lesson = mongoose.model('lesson', lessonSchema);

module.exports = Lesson;
