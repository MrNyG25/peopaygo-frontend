
"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "@radix-ui/react-icons";
import { useEmployees } from "./employees.queries";
import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";


export default function page() {

  const { employees } = useEmployees();
  

  return (
    <section>
      <div className='container'>
        <h1 className='mb-6 text-3xl font-bold'>All employees</h1>
        <Link href={'/dashboard/employees/employee-form'}>
          <Button >
            <PlusIcon className="mr-1 h-4 w-4"/>
            Add timesheet
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

