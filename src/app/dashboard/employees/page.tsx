
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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EmployeeResponse } from "./interfaces/EmployeeResponse";
import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";


export default function page() {

  const fetchUsers= async ()  => {
    let res = await axios.get<EmployeeResponse>('http://127.0.0.1:8000/api/employees');
    return res.data.data;
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['employee'],
    queryFn: fetchUsers
  })
  
  return (
    <div className="w-100">
      <Link href={'/dashboard/employees/employee-form'}>
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
            : data?.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell>{employee.created_at}</TableCell>
                <TableCell className="text-right">
                    <Link href={{
                      pathname: '/dashboard/employees/employee-form',
                      query: { id: employee.id },
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

