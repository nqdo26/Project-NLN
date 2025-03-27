require('dotenv').config();

const User = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const Document = require('../models/document');

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
            statistics: { liked: [], disliked: [], uploaded: 0 },
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

const updateUserNameService = async (id, title) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return {
                EC: 1,
                EM: 'Người dùng không tồn tại',
            };
        }
        const newFullName = await User.findOne({ fullName: title });
        if (newFullName) {
            return {
                EC: 1,
                EM: 'Tên người dùng đã tồn tại',
            };
        }

        const result = await User.findByIdAndUpdate(id, { fullName: title }, { new: true });

        return {
            EC: 0,
            EM: 'Cập nhật tên người dùng thành công',
            data: result,
        };
    } catch (error) {
        console.error('Error in updateUserNameService:', error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi khi cập nhật tên người dùng',
        };
    }
};

const likeService = async (id, email) => {
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return { EC: 0, EM: 'User not found' };
        }

        const likedIndex = user.statistics.liked.indexOf(id);
        const dislikedIndex = user.statistics.disliked.indexOf(id);

        if (likedIndex !== -1) {
            user.statistics.liked.splice(likedIndex, 1);
            await user.save();
            return {
                EC: -1,
                EM: 'Xóa tài liệu khỏi danh sách yêu thích thành công',
                data: user,
            };
        } else {
            if (dislikedIndex !== -1) {
                user.statistics.disliked.splice(dislikedIndex, 1);
            }

            user.statistics.liked.push(id);
            await user.save();
            return {
                EC: 1,
                EM: 'Thêm tài liệu vào danh sách yêu thích thành công',
                data: user,
            };
        }
    } catch (error) {
        console.error(error);
        return { EC: 2, EM: 'Đã xảy ra lỗi khi xử lý yêu thích' };
    }
};

const dislikeService = async (id, email) => {
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return { EC: 0, EM: 'User not found' };
        }

        const dislikedIndex = user.statistics.disliked.indexOf(id);
        const likedIndex = user.statistics.liked.indexOf(id);

        if (dislikedIndex !== -1) {
            user.statistics.disliked.splice(dislikedIndex, 1);
            await user.save();
            return {
                EC: -1,
                EM: 'Xóa tài liệu khỏi danh sách không yêu thích thành công',
                data: user,
            };
        } else {
            if (likedIndex !== -1) {
                user.statistics.liked.splice(likedIndex, 1);
            }

            user.statistics.disliked.push(id);
            await user.save();
            return {
                EC: 1,
                EM: 'Thêm tài liệu vào danh sách không yêu thích thành công',
                data: user,
            };
        }
    } catch (error) {
        console.error(error);
        return { EC: 2, EM: 'Đã xảy ra lỗi khi xử lý không yêu thích' };
    }
};

const savedService = async (id, email) => {
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return { EC: 0, EM: 'User not found' };
        }

        const savedIndex = user.statistics.saved.indexOf(id);

        if (savedIndex !== -1) {
            // Nếu document đã có trong liked, thì xoá nó
            user.statistics.saved.splice(savedIndex, 1);
            await user.save();
            return {
                EC: -1,
                EM: 'Xóa tài liệu khỏi thư viện thành công',
                data: user,
            };
        } else {
            // Nếu document chưa có trong liked, thì thêm vào
            user.statistics.saved.push(id);
            await user.save();
            return {
                EC: 1,
                EM: 'Thêm tài liệu vào thư viện thành công',
                data: user,
            };
        }
    } catch (error) {
        console.error(error);
        return { EC: 2, EM: 'Đã xảy ra lỗi khi xử lý' };
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

const getSavedDocumentService = async (id) => {
    try {
        // Find the user by ID and populate the saved documents
        const user = await User.findById(id).populate('statistics.saved');
        if (!user) {
            return {
                EC: 1,
                EM: 'User not found',
            };
        }
        console.log(user);

        // Return the saved documents
        return {
            EC: 0,
            EM: 'Lấy danh sách tài liệu đã lưu thành công',
            data: user.statistics.saved,
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi trong quá trình lấy danh sách tài liệu đã lưu',
        };
    }
};
module.exports = {
    createUserService,
    loginService,
    getUsersService,
    deleteUserService,
    updateUserNameService,
    likeService,
    getAccountService,
    dislikeService,
    savedService,
    getSavedDocumentService,
};
