import axios from './axios.custiomize';

const getUsersApi = () => {
    const URL_API = '/v1/api/users';
    return axios.get(URL_API);
};

const deleteUserApi = (id) => {
    const URL_API = `/v1/api/users/${id}`;
    return axios.delete(URL_API);
}

export { 
    getUsersApi,
    deleteUserApi,
};
