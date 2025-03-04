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
            categories: [
                new mongoose.Types.ObjectId('67c6bff74535cde485ee7a3e'),
                new mongoose.Types.ObjectId('67bdca299444ec641f4159b9'),
            ],
            level: new mongoose.Types.ObjectId('67bdc15e6527c0c7ce5f3039'),
            statistics: { views: 0, save: 0, downloads: 0, likes: 0, dislikes: 0 },
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

const getDocumentService = async (id) => {
    try {
        let result = await Document.findById(id);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getDocumentsService = async () => {
    try {
        let result = await Document.find({});
        return result;
    } catch (error) {
        console.log(error);
        return null;
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
};
