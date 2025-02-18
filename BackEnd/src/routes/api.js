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

module.exports = routerAPI; //export default
