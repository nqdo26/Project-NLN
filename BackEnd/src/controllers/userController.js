const {
    createUserService,
    loginService,
    updateNameService,
    likeService,
    getAccountService,
} = require('../services/userService');
const upload = require('../../middleware/multer');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const path = require('path');
const { getDocumentByUserService, getUserDocumentService } = require('../services/documentService');

const createUser = async (req, res) => {
    const { fullName, email, password, avatar } = req.body;

    const data = await createUserService(fullName, email, password, avatar);

    return res.status(200).json(data);
};

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    const data = await loginService(email, password);

    return res.status(200).json(data);
};

const getAccount = async (req, res) => {
    const data = await getAccountService(req.user.email);
    const user = {
        id: data._id,
        email: data.email,
        fullName: data.fullName,
        avatar: data.avatar,
        isAdmin: data.isAdmin,
    };
    return res.status(200).json(user);
};

const updateName = async (req, res) => {
    const { id } = req.params;
    const { fullName } = req.body;

    const data = await updateNameService(id, fullName);
    return res.status(200).json(data);
};

const like = async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;

    const data = await likeService(id, email);
    return res.status(200).json(data);
};

const getUserDocument = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await getUserDocumentService(id);
        if (result.EC === 0) {
            return res.status(200).json(result.data);
        } else {
            return res.status(400).json({ error: result.EM });
        }
    } catch (error) {
        return res.status(500).json({ error: 'error' });
    }
};

module.exports = {
    createUser,
    handleLogin,
    getAccount,
    updateName,
    like,
    getUserDocument,
};
