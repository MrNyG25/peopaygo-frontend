import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import { Employee, EmployeesResponse } from "./interfaces/EmployeesResponse";
import { TimesheetData } from "./interfaces/TimesheetData";
import { SaveTimesheetResponse } from "./interfaces/SaveTimesheetResponse";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Timesheet, TimesheetResponse } from "./interfaces/TimesheetResponse";




const fetchEmployees = async ()  => {
    let res = await axios.get<EmployeesResponse>('http://127.0.0.1:8000/api/customers/1/employees');
    return res.data.data;
};

export const useEmployees = () =>{
    const {  data, refetch, isSuccess } = useQuery<Employee[]>({
        queryKey: ['employees'],
        queryFn: fetchEmployees
    })
    return {employees:data,refetch,isSuccessEmployees: isSuccess }
}


const fetchTimesheetById = async (id: number): Promise<Timesheet>  => {
    let res = await axios.get<TimesheetResponse>(`http://127.0.0.1:8000/api/timesheets/${id}`);
    return res.data.data;
};

export const useTimesheet = (id: number) =>{
    if(id == 0){
        return {timesheet: null}
    }
    const {  data,refetch,isLoading, isSuccess} = useQuery({
        queryKey: ['timesheet',id],
        queryFn: () => fetchTimesheetById(id)
    })

    return {timesheet:data,refetch,isLoading, isSuccess}
}

export const useSaveTimesheet = (id: number) => {
    
    const { toast } = useToast();
    const router = useRouter();


    let {isPending, mutate} = useMutation({
        mutationFn: (data: TimesheetData): Promise<SaveTimesheetResponse> => {
            if (id) {
                return axios.put(`http://127.0.0.1:8000/api/timesheets/${id}`, data);
            } else {
                return axios.post('http://127.0.0.1:8000/api/timesheets', data);
            }
        },
        onSuccess(data){
            toast({
                className: 'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
                title: "Message",
                description: (
                    <p>{id ? "Timesheet updated successfully" : "Timesheet created successfully"}</p>
                ),
            });
            router.push('/dashboard/timesheets');
        },
        onError(data){
            toast({
                className: 'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
                variant: "destructive",
                title: "Message",
                description: (
                    <p>{id ? "Cannot update Timesheet" : "Cannot create Timesheet"}</p>
                ),
            });
        },
        
    });
    return {isPending, mutate}
}