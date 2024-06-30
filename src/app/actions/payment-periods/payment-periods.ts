import axios from "axios";

export const createPaymentPeriod = async (data: any)  => {
    try {
        let res = await axios.post(`http://127.0.0.1:8000/api/payment_periods`, data )
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};
