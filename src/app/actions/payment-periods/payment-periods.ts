import { axiosWrapperClient } from "@/utils/axiosWrapperClient";


export const createPaymentPeriod = async (data: any)  => {
    try {
        let res = await axiosWrapperClient.post(`payment_periods`, data )
        return res.data.data;
    } catch (error) {
        return {
            hasError: true,
            error
        };
    }
};


export const getTimesheetsByPaymentPeriodId = async (paymentPeriodId)  => {
    try {
        let res = await axiosWrapperClient.get(`payment_periods/${paymentPeriodId}/timesheets`,  )
        return res.data;
    } catch (error) {
        return {
            hasError: true,
            error
        };
    }
};

