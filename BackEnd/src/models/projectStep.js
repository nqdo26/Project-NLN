const mongoose = require('mongoose');

const projectStepSchema = new mongoose.Schema({
    name: String,
    status: Boolean,
});

const projectStep = mongoose.model('projectStep', projectStepSchema);

module.exports = projectStep;
