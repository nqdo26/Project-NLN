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

const updateLevelApi = (id, title) => {
    const URL_API = `/v1/api/level/${id}`;
    return axios.put(URL_API, { title }) 
        .then(response => response.data)
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

const updateCategoryApi = (id, title) => {
    const URL_API = `/v1/api/category/${id}`;
    return axios.put(URL_API, { title }) 
        .then(response => response.data)
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

const searchDocumentsApi = (title) => {
    const URL_API = `/v1/api/documents/search?title=${encodeURIComponent(title)}`;
    return axios.get(URL_API);
};

export {
    getUsersApi,
    deleteUserApi,

    createLevelApi,
    getLevelsApi,
    deleteLevelApi,
    updateLevelApi,

    createCategoryApi,
    getCategoriesApi,
    deleteCategoryApi,
    updateCategoryApi,

    createDocumentApi,

    getDocumentApi,
    getDocumentsApi,
    searchDocumentsApi






};
