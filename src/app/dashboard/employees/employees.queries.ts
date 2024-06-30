import {useMutation, useQuery} from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

import axios from "axios";
import { EmployeeResponse } from "./interfaces/EmployeeResponse";


const fetchEmployees = async ()  => {
    let res = await axios.get<EmployeeResponse>('http://127.0.0.1:8000/api/employees');
    return res.data.data;
};

export const useEmployees = () =>{
    const { data, isPending, refetch } = useQuery({
        queryKey: ['employees'],
        queryFn: fetchEmployees
    })
    return {employees:data,refetch,isPending}
}
