require('dotenv').config();

const User = require('../models/user');
const Level = require('../models/level');
const Category = require('../models/category');
const Document = require('../models/document');
const Report = require('../models/report');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const saltRounds = 10;

const createAdminService = async (email, password, fullName, avatar) => {
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return {
                EC: 0,
                EM: `Email ${email} đã được sử dụng`,
            };
        }
        const defaultAvatar = 'http://localhost:8080/public/images/default-avatar.png';
        const userAvatar = avatar || defaultAvatar;

        const hashPassword = await bcrypt.hash(password, saltRounds);

        let result = await User.create({
            email: email,
            password: hashPassword,
            fullName: fullName,
            avatar: userAvatar,
            isAdmin: true,
            statistics: { liked: [], disliked: [] },
        });

        return {
            EC: 0,
            EM: 'Đăng ký thành công',
            data: result,
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi trong quá trình đăng ký',
        };
    }
};

// Cấp bậc
const createLevelService = async (title) => {
    try {
        const level = await Level.findOne({ title: title });
        if (level) {
            return {
                EC: 0,
                EM: `Cấp bậc ${title} đã tồn tại`,
            };
        }

        let result = await Level.create({
            title: title,
        });

        return {
            EC: 1,
            EM: 'Tạo cấp bậc thành công',
            data: result,
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi khi tạo cấp bậc',
        };
    }
};

const updateLevelService = async (id, title) => {
    try {
        const level = await Level.findById(id);
        if (!level) {
            return {
                EC: 0,
                EM: `Cấp bậc ${id} không tồn tại`,
            };
        }

        const newLevel = await Level.findOne({ title: title });
        if (newLevel) {
            return {
                EC: 0,
                EM: `Cấp bậc ${title} đã tồn tại`,
            };
        }

        const result = await Level.findByIdAndUpdate(id, { title: title }, { new: true });

        return {
            EC: 1,
            EM: 'Cập nhật cấp bậc thành công',
            data: result,
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi khi cập nhật cấp bậc',
        };
    }
};

const deleteLevelService = async (id) => {
    try {
        const level = await Level.findByIdAndDelete(id);
        if (!level) {
            return {
                EC: 1,
                EM: `Cấp bậc không tồn tại`,
            };
        }

        return {
            EC: 0,
            EM: 'Xóa cấp bậc thành công',
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi khi xóa cấp bậc',
        };
    }
};

const getLevelsService = async () => {
    try {
        let result = await Level.aggregate([
            {
                $lookup: {
                    from: 'documents',  
                    localField: '_id',   
                    foreignField: 'level',  
                    as: 'documents'     
                }
            },
            {
                $project: {
                    title: 1, 
                    documentCount: { $size: '$documents' }  
                }
            }
        ]);

        return {
            EC: 0,
            EM: 'Lấy danh sách cấp bậc thành công',
            data: result,
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi khi lấy danh sách cấp bậc',
        };
    }
};


// Danh mục
const createCategoryService = async (title) => {
    try {
        const category = await Category.findOne({ title: title });
        if (category) {
            return {
                EC: 0,
                EM: `Danh mục ${title} đã tồn tại`,
            };
        }
        const result = await Category.create({
            title: title,
        });
        return {
            EC: 1,
            EM: 'Tạo danh mục thành công',
            data: result,
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi khi tạo danh mục',
        };
    }
};

const updateCategoryService = async (id, title) => {
    try {
        const category = await Category.findById(id);
        if (!category) {
            return {
                EC: 0,
                EM: `Danh mục ${id} không tồn tại`,
            };
        }

        const newCategory = await Category.findOne({ title: title });
        if (newCategory) {
            return {
                EC: 0,
                EM: `Danh mục ${title} đã tồn tại`,
            };
        }

        const result = await Category.findByIdAndUpdate(id, { title: title }, { new: true });

        return {
            EC: 1,
            EM: 'Cập nhật danh mục thành công',
            data: result,
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi khi cập nhật danh mục',
        };
    }
};

const deleteCategoryService = async (id) => {
    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return {
                EC: 0,
                EM: `Danh mục ${id} không tồn tại`,
            };
        }

        return {
            EC: 1,
            EM: 'Xóa danh mục thành công',
            data: category,
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi khi xóa danh mục',
        };
    }
};

const getCategoriesService = async () => {
    try {
        let result = await Category.aggregate([
            {
                $lookup: {
                    from: 'documents', 
                    localField: '_id',   
                    foreignField: 'categories',  
                    as: 'documents'    
                }
            },
            {
                $project: {
                    title: 1,  
                    documentCount: { $size: '$documents' }  
                }
            }
        ]);

        return {
            EC: 0,
            EM: 'Lấy danh sách danh mục thành công',
            data: result,
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi khi lấy danh sách danh mục',
        };
    }
};


const getSystemStatisticsService = async () => {
    try {
        const totalUsers = await User.countDocuments();
        const totalDocuments = await Document.countDocuments();
        const totalReports = await Report.countDocuments();
        const totalAdmins = await User.countDocuments({ isAdmin: true });

        return {
            totalUsers,
            totalDocuments,
            totalReports,
            totalAdmins,
        };
    } catch (error) {
        console.error('Error in getSystemStatisticsService:', error);
        throw error;
    }
};


module.exports = {
    createAdminService,
    createLevelService,
    deleteLevelService,
    updateLevelService,
    createCategoryService,
    updateCategoryService,
    deleteCategoryService,
    getLevelsService,
    getCategoriesService,
    getSystemStatisticsService,
};
