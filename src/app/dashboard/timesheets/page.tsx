
import { DataTable } from '@/components/DataTable'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PlusIcon } from '@radix-ui/react-icons'
import { columns } from './columns'
import { getTimesheetsByCustomerId } from '@/app/actions/timesheets/timesheetsActions'
import { PaymentFormPeriodDialog } from './components/PaymentPeriodFormDialog'
import { getUserDataServer } from '@/utils/getUserDataServer'


export default async function page() {
  
  let userData = getUserDataServer();
  
  const res = await getTimesheetsByCustomerId(userData.user_id);

  const timesheets = res.data;
  const timesheetsTotal = res.timesheetsTotal;


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
