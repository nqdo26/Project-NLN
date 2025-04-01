const User = require('../models/user');

const upload = require('../../middleware/multer');
const jwt = require('jsonwebtoken');
const path = require('path');

const { createAdminService, getSystemStatisticsService } = require('../services/adminService');
const { getUsersService, deleteUserService } = require('../services/userService');

const createAdmin = async (req, res) => {
    const { fullName, email, password, avatar } = req.body;

    const data = await createAdminService(email, password, fullName, avatar);

    return res.status(200).json(data);
};

const getUsers = async (req, res) => {
    const data = await getUsersService();
    return res.status(200).json(data);
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    const data = await deleteUserService(id);

    return res.status(200).json(data);
};

const getSystemStatistics = async (req, res) => {
    try {
        const data = await getSystemStatisticsService();
        return res.status(200).json({
            EC: 0,
            EM: 'Thống kê hệ thống thành công',
            data,
        });
    } catch (error) {
        console.error('Error in getSystemStatistics:', error);
        return res.status(500).json({
            EC: 1,
            EM: 'Đã xảy ra lỗi khi thống kê hệ thống',
        });
    }
};

module.exports = {
    createAdmin,
    getUsers,
    deleteUser,
    getSystemStatistics,
};
