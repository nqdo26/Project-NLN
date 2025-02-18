const {
    addCourseService,
    addTermService,
    removeCourseService,
    removeTermService,
    getAllTestsInfoService,
    getAllTermGradesService,
    getUserStatisticsService,
    getAllCurrentService,
    getIncompleteProjectsService,
} = require('../services/sharedService');
const { uploadAvatar } = require('../../middleware/multer');
const jwt = require('jsonwebtoken');
const Tag = require('../models/tag');
const Term = require('../models/term');
const moment = require('moment');

const addCourseToTerm = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const { termId, courseId } = req.body;

    await addTermService(courseId, termId);
    const data = await addCourseService(termId, courseId);
    return res.status(200).json(data);
};

const removeCourseFromTerm = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const { termId, courseId } = req.body;

    const result = await removeCourseService(termId, courseId);
    const startDate = moment(result.startDate).format('yyyy-MM-DD');
    const endDate = moment(result.endDate).format('yyyy-MM-DD');
    const data = await removeTermService(courseId, startDate, endDate);
    return res.status(200).json({
        EC: 0,
        data: data,
    });
};

const getAllTestsInfo = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const result = await getAllTestsInfoService(owner);
    if (result) {
        return res.status(200).json(result);
    } else {
        return res.status(500).json({ error: 'Failed to fetch tests info' });
    }
};

const getAllTermGrades = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const result = await getAllTermGradesService(owner);
    if (result) {
        return res.status(200).json(result);
    } else {
        return res.status(500).json({ error: 'Failed to fetch tests info' });
    }
};

const getUserStatistics = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const result = await getUserStatisticsService(owner);
    if (result) {
        return res.status(200).json(result);
    } else {
        return res.status(500).json({ error: 'Failed to fetch tests info' });
    }
};

const getAllCurrent = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const result = await getAllCurrentService(owner);
    if (result) {
        return res.status(200).json(result);
    } else {
        return res.status(500).json({ error: 'Failed to fetch tests info' });
    }
};

const getIncompleteProject = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const result = await getIncompleteProjectsService(owner);
    if (result) {
        return res.status(200).json(result);
    } else {
        return res.status(500).json({ error: 'Failed to fetch tests info' });
    }
};

module.exports = {
    addCourseToTerm,
    removeCourseFromTerm,
    getAllTestsInfo,
    getAllTermGrades,
    getUserStatistics,
    getAllCurrent,
    getIncompleteProject,
};
