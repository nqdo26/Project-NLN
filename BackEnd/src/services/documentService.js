require('dotenv').config();

const Document = require('../models/document');
const mongoose = require('mongoose');
const Category = require('../models/category');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const User = require('../models/user');

const createDocumentService = async (
    author,
    title,
    description,
    createAt,
    link,
    type,
    categories,
    level,
    statistics,
) => {
    try {
        let result = await Document.create({
            author: author,
            title: title,
            description: description,
            createAt: new Date(),
            link: link,
            type: type,
            categories: [categories],
            level: level,
            categories: categories,
            statistics: { views: 0, save: 0, downloads: 0, likes: 100, dislikes: 300 },
        });

        return {
            EC: 0,
            EM: 'Tạo tài liệu thành công',
            data: result,
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi trong quá trình tạo',
        };
    }
};

const getDocumentService = async (_id) => {
    try {
        let result = await Document.findById(_id).populate('author').populate('level').populate('categories');
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getDocumentsService = async () => {
    const documents = await Document.find().populate('author').populate('level').populate('categories');

    return documents;
};

const searchByTitleService = async (title) => {
    try {
        const documents = await Document.find({ title: { $regex: title, $options: 'i' } })
            .populate('level')
            .populate('categories');

        const categories = await Category.find({ title: { $regex: title, $options: 'i' } });

        if (documents.length === 0 && categories.length === 0) {
            return {
                EC: 1,
                EM: 'Không tìm thấy kết quả',
                data: {
                    documents: [],
                    categories: [],
                },
            };
        }

        return {
            EC: 0,
            EM: 'Tìm kiếm thành công',
            data: {
                documents,
                categories,
            },
        };
    } catch (error) {
        console.log('Lỗi truy vấn:', error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi trong quá trình tìm kiếm',
        };
    }
};

const deleteDocumentService = async (id) => {
    try {
        let result = await Document.findByIdAndDelete(id);
        if (!result) {
            return {
                EC: 1,
                EM: 'Tài liệu không tồn tại',
            };
        }
        return {
            EC: 0,
            EM: 'Xóa tài liệu thành công',
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi trong quá trình xóa tài liệu',
        };
    }
};

const getUserDocumentService = async (_id) => {
    try {
        const user = await User.findById({ _id });
        console.log('check id ', _id);
        console.log('check user', user);
        if (!user) {
            return {
                EC: 1,
                EM: 'User not found',
            };
        }
        const documents = await Document.find({ author: user._id });
        return {
            EC: 0,
            data: documents,
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: 'error',
        };
    }
};

module.exports = {
    createDocumentService,
    getDocumentService,
    getDocumentsService,
    deleteDocumentService,
    searchByTitleService,
    getUserDocumentService,
};
