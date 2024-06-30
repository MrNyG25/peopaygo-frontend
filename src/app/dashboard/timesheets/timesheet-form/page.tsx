import { getEmployeesByCustomerId } from "@/app/actions/employees/employeesActions";
import TimesheetForm from "./components/TimesheetForm";
import { cookies } from 'next/headers'
import { getUserDataServer } from "@/utils/getUserDataServer";


export default async function Page() {
  
  const userData = cookies().get('userData').value
  console.log(userData)

  const res = await getEmployeesByCustomerId(7);

  const employees = res;
  
  return (
    <div className="w-full h-full flex-col justify-center py-10">
      <h1 className='w-2/3 mb-6 text-3xl font-bold mx-auto'>Timesheet form</h1>
      
      <TimesheetForm employees={employees} />
      
    </div>
  );
}
