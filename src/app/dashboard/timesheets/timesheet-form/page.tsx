import TimesheetForm from "./components/TimesheetForm";
import { cookies } from 'next/headers'
import { getUserDataServer } from "@/utils/getUserDataServer";
import { getEmployeesByCustomerId } from "@/app/actions/employees/getEmployeesByCustomerId";


export default async function Page() {
  
  let userData = getUserDataServer();
    
  const res = await getEmployeesByCustomerId(userData.user.customer.id);

  let employees = res.data;

  if(res?.hasError){
    console.log(res)
    employees = []
  }
  
  return (
    <div className="w-full h-full flex-col justify-center py-10">
      <h1 className='w-2/3 mb-6 text-3xl font-bold mx-auto'>Timesheet form</h1>
      
      <TimesheetForm employees={employees} />
      
    </div>
  );
}
