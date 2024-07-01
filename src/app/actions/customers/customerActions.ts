import axiosWrapper from "@/utils/axiosWrapper";


export const createCustomer = async (data: any)  => {
    try {
        let res = await axiosWrapper.post<any>(`customers`, data)
        return res.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};


export const getCustomers = async ()  => {
    try {
        let res = await axiosWrapper.get<any>(`customers`);
        return res.data;
    } catch (error) {
        
        return {
            hasError: true
        };
    }
};


export const getCustomerById = async (id: any)  => {
    try {
        let res = await axiosWrapper.get<any>(`customers/${id}`);
        return res.data.data;
    } catch (error) {
        
        return {
            hasError: true
        };
    }
};

export const updateCustomer = async (id: any, data: any)  => {
    try {
        let res = await axiosWrapper.put<any>(`/customers/${id}`, data);
        return res.data.data;
    } catch (error) {
        
        return {
            hasError: true
        };
    }
};

