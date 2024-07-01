import { axiosWrapperServer } from "@/utils/axiosWrapperServer";

export const getEmployeesByCustomerId = async (clientId: number)  => {
    try {
        let res = await axiosWrapperServer.get<any>(`customers/${clientId}/employees`, );
        return res.data;
    } catch (error) {
        return {
            hasError: true,
            error
        };
    }
};