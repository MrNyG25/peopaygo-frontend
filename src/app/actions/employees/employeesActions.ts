import axios from "axios";

export const getEmployeesByClientId = async (clientId: any)  => {
    try {
        let res = await axios.get<any>(`http://127.0.0.1:8000/api/customers/${clientId}/employees`, );
        return res.data.data;
    } catch (error) {
        return {
            hasError: true
        };
    }
};