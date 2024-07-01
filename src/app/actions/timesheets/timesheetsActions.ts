import axiosWrapper from "@/utils/axiosWrapper";


export const getTimesheetsByCustomerId = async (customerId: number)  => {
    try {
        let res = await axiosWrapper.get<any>(`customers/${customerId}/timesheets`);
        return res.data;
    } catch (error) {
        return {
            hasError: true,
            error
        };
    }
};

export const getTimesheetById = async (timesheetId: any)  => {
    try {
        let res = await axiosWrapper.get<any>(`timesheets/${timesheetId}`);
        return res.data.data;
    } catch (error) {
        return {
            hasError: true,
            error
        };
    }
};

export const createTimesheet = async (data: any)  => {
    try {
        let res = await axiosWrapper.post(`timesheets`, data )
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};


export const updateTimesheetAmount = async (timesheetId: number, data: any)  => {
    try {
        let res = await axiosWrapper.post(`timesheets/${timesheetId}/updateAmount`, data )
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};


export const updateTimesheet = async (timesheetId: number, data: any)  => {
    try {
        let res = await axiosWrapper.put(`timesheets/${timesheetId}`, data )
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};

