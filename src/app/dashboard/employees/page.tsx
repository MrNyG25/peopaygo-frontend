"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "@radix-ui/react-icons";
import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";
import { getEmployeesByCustomerId } from "@/app/actions/employees/employeesActions";
import { useEffect, useState } from "react";
import useAuthStore from "@/app/stores/AuthStore";


export default function page() {
  
  const userData = useAuthStore((state) => state.user)
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    getEmployeesByCustomerIdFn()
  }, [])
  
  const getEmployeesByCustomerIdFn = async () => {
    console.log(userData)
    if(userData){
      let customerId = userData?.user?.id;
      let employeesRes =  await getEmployeesByCustomerId(customerId);
      setEmployees(employeesRes)
    }
  }
  
  return (
    <section>
      <div className='container'>
        <h1 className='mb-6 text-3xl font-bold'>All employees</h1>
        <Link href={'/dashboard/employees/employee-form'}>
          <Button >
            <PlusIcon className="mr-1 h-4 w-4"/>
            Add employee
          </Button>
        </Link>
        <DataTable
            columns={columns} 
            data={employees ?? []}
        />
      </div>
    </section>
  )
}

