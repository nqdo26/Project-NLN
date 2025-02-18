const {
    createCourseService,
    getCoursesInfoService,
    getCourseInfoService,
    getCoursesInfoByIdsService,
    deleteCourseService,
    updateCourseService,
    updateCourseNoteService,
} = require('../services/courseService');
const { uploadAvatar } = require('../../middleware/multer');
const jwt = require('jsonwebtoken');
const Tag = require('../models/tag');
const Term = require('../models/term');
const { deleteLessonsByIdsService } = require('../services/lessonService');
const moment = require('moment');
const { addCourseService } = require('../services/sharedService');

const createCourse = async (req, res) => {
    const { emoji, color, name, description, startDate, endDate, term } = req.body;
    let newStartDate = startDate;
    let newEndDate = endDate;
    const cover = req.file;
    const tags = [];
    if (req.body.tags) {
        req.body.tags.forEach((tag) => {
            tags.push(tag);
        });
    }
    console.log(tags);
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const tagsResult = await Tag.find({ name: { $in: tags } }).select('_id');
    const tagIds = tagsResult.map((tag) => tag._id);

    const termResult = await Term.findOne({ name: term });
    const termId = termResult ? termResult._id : null;
    if (termId) {
        newStartDate = moment(termResult.startDate).format('YYYY-MM-DD');
        newEndDate = moment(termResult.endDate).format('YYYY-MM-DD');
    }

    const data = await createCourseService(
        owner,
        emoji,
        color,
        cover,
        name,
        description,
        tagIds,
        newStartDate,
        newEndDate,
        termId,
    );
    return res.status(200).json(data);
};

const getCourseInfo = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const { courseId } = req.body;

    const data = await getCourseInfoService(owner, courseId);
    return res.status(200).json(data);
};

const getCoursesInfo = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const data = await getCoursesInfoService(owner);
    return res.status(200).json(data);
};

const getCoursesInfoByIds = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const { coursesIds } = req.body;

    const data = await getCoursesInfoByIdsService(owner, coursesIds);
    return res.status(200).json(data);
};

const deleteCourse = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const { courseId } = req.body;

    const data = await deleteCourseService(owner, courseId);
    const lessonsIds = data.lessons;
    await deleteLessonsByIdsService(lessonsIds);

    return res.status(200).json(data);
};

const updateCourse = async (req, res) => {
    const { emoji, color, name, description, startDate, endDate, term, courseId } = req.body;
    let newStartDate = startDate;
    let newEndDate = endDate;
    const cover = req.file;
    const tags = [];
    if (req.body.tags) {
        req.body.tags.forEach((tag) => {
            tags.push(tag);
        });
    }
    console.log(tags);
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const tagsResult = await Tag.find({ name: { $in: tags } }).select('_id');
    const tagIds = tagsResult.map((tag) => tag._id);

    if (term === '') {
        const termWithCourse = await Term.findOne({ courses: courseId });
        if (termWithCourse) {
            termWithCourse.courses.pull(courseId);
            await termWithCourse.save();
        }
    } else {
        const termId = await Term.findOne({ name: term });
        if (termId) {
            await addCourseService(termId, courseId);
        }
    }

    const termResult = await Term.findOne({ name: term });
    const termId = termResult ? termResult._id : null;
    if (termId) {
        newStartDate = moment(termResult.startDate).format('YYYY-MM-DD');
        newEndDate = moment(termResult.endDate).format('YYYY-MM-DD');
    }

    const data = await updateCourseService(
        owner,
        emoji,
        color,
        cover,
        name,
        description,
        tagIds,
        newStartDate,
        newEndDate,
        termId,
        courseId,
    );
    return res.status(200).json(data);
};

const updateCourseNote = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const { courseId, newNote } = req.body;

    const data = await updateCourseNoteService(courseId, newNote);

    return res.status(200).json(data);
};

module.exports = {
    createCourse,
    getCourseInfo,
    getCoursesInfo,
    getCoursesInfoByIds,
    deleteCourse,
    updateCourse,
    updateCourseNote,
};
