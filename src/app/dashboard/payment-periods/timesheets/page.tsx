'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DataTable } from '@/components/DataTable'
import { columns } from './columns'
import { getTimesheetsByPaymentPeriodId } from '@/app/actions/payment-periods/payment-periods'
import { useSearchParams } from 'next/navigation'


export default function Page({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams()
 
  const id = searchParams.get('id')
  const check_date = searchParams.get('check_date')

  const [timesheets, setTimesheets] = useState([])
  const [timesheetsTotal, setTimesheetsTotal] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTimesheetsByPaymentPeriodId(id)

      if (res?.hasError) {
        setTimesheets([])
        setTimesheetsTotal(0)
      } else {
        setTimesheets(res?.data)
        setTimesheetsTotal(res?.timesheetsTotal)
      }
    }

    fetchData()
  }, [])

  return (
    <section>
      <div className='container'>
        <h1 className='mb-6 text-3xl font-bold'>All timesheets </h1>
        <p>Check date of <span className='font-medium'>{check_date}</span></p>
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
