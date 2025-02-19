const { createAdminService } = require('../services/adminService');
const upload = require('../../middleware/multer');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const path = require('path');

const createAdmin = async (req, res) => {
    const { fullName, email, password, avatar } = req.body;

    const data = await createAdminService(email, password, fullName, avatar);

    return res.status(200).json(data);
};


module.exports = {
    createAdmin,
};
