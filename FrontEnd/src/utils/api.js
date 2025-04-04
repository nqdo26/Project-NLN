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
    return axios.put(URL_API, { title }).then((response) => response.data);
};

const deleteLevelApi = (id) => {
    const URL_API = `/v1/api/level/${id}`;
    return axios.delete(URL_API);
};

const getDocumentsByLevelApi = (id) => {
    const URL_API = `/v1/api/level/${id}`;
    return axios.get(URL_API);
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
    return axios.put(URL_API, { title }).then((response) => response.data);
};

const deleteCategoryApi = (id) => {
    const URL_API = `/v1/api/category/${id}`;
    return axios.delete(URL_API);
};

const getDocumentsByCategoryApi = (id) => {
    const URL_API = `/v1/api/category/${id}`;
    return axios.get(URL_API);
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

const deleteDocumentApi = (id) => {
    const URL_API = `/v1/api/deleteDocument/${id}`;
    return axios.delete(URL_API);
};

//USER

const createUserApi = (fullName, email, password) => {
    const URL_API = '/v1/api/register';
    const data = { fullName, email, password };
    return axios.post(URL_API, data);
};

const loginApi = (email, password) => {
    const URL_API = 'v1/api/login';
    const data = { email, password };
    return axios.post(URL_API, data);
};

const getAccountApi = () => {
    const URL_API = '/v1/api/account';
    return axios.get(URL_API);
};

const updateNameApi = (id, title) => {
    const URL_API = `/v1/api/users/${id}`;
    return axios.put(URL_API, { title }).then((response) => response.data);
};

const searchApi = (title) => {
    const URL_API = `/v1/api/search/all?title=${encodeURIComponent(title)}`;
    return axios.get(URL_API);
};

//Actions
const likeApi = (id, email) => {
    const data = { email };
    const URL_API = `/v1/api/like/${id}`;
    return axios.post(URL_API, data);
};

const dislikeApi = (id, email) => {
    const data = { email };
    const URL_API = `/v1/api/dislike/${id}`;
    return axios.post(URL_API, data);
};

const saveApi = (id, email) => {
    const data = { email };
    const URL_API = `/v1/api/save/${id}`;
    return axios.post(URL_API, data);
};

const getUserDocumentApi = (id) => {
    const URL_API = `/v1/api/getUserDocument`;
    return axios.post(URL_API, { id });
};

const getSavedDocumentApi = (_id) => {
    const URL_API = `/v1/api/getSavedDocument/` + _id;
    return axios.get(URL_API);
};

//Report
const reportApi = (documentId, reporterId, description) => {
    const URL_API = `/v1/api/report`;
    return axios.post(URL_API, { documentId, reporterId, description });
};

const getReportsApi = () => {
    const URL_API = '/v1/api/reports';
    return axios.get(URL_API);
};

const updateReportApi = (id, status) => {
    const URL_API = `/v1/api/report/${id}`;
    return axios.put(URL_API, { status });
};

const deleteReportApi = (id) => {
    const URL_API = `/v1/api/report/${id}`;
    return axios.delete(URL_API);
};

const addRecentlyReadApi = (userId, documentId) => {
    const URL_API = `/v1/api/addRecentlyRead/${documentId}`;
    return axios.post(URL_API, { userId });
};

const getRecentlyReadApi = (userId) => {
    const URL_API = '/v1/api/getRecentlyRead';
    return axios.get(URL_API, { params: { userId } });
};

const getTopDocumentsByViewsApi = (limit) => {
    const URL_API = `/v1/api/documents/top-views?limit=${limit}`;
    return axios.get(URL_API);
};

const getSystemStatisticsApi = () => {
    const URL_API = '/v1/api/admin/statistics';
    return axios.get(URL_API);
};

const searchLibraryByTitleApi = (id, title) => {
    const URL_API = `/v1/api/search/library`;
    return axios.post(URL_API, { id, title });
};

const searchUploadedByTitleApi = (id, title) => {
    const URL_API = `/v1/api/search/uploaded`;
    return axios.post(URL_API, { id, title });
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
    createUserApi,
    loginApi,
    getAccountApi,
    updateNameApi,
    searchApi,
    likeApi,
    dislikeApi,
    saveApi,
    getSavedDocumentApi,
    deleteDocumentApi,
    getDocumentsByCategoryApi,
    getDocumentsByLevelApi,
    getUserDocumentApi,
    reportApi,
    getReportsApi,
    updateReportApi,
    deleteReportApi,
    addRecentlyReadApi,
    getRecentlyReadApi,
    getTopDocumentsByViewsApi,
    getSystemStatisticsApi,
    searchLibraryByTitleApi,
    searchUploadedByTitleApi,
};
