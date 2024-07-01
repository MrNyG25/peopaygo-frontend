import axios from "axios";
const API_URL = process.env.apiUrl;

export const getPaymentTypes = async ()  => {
    try {
        let res = await axios.get(`${API_URL}payment_types`)
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};