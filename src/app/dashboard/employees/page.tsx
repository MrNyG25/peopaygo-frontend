import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "@radix-ui/react-icons";
import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";
import { getUserDataServer } from "@/utils/getUserDataServer";
import { getEmployeesByCustomerId } from "@/app/actions/employees/getEmployeesByCustomerId";


export default async function page() {

  let userData = getUserDataServer();

  let res = await getEmployeesByCustomerId(userData.user.customer.id);
  
  let employees = res?.data;

  if(res?.hasError){
    console.log(res)
    employees = []
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

