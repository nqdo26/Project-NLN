require('dotenv').config();

const Document = require('../models/document');
const mongoose = require('mongoose');
const Category = require('../models/category');
const Level = require('../models/level');
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
        let result = await Document.findByIdAndUpdate(
            _id,
            { $inc: { 'statistics.views': 0.25 } }, 
            { new: true } 
        )
        .populate('author')
        .populate('level')
        .populate('categories');

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

const getDocumentsByCategoryService = async (id) => {
    try {
        const category = await Category.findById(id);
        const categorryTitle = category.title;
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
                    data: categorryTitle, result
                };
            }
        } catch (error) {
            console.log('Lỗi truy vấn:', error);
                return {
                    EC: 2,
                    EM: 'Đã xảy ra lỗi trong quá trình tìm kiếm',
                }
        }
}

const getDocumentsByLevelService = async (id) => {
    try {
        const level = await Level.findById(id);
        const levelTitle = level.title;
        if (!level) {
            return {
                EC: 1,
                EM: 'Cấp bậc không tồn tại',
            };
        }
        const result = await Document.find({ level: id });
            if (!result) {
                return {
                    EC: 1,
                    EM: 'Không có tài liệu nào trong danh mục này',
                };
            } else {
                return {
                    EC: 0,
                    EM: 'Tìm kiếm thành công',
                    data: levelTitle, result,
                };
            }
        } catch (error) {
            console.log('Lỗi truy vấn:', error);
                return {
                    EC: 2,
                    EM: 'Đã xảy ra lỗi trong quá trình tìm kiếm',
                }
        }
}

const getTopDocumentsByViewsService = async (limit = 10) => {
    try {
        const documents = await Document.find()
            .sort({ 'statistics.views': -1 })  
            .limit(limit)  
            .populate('author')
            .populate('level')
            .populate('categories');

        return {
            EC: 0,
            EM: 'Lấy danh sách tài liệu có nhiều lượt xem thành công',
            data: documents,
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi trong quá trình lấy danh sách tài liệu',
        };
    }
};

module.exports = {
    createDocumentService,
    getDocumentService,
    getDocumentsService,
    deleteDocumentService,
    searchByTitleService,
    getDocumentsByCategoryService,
    getDocumentsByLevelService,
    getTopDocumentsByViewsService,
};
