import { axiosWrapperServer } from "@/utils/axiosWrapperServer";

export const getPaymentPeriods= async ()  => {
    try {
        let res = await axiosWrapperServer.get(`payment_periods`)
        return res.data;
    } catch (error) {
        return {
            hasError: true,
            error
        };
    }
};