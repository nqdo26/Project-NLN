const {
    createTermService,
    getTermsInfoService,
    getTermInfoService,
    deleteTermService,
    updateTermService,
    updateTermNoteService,
} = require('../services/termService');
const upload = require('../../middleware/multer');
const jwt = require('jsonwebtoken');

const createTerm = async (req, res) => {
    const { emoji, color, name, description, startDate, endDate } = req.body;
    const cover = req.file;
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const data = await createTermService(owner, emoji, color, cover, name, description, startDate, endDate);
    return res.status(200).json(data);
};

const getTermsInfo = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const data = await getTermsInfoService(owner);
    return res.status(200).json(data);
};

const getTermInfo = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const { termId } = req.body;

    const data = await getTermInfoService(termId);
    return res.status(200).json(data);
};

const deleteTerm = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const { termId } = req.body;

    const data = await deleteTermService(owner, termId);
    return res.status(200).json(data);
};

const updateTerm = async (req, res) => {
    const { emoji, color, name, description, startDate, endDate, termId } = req.body;
    const cover = req.file;
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const data = await updateTermService(owner, emoji, color, cover, name, description, startDate, endDate, termId);
    return res.status(200).json(data);
};

const updateTermNote = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const { termId, newNote } = req.body;

    const data = await updateTermNoteService(termId, newNote);

    return res.status(200).json(data);
};

module.exports = {
    createTerm,
    getTermsInfo,
    getTermInfo,
    deleteTerm,
    updateTerm,
    updateTermNote,
};
