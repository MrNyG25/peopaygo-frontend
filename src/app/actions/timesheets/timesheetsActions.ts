import axios from "axios";

export const getTimesheets = async ()  => {
    try {
        let res = await axios.get<any>('http://127.0.0.1:8000/api/customers/1/timesheets');
        return res.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};

export const getTimesheetById = async (timesheetId: any)  => {
    try {
        let res = await axios.get<any>(`http://127.0.0.1:8000/api/timesheets/${timesheetId}`);
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};

export const createTimesheet = async (data: any)  => {
    try {
        let res = await axios.post(`http://127.0.0.1:8000/api/timesheets`, data )
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};


export const updateTimesheetAmount = async (timesheetId: number, data: any)  => {
    try {
        let res = await axios.put(`http://127.0.0.1:8000/api/timesheets/${timesheetId}/updateAmount`, data )
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};


export const updateTimesheet = async (timesheetId: number, data: any)  => {
    try {
        let res = await axios.put(`http://127.0.0.1:8000/api/timesheets/${timesheetId}`, data )
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};

