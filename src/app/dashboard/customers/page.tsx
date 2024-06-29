
"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { CustomerResponse } from "./interfaces/CustomersResponse";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil1Icon , PlusIcon} from "@radix-ui/react-icons";


export default function page() {

  const fetchUsers= async ()  => {
    let res = await axios.get<CustomerResponse>('http://127.0.0.1:8000/api/customers');
    return res.data.data;
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchUsers
  })
  
  return (
    <div className="w-100">
      <Link href={'/dashboard/customers/customer-form'}>
        <Button >
          <PlusIcon className="mr-1 h-4 w-4"/>
          Add
        </Button>
      </Link>
      <Table>
        <TableCaption>A list of clients.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            isPending ? 
            <TableRow key={1}>
              <TableCell colSpan={1} className="text-right">Loading...</TableCell>
            </TableRow>
            : data?.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.created_at}</TableCell>
                <TableCell className="text-right">
                  <Link href={{
                    pathname: '/dashboard/customers/customer-form',
                    query: { id: customer.id },
                  }}>
                    <Button >
                      <Pencil1Icon className="mr-1 h-4 w-4"/>
                      Edit
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          }
          {}
        </TableBody>
       
      </Table>
    </div>
  )
}

