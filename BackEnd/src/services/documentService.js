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
            statistics: { views: 0, saved: 0, downloaded: 0, liked: 0, disliked: 0 },
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
        let result = await Document.findByIdAndUpdate(_id, { $inc: { 'statistics.views': 0.25 } }, { new: true })
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

const searchLibraryByTitleService = async (id, title) => {
    try {
        // Tìm user theo ID và populate các tài liệu đã lưu
        const user = await User.findById(id).populate({
            path: 'statistics.saved',
            populate: ['level', 'categories'], // Populate các trường liên quan
        });
        console.log('title:', title);

        if (!user || !user.statistics || !user.statistics.saved) {
            return {
                EC: 1,
                EM: 'User not found or no saved documents',
            };
        }

        // Lọc danh sách tài liệu theo tiêu đề (chỉ lấy những tài liệu có title hợp lệ)
        const documents = user.statistics.saved.filter((doc) =>
            doc.title && title ? doc.title.toLowerCase().includes(title.toLowerCase()) : false,
        );

        console.log('documents:', documents);

        if (documents.length === 0) {
            return {
                EC: 1,
                EM: 'Không tìm thấy kết quả',
                data: {
                    documents: [],
                },
            };
        }

        return {
            EC: 0,
            EM: 'Tìm kiếm thành công',
            data: {
                documents,
            },
        };
    } catch (error) {
        console.error('Lỗi truy vấn:', error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi trong quá trình tìm kiếm',
        };
    }
};

const searchUploadedByTitleService = async (id, title) => {
    try {
        // Tìm user theo ID và populate các tài liệu đã lưu
        const user = await User.findById(id);

        const documents = await Document.find({ author: user.id }).populate('level').populate('categories');

        // Lọc danh sách tài liệu theo tiêu đề (chỉ lấy những tài liệu có title hợp lệ)
        const document = documents.filter((doc) =>
            doc.title && title ? doc.title.toLowerCase().includes(title.toLowerCase()) : false,
        );

        console.log('documents:', documents);

        if (document.length === 0) {
            return {
                EC: 1,
                EM: 'Không tìm thấy kết quả',
                data: {
                    document: [],
                },
            };
        }

        return {
            EC: 0,
            EM: 'Tìm kiếm thành công',
            data: {
                document,
            },
        };
    } catch (error) {
        console.error('Lỗi truy vấn:', error);
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
        // Xóa báo cáo liên quan đến tài liệu này
        await Report.deleteMany({ documentId: id });
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
                data: categorryTitle,
                result,
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
                data: levelTitle,
                result,
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

const getUserDocumentService = async (_id) => {
    try {
        const user = await User.findById({ _id });

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
    getDocumentsByCategoryService,
    getDocumentsByLevelService,
    getTopDocumentsByViewsService,
    getUserDocumentService,
    searchLibraryByTitleService,
    searchUploadedByTitleService,
};
