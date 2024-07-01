import { axiosWrapperClient } from "@/utils/axiosWrapperClient";


export const getTimesheetById = async (timesheetId: any)  => {
    try {
        let res = await axiosWrapperClient.get<any>(`timesheets/${timesheetId}`);
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
        let res = await axiosWrapperClient.post(`timesheets`, data )
        return res.data.data;
    } catch (error) {
        return {
            hasError: true,
            error
        };
    }
};


export const updateTimesheetAmount = async (timesheetId: number, data: any)  => {
    try {
        let res = await axiosWrapperClient.post(`timesheets/${timesheetId}/updateAmount`, data )
        return res.data.data;
    } catch (error) {
        return {
            hasError: true,
            error
        };
    }
};


export const updateTimesheet = async (timesheetId: number, data: any)  => {
    try {
        let res = await axiosWrapperClient.put(`timesheets/${timesheetId}`, data )
        return res.data.data;
    } catch (error) {
        return {
            hasError: true,
            error
        };
    }
};

