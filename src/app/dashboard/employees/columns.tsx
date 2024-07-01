'use client'

import { ColumnDef } from '@tanstack/react-table'

import { MoreHorizontal, ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { currencyFormat } from '@/utils/currencyFormat'
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { CustomDialog } from '@/components/CustomDialog'
import { Employee } from './interfaces/EmployeeResponse'


export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'pay_rate',
    header: 'Pay rate',
    cell: ({ row }) => {
      const formatted = currencyFormat(row.getValue('pay_rate'))
      return <div className='font-medium'>{formatted}</div>
    }
  },
  {
    accessorKey: 'payment_type.name',
    header: 'Payment type',
  },
  {
    accessorKey: 'created_at',
    header: 'Created at',
    cell: ({ row }) => {
      const date = new Date(row.getValue('created_at'))
      const formatted = date.toLocaleDateString()
      return <div className='font-medium'>{formatted}</div>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const timesheet = row.original
      const id = row.original?.id
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={{
                    pathname: '/dashboard/employees/employee-form',
                    query: { id },
                  }}>
                <DropdownMenuItem>
                  <Pencil1Icon className="mr-1 h-4 w-4"/> Edit
                </DropdownMenuItem>
            </Link>

            <DropdownMenuItem onClick={() => console.log(id)}>
              <TrashIcon className="mr-1 h-4 w-4"/> Delete
            </DropdownMenuItem>
              
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
