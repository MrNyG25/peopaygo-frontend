import {useMutation, useQuery} from "@tanstack/react-query";
import { Timesheet, TimesheetsResponse } from "./interfaces/TimesheetsResponse";
import { useToast } from "@/components/ui/use-toast";

import axios from "axios";


const fetchTimesheets = async ()  => {
    let res = await axios.get<TimesheetsResponse>('http://127.0.0.1:8000/api/customers/1/timesheets');
    return res.data.data;
};

export const useTimesheets = () =>{
    const {  data,refetch,isLoading} = useQuery<Timesheet[]>({
        queryKey: ['timesheets'],
        queryFn: fetchTimesheets
    })
    return {timesheets:data,refetch,isLoading}
}


export const useTimesheetsUpdateAmount = () =>{

    const { toast } = useToast();

    const mutation = useMutation({
        mutationFn: (data) => axios.put('http://127.0.0.1:8000/api/timesheets/3/updateAmount', data ),
        /* onSuccess: (data) => {
            toast({
                title: "Message",
                description: (
                <p>Amount updated successfully</p>
                ),
            });
        },
        onError: (error) => {
            toast({
                title: "Message",
                description: (
                <p>Cannot update the amount</p>
                ),
            });
        } */
    })
    
    return {updateAmount:mutation}
}