"use client"
import { ColumnDef } from '@tanstack/react-table'

import { ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { currencyFormat } from '@/utils/currencyFormat'
import { Pencil1Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { Timesheet } from '../../timesheets/interfaces/TimesheetsResponse'



export const columns: ColumnDef<Timesheet>[] = [
  {
    accessorKey: 'employee.name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Employee
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'employee.payment_type.name',
    header: 'Payment type'
  },
  {
    accessorKey: 'amount',
    header: 'Amount'
  },
  {
    accessorKey: 'note',
    header: 'Note'
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => {
        const formatted = currencyFormat(row.getValue('total'))
        return <div className='font-medium'>{formatted}</div>
    }
  },
  {
    accessorKey: 'timesheet_status.name',
    header: 'Timesheet Status'
  },
  /* {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      console.log(row)
      const timesheet = row.original
      const id = row.original?.id
      return (
        <>
          <Link href={{
                      pathname: '/dashboard/timesheets/timesheet-form',
                      query: { id },
                    }}>
            <Button>
              <Pencil1Icon className="mr-1 h-4 w-4"/> Edit
            </Button>
          </Link>
        </>
      )
    }
  } */
]
