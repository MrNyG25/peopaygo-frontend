import axios from "axios";

export const createCustomer = async (data: any)  => {
    try {
        let res = await axios.post<any>('http://127.0.0.1:8000/api/customers', data)
        return res.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};


export const getCustomers = async ()  => {
    try {
        let res = await axios.get<any>('http://127.0.0.1:8000/api/customers');
        return res.data;
    } catch (error) {
        
        return {
            hasError: true
        };
    }
};


export const getCustomerById = async (id: any)  => {
    try {
        let res = await axios.get<any>(`http://127.0.0.1:8000/api/customers/${id}`);
        return res.data.data;
    } catch (error) {
        
        return {
            hasError: true
        };
    }
};

export const updateCustomer = async (id: any, data: any)  => {
    try {
        let res = await axios.get<any>(`http://127.0.0.1:8000/api/customers/${id}`, data);
        return res.data.data;
    } catch (error) {
        
        return {
            hasError: true
        };
    }
};

