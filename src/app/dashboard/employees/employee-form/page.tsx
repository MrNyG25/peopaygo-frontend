import { getPaymentTypes } from "@/app/actions/payment-types/getPaymentTypes";
import EmployeeForm from "./components/EmployeeForm";

export default async function Page() {
  let paymentTypes = await getPaymentTypes();

  return (
    <div className="w-full h-full flex-col justify-center my-10">
      <h1 className='w-2/3 mb-6 text-3xl font-bold mx-auto'>Employee form</h1>
      <EmployeeForm paymentTypes={paymentTypes}/>
    </div>
  );
}
