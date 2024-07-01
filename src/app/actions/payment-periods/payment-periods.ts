import axios from "axios";
const API_URL = process.env.apiUrl;

export const createPaymentPeriod = async (data: any)  => {
    try {
        let res = await axios.post(`${API_URL}payment_periods`, data )
        return res.data.data;
    } catch (error) {
        return {
            hasError: true,
            error
        };
    }
};

export const getPaymentPeriods= async ()  => {
    try {
        let res = await axios.get(`${API_URL}payment_periods`,  )
        return res.data;
    } catch (error) {
        return {
            hasError: true,
            error
        };
    }
};

export const getPaymentPeriodsByCustomerId = async (customerId)  => {
    try {
        let res = await axios.get(`${API_URL}customers/${customerId}/payment_periods`,  )
        return res.data;
    } catch (error) {
        return {
            hasError: true,
            error
        };
    }
};

export const getTimesheetsByPaymentPeriodId = async (paymentPeriodId)  => {
    try {
        let res = await axios.get(`${API_URL}payment_periods/${paymentPeriodId}/timesheets`,  )
        return res.data;
    } catch (error) {
        return {
            hasError: true,
            error
        };
    }
};

