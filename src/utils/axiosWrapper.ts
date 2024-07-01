import axios from "axios";
const API_URL = process.env.apiUrl;

const axiosWrapper = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    headers: {'Authorization': `Bearer 1233`}
});

export default axiosWrapper