const {
    createLessonService,
    getLessonsInfoService,
    getLessonInfoService,
    getLessonsInfoByIdsService,
    deleteLessonService,
    addContentService,
    getContentService,
    updateLessonInfoService,
} = require('../services/lessonService');
const { uploadAvatar } = require('../../middleware/multer');
const jwt = require('jsonwebtoken');
const Tag = require('../models/tag');
const Term = require('../models/term');

const createLesson = async (req, res) => {
    const content = req.file;
    const { name, description, course } = req.body;

    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const data = await createLessonService(owner, name, description, content, course);
    return res.status(200).json(data);
};

const addContent = async (req, res) => {
    const content = req.file;
    const { lessonId } = req.body;
    console.log(lessonId, content);

    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const data = await addContentService(lessonId, content);
    return res.status(200).json(data);
};

const getLessonInfo = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const { lessonId } = req.body;

    const data = await getLessonInfoService(owner, lessonId);
    return res.status(200).json(data);
};

const getLessonsInfoByIds = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const { lessonsIds } = req.body;

    const data = await getLessonsInfoByIdsService(owner, lessonsIds);
    return res.status(200).json(data);
};

const getContent = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const { lessonId } = req.body;

    const data = await getContentService(owner, lessonId);
    return res.status(200).json(data);
};

const deleteLesson = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const { lessonId } = req.body;

    const data = await deleteLessonService(lessonId);
    return res.status(200).json(data);
};

const updateLessonInfo = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const { lessonId, name, description } = req.body;

    const data = await updateLessonInfoService(lessonId, name, description);
    return res.status(200).json(data);
};

module.exports = {
    createLesson,
    getLessonInfo,
    getLessonsInfoByIds,
    addContent,
    getContent,
    deleteLesson,
    updateLessonInfo,
};
