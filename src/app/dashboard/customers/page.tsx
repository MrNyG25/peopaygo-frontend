import { CustomerResponse } from "./interfaces/CustomersResponse";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "@radix-ui/react-icons";
import { columns } from "./columns";
import { DataTable } from "@/components/DataTable";
import { getCustomers } from "@/app/actions/customers/getCustomers";

export default async function Page() {
  const res = await getCustomers();

  let customers = res.data;

  if(res?.hasError){
    console.log(res)
    customers = []
  }

  return (
    <section>
      <div className="container">
        <h1 className="mb-6 text-3xl font-bold">All customers</h1>
        <Link href="/dashboard/customers/customer-form">
          <Button>
            <PlusIcon className="mr-1 h-4 w-4" />
            Add customer
          </Button>
        </Link>

        <DataTable columns={columns} data={customers ?? []} />

      </div>
    </section>
  );
}

