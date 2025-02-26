const upload = require('../../middleware/multer');
const jwt = require('jsonwebtoken');
const path = require('path');
const { createCategoryService, updateCategoryService, deleteCategoryService, getCategoriesService } = require('../services/adminService');



const createCategory = async (req, res) => {
    const { title } = req.body;

    const data = await createCategoryService(title);

    return res.status(200).json(data);
}

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const data = await updateCategoryService(id, title);
    return res.status(200).json(data);
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;

    const data = await deleteCategoryService(id);

    return res.status(200).json(data);
}

const getCategories = async (req, res) => {
    const data = await getCategoriesService();
    return res.status(200).json(data);
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategories,
};
