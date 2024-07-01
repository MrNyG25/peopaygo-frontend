import axios from "axios";
import { getUserDataServer } from "./getUserDataServer";
const API_URL = process.env.apiUrl;

let dataClient = getUserDataServer();


export const axiosWrapperServer = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    headers: {'Authorization': `Bearer ${dataClient?.token}`}
});

