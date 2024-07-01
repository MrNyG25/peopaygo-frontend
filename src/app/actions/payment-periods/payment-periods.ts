import axios from "axios";

export const createPaymentPeriod = async (data: any)  => {
    try {
        let res = await axios.post(`http://127.0.0.1:8000/api/payment_periods`, data )
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
        let res = await axios.get(`http://127.0.0.1:8000/api/customers/payment_periods`,  )
        return res.data.data;
    } catch (error) {
        return {
            hasError: true,
            error
        };
    }
};

export const getPaymentPeriodsByCustomerId = async (customerId)  => {
    try {
        let res = await axios.get(`http://127.0.0.1:8000/api/customers/${customerId}/payment_periods`,  )
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
        let res = await axios.get(`http://127.0.0.1:8000/api/payment_periods/${paymentPeriodId}/timesheets`,  )
        return res.data;
    } catch (error) {
        return {
            hasError: true,
            error
        };
    }
};

