const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'document' },
    reporterId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    description: String,
    reportAt: Date,
    status: String,
});

const Report = mongoose.model('report', reportSchema);

module.exports = Report;
