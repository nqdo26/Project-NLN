require('dotenv').config();
const Lesson = require('../models/lesson');
const Course = require('../models/course');
const Term = require('../models/term');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { addLessonService } = require('./sharedService');

const createLessonService = async (owner, name, description, content, course) => {
    try {
        // save course

        const result = await Lesson.create({
            owner: owner,
            name: name,
            description: description,
            content: content.path,
            course: course,
        });
        const courseId = course;
        const lessonId = result._id;

        const kq = await addLessonService(lessonId, courseId);
        console.log(kq);
        return { result };
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getLessonsInfoService = async (owner, courseId) => {
    try {
        let result = await Lesson.find({ course: courseId });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getLessonInfoService = async (owner, lessonId) => {
    try {
        let result = await Lesson.findById(lessonId);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getLessonsInfoByIdsService = async (owner, lessonsIds) => {
    try {
        let result = await Lesson.find({ _id: { $in: lessonsIds } });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const addContentService = async (lessonId, content) => {
    try {
        let lesson = await Lesson.findById(lessonId);
        if (lesson) {
            if (lesson.content) {
                const oldContentPath = path.join(lesson.content);

                // Delete the old avatar file
                fs.unlink(oldContentPath, (err) => {
                    if (err) {
                        console.error(`Failed to delete old content: ${err.message}`);
                    } else {
                        console.log('Old content deleted successfully');
                    }
                });
            }
            lesson.content = content.path;

            await lesson.save();

            return 'success';
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getContentService = async (owner, lessonId) => {
    try {
        let result = await Lesson.findById(lessonId);
        if (result && result.content) {
            const contentPath = path.join(result.content);
            const fileContent = fs.readFileSync(contentPath, 'utf8');
            return fileContent;
        } else {
            console.log('Content not found');
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

const deleteLessonService = async (lessonId) => {
    try {
        // Delete the lesson
        let result = await Lesson.findByIdAndDelete(lessonId);
        console.log(result);
        if (result.content) {
            const contentPath = path.join(result.content);

            // Delete the old avatar file
            fs.unlink(contentPath, (err) => {
                if (err) {
                    console.error(`Failed to delete content: ${err.message}`);
                } else {
                    console.log('Cotent deleted successfully');
                }
            });
        }

        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const deleteLessonsByIdsService = async (lessonsIds) => {
    try {
        const result = await Lesson.deleteMany({ _id: { $in: lessonsIds } });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const updateLessonInfoService = async (lessonId, name, description) => {
    try {
        let lesson = await Lesson.findById(lessonId);
        if (lesson) {
            lesson.name = name;
            lesson.description = description;
            await lesson.save();
            return lesson;
        } else {
            return 'Lesson not found';
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = {
    createLessonService,
    getLessonsInfoService,
    getLessonInfoService,
    getLessonsInfoByIdsService,
    deleteLessonService,
    addContentService,
    getContentService,
    deleteLessonsByIdsService,
    updateLessonInfoService,
};
