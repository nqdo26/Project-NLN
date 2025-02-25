const upload = require('../../middleware/multer');
const jwt = require('jsonwebtoken');
const path = require('path');
const { createLevelService, deleteLevelSerivice, updateLevelService } = require('../services/adminService');


const createLevel = async (req, res) => {
    const { title } = req.body;

    const data = await createLevelService(title);

    return res.status(200).json(data);
}

const updateLevel = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const data = await updateLevelService(id, title);
    return res.status(200).json(data);
}

const deleteLevel = async (req, res) => {
    const { id } = req.params;

    const data = await deleteLevelSerivice(id);

    return res.status(200).json(data);
}

module.exports = {
  createLevel,
  updateLevel,
  deleteLevel,
  
};
