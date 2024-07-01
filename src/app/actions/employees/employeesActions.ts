import { axiosWrapperClient } from "@/utils/axiosWrapperClient";




export const getEmployeeById = async (employeeId: number)  => {
    try {
        let res = await axiosWrapperClient.get(`employees/${employeeId}`);
        return res.data.data;
    } catch (error) {
        return {
            hasError: true,
            error
        };
    }
};

export const createEmployee = async (data: any)  => {
    try {
        let res = await axiosWrapperClient.post(`employees`, data )
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};


export const updateEmployee = async (employeeId: number, data: any)  => {
    try {
        let res = await axiosWrapperClient.put(`employees/${employeeId}`, data);
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};



export const deleteEmployee = async (employeeId: number)  => {
    try {
        let res = await axiosWrapperClient.delete(`employees/${employeeId}`);
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};
