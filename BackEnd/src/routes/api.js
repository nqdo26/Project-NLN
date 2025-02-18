const express = require('express');
const path = require('path');
const {
    createUser,
    handleLogin,
    getAccountInfo,
    updateUser,
    updateUserNote,
    getUserAvatar,
} = require('../controllers/userController');
const {
    createTag,
    getTagsInfo,
    getTagsInfoByIds,
    deleteTagById,
    getCourseStatisticsByTag,
} = require('../controllers/tagController');
const {
    createTerm,
    getTermsInfo,
    getTermInfo,
    deleteTerm,
    updateTerm,
    updateTermNote,
} = require('../controllers/termController');
const {
    createCourse,
    getCourseInfo,
    getCoursesInfo,
    getCoursesInfoByIds,
    deleteCourse,
    updateCourse,
    updateCourseNote,
} = require('../controllers/courseController');
const {
    createLesson,
    getLessonInfo,
    getLessonsInfoByIds,
    addContent,
    getContent,
    deleteLesson,
    updateLessonInfo,
} = require('../controllers/lessonController');
const {
    addCourseToTerm,
    removeCourseFromTerm,
    getAllTestsInfo,
    getAllTermGrades,
    getUserStatistics,
    getAllCurrent,
    getIncompleteProject,
} = require('../controllers/sharedController');
const { createStatistics, deleteStatistics, getStatisticsInfo } = require('../controllers/statisticsController');
const {
    createProject,
    deleteProject,
    getProjectInfo,
    getProjectsInfoByIds,
} = require('../controllers/projectController');
const {
    createProjectStep,
    deleteProjectStep,
    getProjectStepInfo,
    getProjectStepsInfoByIds,
    updateProjectStep,
} = require('../controllers/projectStepController');
const {
    createTest,
    deleteTest,
    getTestInfo,
    getTestsInfoByIds,
    updateTestScore,
    updateTestInfo,
} = require('../controllers/testController');

const auth = require('../../middleware/auth');
const delay = require('../../middleware/delay');
const { uploadAvatar, uploadCover, uploadContent } = require('../../middleware/multer');

const routerAPI = express.Router();

routerAPI.use(express.static(path.join(__dirname, 'public')));

routerAPI.all('*', auth);

routerAPI.get('/', (req, res) => {
    return res.status(200).json('Hello world api');
});

//Auth
routerAPI.post('/register', createUser);
routerAPI.post('/login', handleLogin);

//Account
routerAPI.get('/account', getAccountInfo);
routerAPI.put('/update', uploadAvatar.single('avatar'), updateUser);
routerAPI.post('/update-user-note', updateUserNote);
routerAPI.get('/get-user-statistics', getUserStatistics);
routerAPI.get('/get-all-current', getAllCurrent);
routerAPI.get('/get-incomplete-project', getIncompleteProject);
routerAPI.get('/get-user-avatar', getUserAvatar);

//Tag
routerAPI.post('/create-new-tag', createTag);
routerAPI.get('/get-tags-info', getTagsInfo);
routerAPI.post('/get-tags-info-by-ids', getTagsInfoByIds);
routerAPI.post('/delete-tag-by-id', deleteTagById);
routerAPI.get('/get-tags-statistics', getCourseStatisticsByTag);

//Term
routerAPI.post('/create-new-term', uploadCover.single('cover'), createTerm);
routerAPI.get('/get-terms-info', getTermsInfo);
routerAPI.post('/get-term-info', getTermInfo);
routerAPI.post('/delete-term', deleteTerm);
routerAPI.post('/add-course-to-term-by-id', addCourseToTerm);
routerAPI.post('/remove-course-from-term-by-id', removeCourseFromTerm);
routerAPI.post('/update-term-info', uploadCover.single('cover'), updateTerm);
routerAPI.post('/update-term-note', updateTermNote);
routerAPI.get('/get-all-term-grades', getAllTermGrades);

//Course
routerAPI.post('/create-new-course', uploadCover.single('cover'), createCourse);
routerAPI.post('/get-course-info', getCourseInfo);
routerAPI.get('/get-courses-info', getCoursesInfo);
routerAPI.post('/get-courses-info-by-ids', getCoursesInfoByIds);
routerAPI.post('/delete-course', deleteCourse);
routerAPI.post('/update-course-info', uploadCover.single('cover'), updateCourse);
routerAPI.post('/update-course-note', updateCourseNote);

//Lesson
routerAPI.post('/create-new-lesson', uploadContent.single('content'), createLesson);
routerAPI.post('/add-content-to-lesson', uploadContent.single('content'), addContent);
routerAPI.post('/get-lesson-content', getContent);
// routerAPI.post('/create-new-course', uploadCover.single('cover'), createCourse);
routerAPI.post('/get-lesson-info', getLessonInfo);
// routerAPI.get('/get-courses-info', getCoursesInfo);
routerAPI.post('/get-lessons-info-by-ids', getLessonsInfoByIds);
routerAPI.post('/delete-lesson', deleteLesson);
routerAPI.post('/update-lesson-info', updateLessonInfo);

// Statistics
routerAPI.post('/create-new-statistics', createStatistics);
routerAPI.post('/delete-statistics', deleteStatistics);
routerAPI.post('/get-statistics-info', getStatisticsInfo);

// Project
routerAPI.post('/create-new-project', createProject);
routerAPI.post('/delete-project', deleteProject);
routerAPI.post('/get-project-info', getProjectInfo);
routerAPI.post('/get-projects-info-by-ids', getProjectsInfoByIds);

// ProjectStep
routerAPI.post('/create-new-project-step', createProjectStep);
routerAPI.post('/delete-project-step', deleteProjectStep);
routerAPI.post('/get-project-step-info', getProjectStepInfo);
routerAPI.post('/get-project-steps-info-by-ids', getProjectStepsInfoByIds);
routerAPI.post('/update-project-step', updateProjectStep);

// Test
routerAPI.post('/create-new-test', createTest);
routerAPI.post('/delete-test', deleteTest);
routerAPI.post('/get-test-info', getTestInfo);
routerAPI.post('/get-tests-info-by-ids', getTestsInfoByIds);
routerAPI.post('/update-test-score', updateTestScore);
routerAPI.post('/update-test-info', updateTestInfo);
routerAPI.get('/get-all-tests-info', getAllTestsInfo);

module.exports = routerAPI; //export default
