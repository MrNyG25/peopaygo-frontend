import { axiosWrapperClient } from "@/utils/axiosWrapperClient";


export const createCustomer = async (data: any)  => {
    try {
        let res = await axiosWrapperClient.post<any>(`customers`, data)
        return res.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};


export const getCustomerById = async (id: any)  => {
    try {
        let res = await axiosWrapperClient.get<any>(`customers/${id}`);
        return res.data.data;
    } catch (error) {
        
        return {
            hasError: true
        };
    }
};

export const updateCustomer = async (id: any, data: any)  => {
    try {
        let res = await axiosWrapperClient.put<any>(`/customers/${id}`, data);
        return res.data.data;
    } catch (error) {
        
        return {
            hasError: true,
            error
        };
    }
};

