import { axiosWrapperServer } from "@/utils/axiosWrapperServer";


export const getPaymentTypes = async ()  => {
    try {
        let res = await axiosWrapperServer.get(`payment_types`)
        return res.data.data;
    } catch (error) {
        return {
            hasError: true,
            error
        };
    }
};