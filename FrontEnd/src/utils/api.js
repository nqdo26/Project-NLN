import axios from './axios.custiomize';

//USER
const getUsersApi = () => {
    const URL_API = '/v1/api/users';
    return axios.get(URL_API);
};

const deleteUserApi = (id) => {
    const URL_API = `/v1/api/users/${id}`;
    return axios.delete(URL_API);
};

//LEVEL
const getLevelsApi = () => {
    const URL_API = '/v1/api/level';
    return axios.get(URL_API);
};

const createLevelApi = (title) => {
    const URL_API = '/v1/api/level';
    return axios.post(URL_API, { title });
};

const deleteLevelApi = (id) => {
    const URL_API = `/v1/api/level/${id}`;
    return axios.delete(URL_API);
};

//CATEGORY
const getCategoriesApi = () => {
    const URL_API = '/v1/api/category';
    return axios.get(URL_API);
};

const createCategoryApi = (title) => {
    const URL_API = '/v1/api/category';
    return axios.post(URL_API, { title });
};

const deleteCategoryApi = (id) => {
    const URL_API = `/v1/api/category/${id}`;
    return axios.delete(URL_API);
};

//DOCUMENT
const createDocumentApi = (submitDoc) => {
    const { author, title, description, createAt, link, type, categories, level, statistics } = submitDoc;
    const URL_API = '/v1/api/createDocument';
    return axios.post(URL_API, { author, title, description, createAt, link, type, categories, level, statistics });
};

const getDocumentApi = (id) => {
    const URL_API = '/v1/api/getDocument/' + id;
    return axios.get(URL_API);
};

const getDocumentsApi = () => {
    const URL_API = '/v1/api/getDocuments';
    return axios.get(URL_API);
};

export {
    getUsersApi,
    deleteUserApi,
    createLevelApi,
    getLevelsApi,
    deleteLevelApi,
    createCategoryApi,
    getCategoriesApi,
    deleteCategoryApi,
    createDocumentApi,
    getDocumentApi,
    getDocumentsApi,
};
