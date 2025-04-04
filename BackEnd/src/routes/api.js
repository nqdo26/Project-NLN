const express = require('express');
const path = require('path');
const {
    createUser,
    handleLogin,
    getUserInf,
    getAccount,
    updateName,
    like,
    getUserDocument,
    dislike,
    save,
    getSavedDocument,
} = require('../controllers/userController');

const auth = require('../../middleware/auth');
const delay = require('../../middleware/delay');
const { createAdmin, getUsers, deleteUser, getSystemStatistics } = require('../controllers/adminController');
const { createLevel, deleteLevel, updateLevel, getLevels } = require('../controllers/levelController');
const { createCategory, updateCategory, deleteCategory, getCategories } = require('../controllers/categoryController');
const { create } = require('../models/user');
const {
    createDocument,
    getDocuments,
    deleteDocument,
    getDocument,
    searchByTitle,
    getDocumentsByCategory,
    getDocumentsByLevel,
    addRecentlyRead,
    getRecentlyRead,
    getTopDocumentsByViews,
    searchLibraryByTitle,
    searchUploadedByTitle,
} = require('../controllers/documentController');
const { createReport, getReports, updateReportStatus, deleteReport } = require('../controllers/reportController');

const routerAPI = express.Router();

routerAPI.use(express.static(path.join(__dirname, 'public')));

routerAPI.get('/', (req, res) => {
    return res.status(200).json('Hello world api');
});

//User
routerAPI.post('/register', createUser);
routerAPI.post('/createAdmin', createAdmin);
routerAPI.post('/login', handleLogin);
routerAPI.get('/users', auth, getUsers);
routerAPI.delete('/users/:id', auth, deleteUser);
routerAPI.put('/users/:id', updateName);
routerAPI.get('/account', auth, getAccount);

//Level
routerAPI.post('/level', auth, createLevel);
routerAPI.put('/level/:id', updateLevel);
routerAPI.delete('/level/:id', auth, deleteLevel);
routerAPI.get('/level', getLevels);

routerAPI.get('/level/:id', getDocumentsByLevel);

//Category
routerAPI.post('/category', auth, createCategory);
routerAPI.put('/category/:id', auth, updateCategory);
routerAPI.delete('/category/:id', auth, deleteCategory);
routerAPI.get('/category', getCategories);

routerAPI.get('/category/:id', getDocumentsByCategory);

//Document
routerAPI.post('/createDocument', auth, createDocument);
routerAPI.get('/getDocument/:id', getDocument);
routerAPI.get('/getDocuments', getDocuments);

routerAPI.delete('/deleteDocument/:id', auth, deleteDocument);
routerAPI.get('/search/all', searchByTitle);
routerAPI.post('/getUserDocument', getUserDocument);
routerAPI.get('/getSavedDocument/:id', getSavedDocument);
routerAPI.post('/search/library', searchLibraryByTitle);
routerAPI.post('/search/uploaded', searchUploadedByTitle);

routerAPI.post('/addRecentlyRead/:documentId', addRecentlyRead);
routerAPI.get('/getRecentlyRead', getRecentlyRead);
routerAPI.get('/documents/top-views', getTopDocumentsByViews);

//Actions
routerAPI.post('/like/:id', auth, like);
routerAPI.post('/dislike/:id', auth, dislike);
routerAPI.post('/save/:id', auth, save);

//Report
routerAPI.post('/report', auth, createReport);
routerAPI.get('/reports', auth, getReports);
routerAPI.put('/report/:id', auth, updateReportStatus);
routerAPI.delete('/report/:id', auth, deleteReport);

routerAPI.get('/admin/statistics', auth, getSystemStatistics);

module.exports = routerAPI;
