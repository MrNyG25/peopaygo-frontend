import axios from "axios";
const API_URL = process.env.apiUrl;

export const getEmployeesByCustomerId = async (clientId: number)  => {
    try {
        let res = await axios.get<any>(`${API_URL}customers/${clientId}/employees`, );
        return res.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};

export const getEmployeeById = async (employeeId: number)  => {
    try {
        let res = await axios.get(`${API_URL}employees/${employeeId}`);
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};

export const createEmployee = async (data: any)  => {
    try {
        let res = await axios.post(`${API_URL}employees`, data )
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};


export const updateEmployee = async (employeeId: number, data: any)  => {
    try {
        let res = await axios.put(`${API_URL}employees/${employeeId}`, data);
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};



export const deleteEmployee = async (employeeId: number)  => {
    try {
        let res = await axios.delete(`${API_URL}employees/${employeeId}`);
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};
