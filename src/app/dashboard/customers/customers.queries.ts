import axios from "axios";
import { CustomerResponse } from "./interfaces/CustomersResponse";
import { useQuery } from "@tanstack/react-query";

const fetchCustomers= async ()  => {
    let res = await axios.get<CustomerResponse>('http://127.0.0.1:8000/api/customers');
    return res.data.data;
  };


export const useCustomers = () =>{
    const { data, isPending, refetch } = useQuery({
        queryKey: ['customers'],
        queryFn: fetchCustomers
    })
    return {customers:data,refetch,isPending}
}