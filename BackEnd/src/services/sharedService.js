require('dotenv').config();
const Term = require('../models/term');
const Course = require('../models/course');
const User = require('../models/user');
const Statistics = require('../models/statistics');
const Project = require('../models/project');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const Test = require('../models/test');
const Tag = require('../models/tag');

const addCourseService = async (termId, courseId) => {
    try {
        let term = await Term.findById(termId);
        if (term) {
            term.courses.push(courseId);
            await term.save();
            return term;
        } else {
            console.log('ko tim thay term');
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

const removeCourseService = async (termId, courseId) => {
    try {
        let term = await Term.findById(termId);
        if (term) {
            const courseIndex = term.courses.indexOf(courseId);
            if (courseIndex > -1) {
                term.courses.splice(courseIndex, 1);
                await term.save();
                return term;
            } else {
                console.log('Course not found in term');
                return null;
            }
        } else {
            console.log('Term not found');
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

const removeTermService = async (courseId, startDate, endDate) => {
    try {
        let course = await Course.findById(courseId);

        course.term = null;
        course.startDate = new Date(startDate);
        course.endDate = new Date(endDate);
        const result = await course.save();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const addLessonService = async (lessonId, courseId) => {
    try {
        let course = await Course.findById(courseId);
        if (course) {
            course.lessons.push(lessonId);
            await course.save();
            return course;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

const addTermService = async (courseId, termId) => {
    try {
        let course = await Course.findById(courseId);
        if (course) {
            let term = await Term.findById(termId);
            if (term) {
                course.term = termId;
                course.startDate = term.startDate;
                course.endDate = term.endDate;
                await course.save();
            }

            return course;
        } else {
            console.log('ko tim thay course');
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getAllTestsInfoService = async (owner) => {
    try {
        const user = await User.findOne({ name: owner });
        if (!user) {
            throw new Error('User not found');
        }
        if (!user.courses) {
            throw new Error("User doesn't have any courses");
        }

        let allTests = [];
        for (const courseId of user.courses) {
            const courseResult = await Course.findById(courseId);
            if (!courseResult) {
                console.log(`Course not found for courseId: ${courseId}`);
                continue;
            }

            const statisticsResult = await Statistics.findById(courseResult.statistics);
            if (!statisticsResult || !statisticsResult.tests) {
                console.log(`Statistics not found or no tests for courseId: ${courseId}`);
                continue;
            }

            for (const test of statisticsResult.tests) {
                let testResult = await Test.findById(test);
                if (testResult) {
                    allTests.push({
                        ...testResult._doc,
                        courseName: courseResult.name,
                        courseId: courseId,
                        statisticsId: courseResult.statistics,
                    });
                } else {
                    console.log(`Test not found for testId: ${test}`);
                }
            }
        }

        return allTests;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getAllTermGradesService = async (owner) => {
    try {
        const user = await User.findOne({ name: owner });
        if (!user) {
            throw new Error('User not found');
        }
        if (!user.terms) {
            console.log('No term');
            return null;
        }

        let termGrades = [];
        let currentTerm = {};
        let currentCourse = {};
        for (const termId of user.terms) {
            const termResult = await Term.findById(termId);

            if (!termResult) {
                console.log(`term not found for termId: ${termId}`);
                continue;
            }

            currentTerm = {
                termName: termResult.name,
                courses: [],
            };

            for (const courseId of termResult.courses) {
                const courseResult = await Course.findById(courseId);
                if (!courseResult) {
                    console.log(`course not found for courseId: ${courseId}`);
                    continue;
                }

                const statisticsResult = await Statistics.findById(courseResult.statistics);

                currentCourse = {
                    courseName: courseResult.name,
                    score: statisticsResult.completedScore,
                };

                currentTerm.courses.push(currentCourse);
            }

            termGrades.push(currentTerm);
        }

        return termGrades;
    } catch (error) {
        console.error('Error fetching term grades:', error);
        throw error;
    }
};

const getUserStatisticsService = async (owner) => {
    try {
        const user = await User.findOne({ name: owner });
        if (!user) {
            throw new Error('User not found');
        }
        if (!user.terms) {
            console.log('No term');
            return null;
        }
        const tags = await Tag.countDocuments({ owner: user._id });

        let userStatistics = {
            terms: user.terms.length,
            courses: user.courses.length,
            tests: 0,
            projects: 0,
            tags: tags,
        };

        for (const courseId of user.courses) {
            const courseResult = await Course.findById(courseId);
            if (!courseResult) {
                console.log(`course not found for courseId: ${courseId}`);
                continue;
            }

            const statisticsResult = await Statistics.findById(courseResult.statistics);
            if (statisticsResult.tests && statisticsResult.tests.length > 0) {
                userStatistics.tests += statisticsResult.tests.length;
            }
            if (statisticsResult.projects && statisticsResult.projects.length > 0) {
                userStatistics.projects += statisticsResult.projects.length;
            }
        }

        return userStatistics;
    } catch (error) {
        console.error('Error fetching term grades:', error);
        throw error;
    }
};

const getAllCurrentService = async (owner) => {
    try {
        const user = await User.findOne({ name: owner });
        const today = new Date();
        if (!user) {
            throw new Error('User not found');
        }
        if (!user.terms) {
            console.log('No term');
            return null;
        }

        let current = {
            terms: [],
            courses: [],
        };

        for (const courseId of user.courses) {
            const courseResult = await Course.findById(courseId);
            if (!courseResult) {
                console.log(`course not found for courseId: ${courseId}`);
                continue;
            }

            if (courseResult.startDate <= today && courseResult.endDate >= today) {
                current.courses.push(courseResult);
            }
        }

        for (const termId of user.terms) {
            const termResult = await Term.findById(termId);
            if (!termResult) {
                console.log(`term not found for termId: ${termId}`);
                continue;
            }

            if (termResult.startDate <= today && termResult.endDate >= today) {
                current.terms.push(termResult);
            }
        }

        return current;
    } catch (error) {
        console.error('Error fetching term grades:', error);
        throw error;
    }
};

const getIncompleteProjectsService = async (owner) => {
    try {
        const data = [];
        const user = await User.findOne({ name: owner });
        if (!user) {
            throw new Error('User not found');
        }
        if (!user.courses) {
            return data;
        }

        for (const courseId of user.courses) {
            const courseResult = await Course.findById(courseId);
            if (!courseResult) {
                console.log(`course not found for courseId: ${courseId}`);
                continue;
            }

            const statisticsId = courseResult.statistics;
            const statisticsResult = await Statistics.findById(statisticsId);
            if (statisticsResult) {
                for (const projectId of statisticsResult.projects) {
                    const projectResult = await Project.findById(projectId);

                    if (projectResult.completedSteps !== projectResult.totalSteps) {
                        data.push({
                            project: projectResult,
                            course: courseResult,
                        });
                    }
                }
            }
        }

        return data;
    } catch (error) {
        console.error('Error fetching term grades:', error);
        throw error;
    }
};

module.exports = {
    addCourseService,
    removeCourseService,
    removeTermService,
    addLessonService,
    addTermService,
    getAllTestsInfoService,
    getAllTermGradesService,
    getUserStatisticsService,
    getAllCurrentService,
    getIncompleteProjectsService,
};
