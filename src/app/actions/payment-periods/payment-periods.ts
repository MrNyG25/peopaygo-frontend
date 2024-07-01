import axiosWrapper from "@/utils/axiosWrapper";


export const createPaymentPeriod = async (data: any)  => {
    try {
        let res = await axiosWrapper.post(`payment_periods`, data )
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
        let res = await axiosWrapper.get(`payment_periods`,  )
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
        let res = await axiosWrapper.get(`customers/${customerId}/payment_periods`,  )
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
        let res = await axiosWrapper.get(`payment_periods/${paymentPeriodId}/timesheets`,  )
        return res.data;
    } catch (error) {
        return {
            hasError: true,
            error
        };
    }
};

