const { createUserService, loginService } = require('../services/userService');
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

module.exports = {
    createUser,
    handleLogin,
};
