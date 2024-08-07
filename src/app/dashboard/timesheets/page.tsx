
import { DataTable } from '@/components/DataTable'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PlusIcon } from '@radix-ui/react-icons'
import { columns } from './columns'
import { PaymentFormPeriodDialog } from './components/PaymentPeriodFormDialog'
import { getUserDataServer } from '@/utils/getUserDataServer'
import { getTimesheetsByCustomerId } from '@/app/actions/timesheets/getTimesheetsByCustomerId'


export default async function page() {
  
  let userData = getUserDataServer();

  
  const res = await getTimesheetsByCustomerId(userData.user.customer.id);
  
  let timesheets = res?.data;
  let timesheetsTotal = res?.timesheetsTotal;

  if(res?.hasError){
    console.log(res)
    timesheets = []
    timesheetsTotal = 0
  }
  
  return (
    <section >
      <div className='container'>
        <h1 className='mb-6 text-3xl font-bold'>All timesheets</h1>
        <Link href={'/dashboard/timesheets/timesheet-form'}>
          <Button >
            <PlusIcon className="mr-3 h-4 w-4"/>
            Add timesheet
          </Button>
        </Link>
        <PaymentFormPeriodDialog timesheetsIds={timesheets.map((timesheet: any) => timesheet.id)} />
        <DataTable 
            columns={columns} 
            data={timesheets ?? []}
            showTotalFooter={true}
            colSpanTotalFooter={4}
            totalFooterValue={timesheetsTotal}
        />
      </div>
    </section>
  )
}
