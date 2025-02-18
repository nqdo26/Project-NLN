const express = require('express');
const path = require('path');
const { createUser, handleLogin } = require('../controllers/userController');

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

module.exports = routerAPI; //export default
