const {
    createUserService,
    loginService,
    updateUserService,
    getAccountInfoService,
    updateUserNoteService,
} = require('../services/userService');
const upload = require('../../middleware/multer');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const path = require('path');

const createUser = async (req, res) => {
    const { name, email, password, description } = req.body;

    const data = await createUserService(name, email, password, description);
    return res.status(200).json(data);
};

const handleLogin = async (req, res) => {
    const { name, password } = req.body;
    const data = await loginService(name, password);

    return res.status(200).json(data);
};

const getAccountInfo = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const name = decoded.name;
    const data = await getAccountInfoService(name);
    return res.status(200).json(data);
};

const updateUser = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { description } = req.body;
    const name = decoded.name;
    const avatar = req.file;

    const data = await updateUserService(name, description, avatar);
    return res.status(200).json(data);
};

const updateUserNote = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { newNote } = req.body;
    const owner = decoded.name;

    const data = await updateUserNoteService(owner, newNote);
    return res.status(200).json(data);
};

const getUserAvatar = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const name = decoded.name;

    const user = await User.findOne({ name });
    if (!user || !user.avatar) {
        return res.status(404).json({ EC: 1, EM: 'Avatar not found' });
    }

    const avatarPath = path.join(__dirname, '../../', user.avatar);
    console.log(avatarPath);
    return res.sendFile(avatarPath);
};

module.exports = {
    createUser,
    handleLogin,
    getAccountInfo,
    updateUser,
    updateUserNote,
    getUserAvatar,
};
