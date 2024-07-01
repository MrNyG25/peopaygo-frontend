import { axiosWrapperServer } from "@/utils/axiosWrapperServer";

export const getCustomers = async ()  => {
    try {
        let res = await axiosWrapperServer.get<any>(`customers`);
        return res.data;
    } catch (error) {
        
        return {
            hasError: true,
            error
        };
    }
};