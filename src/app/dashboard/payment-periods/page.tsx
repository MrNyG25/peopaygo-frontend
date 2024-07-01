
import { DataTable } from '@/components/DataTable'
import { Button } from '@/components/ui/button'
import { columns } from './columns'
import { getUserDataServer } from '@/utils/getUserDataServer'
import { getPaymentPeriodsByCustomerId } from '@/app/actions/payment-periods/payment-periods'


export default async function page() {
  
  let userData = getUserDataServer();

  const res = await getPaymentPeriodsByCustomerId(userData.user.customer.id);
  
  let paymentPeriods = res?.data;

  if(res?.hasError){
    paymentPeriods = []
  }
  
  return (
    <section >
      <div className='container'>
        <h1 className='mb-6 text-3xl font-bold'>All checkes</h1>
        <DataTable 
            columns={columns} 
            data={paymentPeriods ?? []}
        />
      </div>
    </section>
  )
}
