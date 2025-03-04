const express = require('express');
const path = require('path');
const { createUser, handleLogin } = require('../controllers/userController');

const auth = require('../../middleware/auth');
const delay = require('../../middleware/delay');
const { createAdmin, getUsers, deleteUser } = require('../controllers/adminController');
const { createLevel, deleteLevel, updateLevel, getLevels } = require('../controllers/levelController');
const { createCategory, updateCategory, deleteCategory, getCategories } = require('../controllers/categoryController');
const { create } = require('../models/user');
const { createDocument, getDocuments, deleteDocument, getDocument } = require('../controllers/documentController');

const routerAPI = express.Router();

routerAPI.use(express.static(path.join(__dirname, 'public')));

// routerAPI.all('*', auth);

routerAPI.get('/', (req, res) => {
    return res.status(200).json('Hello world api');
});

//User
routerAPI.post('/register', createUser);
routerAPI.post('/createAdmin', createAdmin);
routerAPI.post('/login', handleLogin);
routerAPI.get('/users', getUsers);
routerAPI.delete('/users/:id', deleteUser);

//Level
routerAPI.post('/level', createLevel);
routerAPI.post('/level/:id', updateLevel);
routerAPI.delete('/level/:id', deleteLevel);
routerAPI.get('/level', getLevels);

//Category
routerAPI.post('/category', createCategory);
routerAPI.post('/category/:id', updateCategory);
routerAPI.delete('/category/:id', deleteCategory);
routerAPI.get('/category', getCategories);

//Document
routerAPI.post('/createDocument', createDocument);
routerAPI.get('/getDocument/:id', getDocument);
routerAPI.get('/getDocuments', getDocuments);
routerAPI.get('/deleteDocument', deleteDocument);

module.exports = routerAPI;
