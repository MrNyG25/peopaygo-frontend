import { axiosWrapperServer } from "@/utils/axiosWrapperServer";

export const getPaymentPeriodsByCustomerId = async (customerId)  => {
    try {
        let res = await axiosWrapperServer.get(`customers/${customerId}/payment_periods`,  )
        return res.data;
    } catch (error) {
        return {
            hasError: true,
            error
        };
    }
};