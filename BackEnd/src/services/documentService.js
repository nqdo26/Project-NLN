require('dotenv').config();

const Document = require('../models/document');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

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
            author: new mongoose.Types.ObjectId('67bef530ce5e3a6afd98625e'),
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
        let result = await Document.findById(_id);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getDocumentsService = async () => {
    const documents = await Document.find()
        .populate('level') 
        .populate('categories'); 

    return documents;
};

const getDocumentsByTitleService = async (title) => {
    try {
        const documents = await Document.find({ title: { $regex: title, $options: 'i' } });

        if (documents.length === 0) { // Kiểm tra mảng rỗng
            return {
                EC: 1,
                EM: 'Không tìm thấy tài liệu',
                data: []
            };
        }

        return {
            EC: 0,
            EM: 'Tìm kiếm thành công',
            data: documents
        };
    } catch (error) {
        console.log('Lỗi truy vấn:', error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi trong quá trình tìm kiếm'
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

module.exports = {
    createDocumentService,
    getDocumentService,
    getDocumentsService,
    deleteDocumentService,
    getDocumentsByTitleService,
};
