require('dotenv').config();

const Document = require('../models/document');
const mongoose = require('mongoose');
const Category = require('../models/category');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const User = require('../models/user');
const Report = require('../models/report');

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
        // Tìm tài liệu cần xóa
        const document = await Document.findById(id);
        if (!document) {
            return {
                EC: 1,
                EM: 'Tài liệu không tồn tại',
            };
        }

        // Xóa tài liệu khỏi thư viện của người dùng
        await User.updateMany({ 'statistics.liked': id }, { $pull: { 'statistics.liked': id } });
        await User.updateMany({ 'statistics.disliked': id }, { $pull: { 'statistics.disliked': id } });
        await User.updateMany({ 'statistics.saved': id }, { $pull: { 'statistics.saved': id } });
        await Report.deleteMany({ documentId: id });

        // Xóa tài liệu khỏi cơ sở dữ liệu
        await Document.findByIdAndDelete(id);

        return {
            EC: 0,
            EM: 'Xóa tài liệu thành công',
        };
    } catch (error) {
        console.error('Error deleting document:', error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi trong quá trình xóa tài liệu',
        };
    }
};

const getDocumentByCategoryService = async (id) => {
    try {
        const category = await Category.findById(id);
        if (!category) {
            return {
                EC: 1,
                EM: 'Danh mục không tồn tại',
            };
        }
        const result = await Document.find({ categories: id });
        if (!result) {
            return {
                EC: 1,
                EM: 'Không có tài liệu nào trong danh mục này',
            };
        } else {
            return {
                EC: 0,
                EM: 'Tìm kiếm thành công',
                data: result,
            };
        }
    } catch (error) {
        console.log('Lỗi truy vấn:', error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi trong quá trình tìm kiếm',
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
    getDocumentByCategoryService,
    getUserDocumentService,
};
