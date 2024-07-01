import axiosWrapper from "@/utils/axiosWrapper";


export const getPaymentTypes = async ()  => {
    try {
        let res = await axiosWrapper.get(`payment_types`)
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};