import axios from "axios";


export const getEmployeesByCustomerId = async (clientId: number)  => {
    try {
        let res = await axios.get<any>(`http://127.0.0.1:8000/api/customers/${clientId}/employees`, );
        return res.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};

export const getEmployeeById = async (employeeId: number)  => {
    try {
        let res = await axios.get(`http://127.0.0.1:8000/api/employees/${employeeId}`);
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};

export const createEmployee = async (data: any)  => {
    try {
        let res = await axios.post(`http://127.0.0.1:8000/api/employees`, data )
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};


export const updateEmployee = async (employeeId: number, data: any)  => {
    try {
        let res = await axios.put(`http://127.0.0.1:8000/api/employees/${employeeId}`, data);
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};