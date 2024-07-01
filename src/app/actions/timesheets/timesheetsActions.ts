import axios from "axios";
const API_URL = process.env.apiUrl;

export const getTimesheetsByCustomerId = async (customerId: number)  => {
    try {
        let res = await axios.get<any>(`${API_URL}customers/${customerId}/timesheets`);
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
        let res = await axios.get<any>(`${API_URL}timesheets/${timesheetId}`);
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
        let res = await axios.post(`${API_URL}timesheets`, data )
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};


export const updateTimesheetAmount = async (timesheetId: number, data: any)  => {
    try {
        let res = await axios.post(`${API_URL}timesheets/${timesheetId}/updateAmount`, data )
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};


export const updateTimesheet = async (timesheetId: number, data: any)  => {
    try {
        let res = await axios.put(`${API_URL}timesheets/${timesheetId}`, data )
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};

