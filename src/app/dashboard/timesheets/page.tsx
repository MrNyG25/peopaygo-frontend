
"use client"

import { DataTable } from '@/components/DataTable'
import { useTimesheets } from './timesheets.queries'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PlusIcon } from '@radix-ui/react-icons'
import { columns } from './columns'


export default function page() {
  const { timesheets, timesheetsTotal } = useTimesheets()

  return (
    <section className='py-10'>
      <div className='container'>
        <h1 className='mb-6 text-3xl font-bold'>All timesheets</h1>
        <Link href={'/dashboard/timesheets/timesheet-form'}>
          <Button >
            <PlusIcon className="mr-1 h-4 w-4"/>
            Add timesheet
          </Button>
        </Link>
        <DataTable 
            columns={columns} 
            data={timesheets ?? []}
            showTotalFooter={true}
            colSpanTotalFooter={3}
            totalFooterValue={timesheetsTotal}
        />
      </div>
    </section>
  )
}
