import axios from './axios.custiomize';

const getUsersApi = () => {
    const URL_API = '/v1/api/users';
    return axios.get(URL_API);
};

export { getUsersApi };