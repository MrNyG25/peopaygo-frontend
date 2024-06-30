import { getEmployeesByClientId } from "@/app/actions/employees/employeesActions";
import TimesheetForm from "./components/TimesheetForm";

export default async function Page() {
  const employees = await getEmployeesByClientId(1);
  
  return (
    <div className="w-full h-full flex-col justify-center py-10">
      <h1 className='w-2/3 mb-6 text-3xl font-bold mx-auto'>Timesheet form</h1>
      <TimesheetForm employees={employees} />
    </div>
  );
}
