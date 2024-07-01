import { axiosWrapperServer } from "@/utils/axiosWrapperServer";


export const getTimesheetsByCustomerId = async (customerId: number)  => {
    try {
        let res = await axiosWrapperServer.get<any>(`customers/${customerId}/timesheets`);
        return res.data;
    } catch (error) {
        return {
            hasError: true,
            error
        };
    }
};