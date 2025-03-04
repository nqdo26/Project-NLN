const jwt = require('jsonwebtoken');
const Document = require('../models/document');
const path = require('path');
const {
    createDocumentService,
    deleteDocumentService,
    getDocumentService,
    getDocumentsService,
} = require('../services/documentService');

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

const deleteDocument = async (req, res) => {
    const { id } = req.params;

    const data = await deleteDocumentService(id);

    return res.status(200).json(data);
};

module.exports = {
    createDocument,
    getDocument,
    getDocuments,
    deleteDocument,
};
