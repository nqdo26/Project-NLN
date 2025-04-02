const jwt = require('jsonwebtoken');
const Document = require('../models/document');
const path = require('path');
const {
    createDocumentService,
    deleteDocumentService,
    getDocumentService,
    getDocumentsService,
    searchByTitleService,
    getDocumentsByCategoryService,
    getDocumentsByLevelService,
    getTopDocumentsByViewsService,
    searchLibraryByTitleService,
    searchUploadedByTitleService,
} = require('../services/documentService');
const { getRecentlyReadService, addRecentlyReadService } = require('../services/userService');

const createDocument = async (req, res) => {
    const { author, title, description, createAt, link, type, categories, level, statistics } = req.body;
    const data = await createDocumentService(
        author,
        title,
        description,
        createAt,
        link,
        type,
        categories,
        level,
        statistics,
    );

    return res.status(200).json(data);
};

const getDocument = async (req, res) => {
    const { id } = req.params;

    const data = await getDocumentService(id);

    return res.status(200).json(data);
};

const getDocuments = async (req, res) => {
    const data = await getDocumentsService();

    return res.status(200).json(data);
};

const searchByTitle = async (req, res) => {
    const { title } = req.query;
    const data = await searchByTitleService(title);

    return res.status(200).json(data);
};

const searchLibraryByTitle = async (req, res) => {
    const { title } = req.body;
    const { id } = req.body;
    const data = await searchLibraryByTitleService(id, title);

    return res.status(200).json(data);
};

const searchUploadedByTitle = async (req, res) => {
    const { title } = req.body;
    const { id } = req.body;
    const data = await searchUploadedByTitleService(id, title);

    return res.status(200).json(data);
};

const deleteDocument = async (req, res) => {
    const { id } = req.params;

    const result = await deleteDocumentService(id);
    return res.status(200).json(result);
};

const getDocumentsByCategory = async (req, res) => {
    const { id } = req.params;

    const data = await getDocumentsByCategoryService(id);

    return res.status(200).json(data);
};

const getDocumentsByLevel = async (req, res) => {
    const { id } = req.params;

    const data = await getDocumentsByLevelService(id);

    return res.status(200).json(data);
};

const addRecentlyRead = async (req, res) => {
    const { userId } = req.body;
    const { documentId } = req.params;

    if (!userId || !documentId) {
        return res.status(400).json({ EC: 1, EM: 'Thiếu userId hoặc documentId' });
    }

    const result = await addRecentlyReadService(userId, documentId);
    return res.status(200).json(result);
};

const getRecentlyRead = async (req, res) => {
    const { userId } = req.query;
    const result = await getRecentlyReadService(userId);
    return res.status(200).json(result);
};

const getTopDocumentsByViews = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;

        const result = await getTopDocumentsByViewsService(limit);

        if (result.EC === 0) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        return res.status(500).json({
            EC: 2,
            EM: 'Đã xảy ra lỗi trong quá trình xử lý',
        });
    }
};

module.exports = {
    createDocument,
    getDocument,
    getDocuments,
    deleteDocument,
    searchByTitle,
    getDocumentsByCategory,
    getDocumentsByLevel,
    addRecentlyRead,
    getRecentlyRead,
    getTopDocumentsByViews,
    searchUploadedByTitle,
    searchLibraryByTitle,
};
