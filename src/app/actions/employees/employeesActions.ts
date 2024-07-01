import axiosWrapper from "@/utils/axiosWrapper";


export const getEmployeesByCustomerId = async (clientId: number)  => {
    try {
        let res = await axiosWrapper.get<any>(`customers/${clientId}/employees`, );
        return res.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};

export const getEmployeeById = async (employeeId: number)  => {
    try {
        let res = await axiosWrapper.get(`employees/${employeeId}`);
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};

export const createEmployee = async (data: any)  => {
    try {
        let res = await axiosWrapper.post(`employees`, data )
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};


export const updateEmployee = async (employeeId: number, data: any)  => {
    try {
        let res = await axiosWrapper.put(`employees/${employeeId}`, data);
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};



export const deleteEmployee = async (employeeId: number)  => {
    try {
        let res = await axiosWrapper.delete(`employees/${employeeId}`);
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};
