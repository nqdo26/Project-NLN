const express = require('express');
const path = require('path');
const { createUser, handleLogin, getUserInf, getAccount, updateName } = require('../controllers/userController');

const auth = require('../../middleware/auth');
const delay = require('../../middleware/delay');
const { createAdmin, getUsers, deleteUser } = require('../controllers/adminController');
const { createLevel, deleteLevel, updateLevel, getLevels } = require('../controllers/levelController');
const { createCategory, updateCategory, deleteCategory, getCategories } = require('../controllers/categoryController');
const { create } = require('../models/user');
const { createDocument, getDocuments, deleteDocument, getDocument, getDocumentsByTitle, searchByTitle } = require('../controllers/documentController');

const routerAPI = express.Router();

routerAPI.use(express.static(path.join(__dirname, 'public')));

routerAPI.get('/', (req, res) => {
    return res.status(200).json('Hello world api');
});

//User
routerAPI.post('/register', createUser);
routerAPI.post('/createAdmin', createAdmin);
routerAPI.post('/login', handleLogin);
routerAPI.get('/users', getUsers , auth);
routerAPI.delete('/users/:id', deleteUser , auth);
routerAPI.put('/users/:id', updateName , auth);
routerAPI.get('/account', auth, getAccount , auth);

//Level
routerAPI.post('/level', createLevel , auth);
routerAPI.put('/level/:id', updateLevel , auth);
routerAPI.delete('/level/:id', deleteLevel , auth);
routerAPI.get('/level', getLevels , auth);

//Category
routerAPI.post('/category', createCategory , auth);
routerAPI.put('/category/:id', updateCategory , auth);
routerAPI.delete('/category/:id', deleteCategory , auth);
routerAPI.get('/category', getCategories , auth);

//Document
routerAPI.post('/createDocument', createDocument , auth);
routerAPI.get('/getDocument/:id', getDocument);
routerAPI.get('/getDocuments', getDocuments);
routerAPI.get('/deleteDocument', deleteDocument , auth);
routerAPI.get('/search/all', searchByTitle);


module.exports = routerAPI;
