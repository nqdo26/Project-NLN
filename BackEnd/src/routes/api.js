const express = require('express');
const path = require('path');
const { createUser, handleLogin, getUserInf, getAccount, updateName } = require('../controllers/userController');

const auth = require('../../middleware/auth');
const delay = require('../../middleware/delay');
const { createAdmin, getUsers, deleteUser } = require('../controllers/adminController');
const { createLevel, deleteLevel, updateLevel, getLevels } = require('../controllers/levelController');
const { createCategory, updateCategory, deleteCategory, getCategories } = require('../controllers/categoryController');
const { create } = require('../models/user');
const {
    createDocument,
    getDocuments,
    deleteDocument,
    getDocument,
    getDocumentsByTitle,
    searchByTitle,
} = require('../controllers/documentController');

const routerAPI = express.Router();

routerAPI.use(express.static(path.join(__dirname, 'public')));

routerAPI.get('/', (req, res) => {
    return res.status(200).json('Hello world api');
});

//User
routerAPI.post('/register', createUser);
routerAPI.post('/createAdmin', createAdmin);
routerAPI.post('/login', handleLogin);
<<<<<<< HEAD
routerAPI.get('/users', getUsers , auth);
routerAPI.delete('/users/:id', deleteUser , auth);
routerAPI.put('/users/:id', updateName , auth);
=======
routerAPI.get('/users', auth, getUsers);
routerAPI.delete('/users/:id', auth, deleteUser);
routerAPI.put('/users/:id', auth, updateName);
>>>>>>> abada5e2ecf3d603f6a05299fa75a889d8c2d566
routerAPI.get('/account', auth, getAccount);

//Level
routerAPI.post('/level', auth, createLevel);
routerAPI.put('/level/:id', auth, updateLevel);
routerAPI.delete('/level/:id', auth, deleteLevel);
routerAPI.get('/level', getLevels);

//Category
routerAPI.post('/category', auth, createCategory);
routerAPI.put('/category/:id', auth, updateCategory);
routerAPI.delete('/category/:id', auth, deleteCategory);
routerAPI.get('/category', getCategories);

//Document
routerAPI.post('/createDocument', auth, createDocument);
routerAPI.get('/getDocument/:id', getDocument);
routerAPI.get('/getDocuments', getDocuments);
routerAPI.get('/deleteDocument', auth, deleteDocument);
routerAPI.get('/search/all', searchByTitle);

module.exports = routerAPI;
