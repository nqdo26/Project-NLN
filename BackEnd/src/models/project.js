const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: String,
    totalSteps: Number,
    completedSteps: Number,
    steps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'projectStep' }],
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
