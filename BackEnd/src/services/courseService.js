require('dotenv').config();
const Course = require('../models/course');
const Term = require('../models/term');
const Statistics = require('../models/statistics');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { addCourseService, removeCourseService } = require('./sharedService');
const { deleteStatisticsService, createStatisticsService } = require('./statisticsService');
const { createStatistics } = require('../controllers/statisticsController');
const { getTermInfoService } = require('./termService');
const moment = require('moment');
const { addCourseToUserService, deleteCourseFromUserService } = require('./userService');
const { deleteLessonsByIdsService, deleteLessonService } = require('./lessonService');

const createCourseService = async (
    owner,
    emoji,
    color,
    cover,
    name,
    description,
    tagsIds,
    newStartDate,
    newEndDate,
    termId,
) => {
    try {
        const course = await Course.findOne({ name: name, owner: owner });
        if (course) {
            console.log('Duplicate course name');
            return {
                EC: 0,
                EM: 'Duplicate course name',
            };
        }
        let coverPath = '';
        if (cover) {
            coverPath = cover.path;
        }

        // save course

        const statistics = await createStatisticsService(owner);

        const result = await Course.create({
            owner: owner,
            emoji: emoji,
            color: color,
            cover: coverPath,
            name: name,
            description: description,
            tags: tagsIds,
            startDate: new Date(newStartDate),
            endDate: new Date(newEndDate),
            term: termId,
            statistics: statistics._id,
            note: '',
        });

        const courseId = result._id;
        await addCourseToUserService(courseId, owner);
        const kq = await addCourseService(termId, courseId);
        console.log(kq);

        return { result };
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getCoursesInfoService = async (owner) => {
    try {
        let result = await Course.find({ owner: owner });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getCourseInfoService = async (owner, courseId) => {
    try {
        let result = await Course.findById(courseId);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getCoursesInfoByIdsService = async (owner, coursesIds) => {
    try {
        let result = await Course.find({ _id: { $in: coursesIds } });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const deleteCourseService = async (owner, courseId) => {
    try {
        // Delete the course
        let result = await Course.findByIdAndDelete(courseId);
        if (result.cover) {
            const coverPath = path.join(result.cover);

            // Delete the old avatar file
            fs.unlink(coverPath, (err) => {
                if (err) {
                    console.error(`Failed to delete cover: ${err.message}`);
                } else {
                    console.log('Cover deleted successfully');
                }
            });
        }

        if (result.term) {
            const termId = result.term;
            const courseId = result._id;
            const kq = removeCourseService(termId, courseId);
            console.log('Delete ' + kq + ' successfully!');
        }

        if (result.statistics) {
            await deleteStatisticsService(result.statistics);
        }

        if (result.lessons && result.lessons.length > 0) {
            for (const lessonId of result.lessons) {
                await deleteLessonService(lessonId);
            }
        }

        await deleteCourseFromUserService(courseId, owner);

        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const updateCourseService = async (
    owner,
    emoji,
    color,
    cover,
    name,
    description,
    tagsIds,
    newStartDate,
    newEndDate,
    term,
    courseId,
) => {
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return {
                EC: 0,
                EM: 'Course not found',
            };
        }

        if (cover && course.cover) {
            const oldCoverPath = path.join(course.cover);
            fs.unlink(oldCoverPath, (err) => {
                if (err) {
                    console.error(`Failed to delete old cover: ${err.message}`);
                } else {
                    console.log('Old cover deleted successfully');
                }
            });
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                owner: owner,
                emoji: emoji,
                color: color,
                cover: cover ? cover.path : course.cover,
                name: name,
                description: description,
                tags: tagsIds,
                startDate: new Date(newStartDate),
                endDate: new Date(newEndDate),
                term: term,
            },
            { new: true },
        );

        return { result: updatedCourse };
    } catch (error) {
        console.log(error);
        return null;
    }
};

const updateCourseNoteService = async (courseId, newNote) => {
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return {
                EC: 0,
                EM: 'Course not found',
            };
        }
        course.note = newNote;
        await course.save();

        return course.note;
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = {
    createCourseService,
    getCoursesInfoService,
    getCourseInfoService,
    getCoursesInfoByIdsService,
    deleteCourseService,
    updateCourseService,
    updateCourseNoteService,
};
