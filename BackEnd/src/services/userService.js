require('dotenv').config();

const User = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const saltRounds = 10;

const createUserService = async (fullName, email, password, avatar) => {
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return {
                EC: 1,
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
            isAdmin: false,
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

const deleteUserService = async (id) => {
    try {
        let result = await User.findByIdAndDelete(id);
        if (!result) {
            return {
                EC: 1,
                EM: 'Người dùng không tồn tại',
            };
        }
        return {
            EC: 0,
            EM: 'Xóa người dùng thành công',
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi trong quá trình xóa người dùng',
        };
    }
};

const loginService = async (email, password) => {
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const isMathPassword = await bcrypt.compare(password, user.password);
            if (!isMathPassword) {
                return {
                    EC: 2,
                    EM: 'Email/Password không hợp lệ',
                };
            } else {
                const payload = {
                    id: user._id,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    fullName: user.fullName,
                    avatar: user.avatar,
                };

                const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE,
                });
                return {
                    EC: 0,
                    access_token,
                    user: {
                        id: user._id,
                        email: user.email,
                        fullName: user.fullName,
                        isAdmin: user.isAdmin,
                        avatar: user.avatar,
                        statistics: user.statistics,
                    },
                };
            }
        } else {
            return {
                EC: 1,
                EM: 'Email/Password không hợp lệ',
            };
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getUsersService = async () => {
    try {
        let result = await User.find({}).select('-password');
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const updateNameService = async (id, fullName) => {
    try {
        const name = await User.findById(id);
        console.log(id, fullName);
        if (!name) {
            return {
                EC: 0,
                EM: `Người dùng ${id} không tồn tại`,
            };
        }

        const newName = await User.findOne({ fullName: fullName });
        if (newName) {
            return {
                EC: 0,
                EM: `Tên ${fullName} đã tồn tại 111`,
            };
        }

        const result = await User.findByIdAndUpdate(id, { fullName: fullName }, { new: true });

        return {
            EC: 1,
            EM: 'Cập nhật danh mục thành công',
            data: result,
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi khi cập nhật tên người dùng',
        };
    }
};

const likeService = async (id, email) => {
    try {
        const user = await User.findOne({ email: email });
        console.log(id, email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.statistics.liked.includes(id)) {
            return {
                EC: 0,
                EM: 'Tài liệu đã được thêm vào yêu thích trước đó',
            };
        }
        user.statistics.liked.push(id);
        await user.save();
        return {
            EC: 1,
            EM: 'Thêm tài liệu vào yêu thích thành công',
            data: user,
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi khi thêm tài liệu vào yêu thích',
        };
    }
};

const getAccountService = async (email) => {
    try {
        const user = await User.findOne({ email: email }).select('-password');
        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const addRecentlyReadService = async (userId, documentId) => {
    try {
        await User.findByIdAndUpdate(userId, {
            $pull: { recentlyRead: { document: documentId } }, 
        });

        await User.findByIdAndUpdate(userId, {
            $push: { recentlyRead: { document: documentId, readAt: new Date() } },
        });

        const user = await User.findById(userId).populate('recentlyRead.document');

        return { 
            EC: 0, 
            EM: 'Cập nhật danh sách đọc tiếp thành công',
            data: user ? user.recentlyRead.reverse() : []  
        };
    } catch (error) {
        console.log(error);
        return { EC: 2, EM: 'Lỗi khi cập nhật danh sách đọc tiếp' };
    }
};


const getRecentlyReadService = async (userId) => {
    try {
        const user = await User.findById(userId).populate({
            path: 'recentlyRead.document',
            select: '-__v', 
        });
        console.log(userId);

        if (!user) {
            return { EC: 1, EM: 'Người dùng không tồn tại', data: [] };
        }

        return {
            EC: 0,
            EM: 'Lấy danh sách đã đọc thành công',
            data: user.recentlyRead.slice().reverse(),
        };
    } catch (error) {
        console.error('Lỗi khi lấy danh sách đã đọc:', error);
        return { EC: 2, EM: 'Lỗi khi lấy danh sách đã đọc', data: [] };
    }
};


module.exports = {
    createUserService,
    loginService,
    getUsersService,
    deleteUserService,
    updateNameService,
    likeService,
    getAccountService,
    addRecentlyReadService,
    getRecentlyReadService,
};
