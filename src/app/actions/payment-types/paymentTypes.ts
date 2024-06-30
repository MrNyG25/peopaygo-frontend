import axios from "axios";

export const getPaymentTypes = async ()  => {
    try {
        let res = await axios.get(`http://127.0.0.1:8000/api/payment_types`)
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};