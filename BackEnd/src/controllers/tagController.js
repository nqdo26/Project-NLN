const {
    createTagService,
    getTagsInfoService,
    getTagsInfoByIdsService,
    deleteTagByIdService,
    getCourseStatisticsByTagService,
} = require('../services/tagService');
const upload = require('../../middleware/multer');
const jwt = require('jsonwebtoken');

const createTag = async (req, res) => {
    const { name, color } = req.body;

    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const data = await createTagService(owner, name, color);
    return res.status(200).json(data);
};

const getTagsInfo = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const data = await getTagsInfoService(owner);
    return res.status(200).json(data);
};

const getTagsInfoByIds = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const { tagsIds } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const data = await getTagsInfoByIdsService(owner, tagsIds);
    return res.status(200).json(data);
};

// const updateUser = async (req, res) => {
//     const token = req.headers.authorization.split(' ')[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const { description } = req.body;
//     const name = decoded.name;
//     const avatar = req.file;

//     const data = await updateUserService(name, description, avatar);
//     return res.status(200).json(data);
// };

const deleteTagById = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const { tagId } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const data = await deleteTagByIdService(tagId);
    return res.status(200).json(data);
};

const getCourseStatisticsByTag = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const data = await getCourseStatisticsByTagService(owner);
    return res.status(200).json(data);
};

module.exports = {
    createTag,
    getTagsInfo,
    getTagsInfoByIds,
    // updateUser,
    deleteTagById,
    getCourseStatisticsByTag,
};
