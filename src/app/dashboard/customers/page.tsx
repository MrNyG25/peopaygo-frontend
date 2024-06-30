
"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { CustomerResponse } from "./interfaces/CustomersResponse";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil1Icon , PlusIcon} from "@radix-ui/react-icons";
import { useCustomers } from "./customers.queries";
import { columns } from "./columns";
import { DataTable } from "@/components/DataTable";
///dashboard/customers/customer-form

export default function page() {

  const { customers } = useCustomers();

  return (
    <section className='py-10'>
    <div className='container'>
      <h1 className='mb-6 text-3xl font-bold'>All customers</h1>
      <Link href={'/dashboard/customers/customer-form'}>
        <Button >
          <PlusIcon className="mr-1 h-4 w-4"/>
          Add customer
        </Button>
      </Link>
      <DataTable
          columns={columns} 
          data={customers ?? []}
      />
    </div>
  </section>
  )
}

