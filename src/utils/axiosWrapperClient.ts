"use client"

import axios from "axios";
import { getUserDataClient } from "./getUserDataClient";
const API_URL = process.env.apiUrl;

let dataClient = getUserDataClient();


export const axiosWrapperClient = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    headers: {'Authorization': `Bearer ${dataClient?.token}`}
});

