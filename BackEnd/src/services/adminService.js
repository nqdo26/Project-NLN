require('dotenv').config();

const User = require('../models/user');
const Level = require('../models/level');
const Category = require('../models/category');

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
            EM: 'Register success',
            data: result,
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: 'An error occurred',
        };
    }
};

//Level
const createLevelService = async (title) => {
    try {
        const level = await Level.findOne({ title: title });
        if (level) {
            return {
                EC: 0,
                EM: `Level ${title} is already exist`,
            };
        }

        let result = await Level.create({
            title: title,
        });

        return {
            EC: 1,
            EM: 'Create level success',
            data: result,
        };

    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: 'An error occurred',
        };

    }
}

const updateLevelService = async (id, title) => {
    try {
        const level = await Level.findById(id);
        if (!level) {
            return {
                EC: 0,
                EM: `Level ${id} is not exist`,
            };
        }

        const newLevel = await Level.findOne({ title: title });
        if (newLevel) {
            return {
                EC: 0,
                EM: `Level ${title} is already exist`,
            };
        }

        const result = await Level.findByIdAndUpdate(id, { title: title }, { new: true });

        return {
            EC: 1,
            EM: 'Update level success',
            data: result,
        };

    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: 'An error occurred',
        };

    }
}

const deleteLevelSerivice = async (id) => {
    try {
        const level = await Level.findByIdAndDelete(id);
        if (!level) {
            return {
                EC: 0,
                EM: `Level ${id} is not exist`,
            };
        }

        return {
            EC: 1,
            EM: 'Delete level success',
            data: level,
        };

    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: 'An error occurred',
        };

    }
}

//Category
const createCategoryService = async (title) => {
    try {
        const category = await Category.findOne({ title: title });
        if (category) {
            return {
                EC: 0,
                EM: `Category ${title} is already exist`,
            };
        }
        const result = await Category.create({
            title: title,
        });
        return {
            EC: 1,
            EM: 'Create category success',
            data: result,
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: 'An error occurred',
        };
    }
}

const updateCategoryService = async (id, title) => {
    try {
        const category = await Category.findById(id);
        if (!category) {
            return {
                EC: 0,
                EM: `Category ${id} is not exist`,
            };
        }

        const newCategory = await Category.findOne({ title: title });
        if (newCategory) {
            return {
                EC: 0,
                EM: `Category ${title} is already exist`,
            };
        }

        const result = await Category.findByIdAndUpdate(id, { title: title }, { new: true });

        return {
            EC: 1,
            EM: 'Update Category success',
            data: result,
        };

    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: 'An error occurred',
        };

    }
}

const deleteCategorySerivice = async (id) => {
    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return {
                EC: 0,
                EM: `Category ${id} is not exist`,
            };
        }

        return {
            EC: 1,
            EM: 'Delete Category success',
            data: category,
        };

    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: 'An error occurred',
        };

    }
}

module.exports = {
    createAdminService,

    createLevelService,
    deleteLevelSerivice,
    updateLevelService,

    createCategoryService,
    updateCategoryService,
    deleteCategorySerivice,

    
};
