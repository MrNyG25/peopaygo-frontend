"use client"
import { ColumnDef } from '@tanstack/react-table'

import { ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { currencyFormat } from '@/utils/currencyFormat'
import { ClipboardIcon, Pencil1Icon, TimerIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { PaymentPeriod } from './interfaces/PaymentPeriod'


export const columns: ColumnDef<PaymentPeriod>[] = [
  {
    accessorKey: 'note',
    header: 'Note'
  },
  {
    accessorKey: 'start_at',
    header: 'Start At',
    cell: ({ row }) => {
        const date = new Date(row.getValue('start_at'))
        const formatted = date.toLocaleDateString()
        return <div className='font-medium'>{formatted}</div>
    }
  },
  {
    accessorKey: 'end_at',
    header: 'End At',
    cell: ({ row }) => {
        const date = new Date(row.getValue('end_at'))
        const formatted = date.toLocaleDateString()
        return <div className='font-medium'>{formatted}</div>
    }
  },
  {
    accessorKey: 'check_date',
    header: 'Check date',
    cell: ({ row }) => {
        const date = new Date(row.getValue('check_date'))
        const formatted = date.toLocaleDateString()
        return <div className='font-medium'>{formatted}</div>
    }
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
    header: 'Actions',
    cell: ({ row }) => {
      console.log(row)

      const date = new Date(row.getValue('check_date'))
      const checkDateformatted = date.toLocaleDateString()

      const timesheet = row.original
      const id = row.original?.id
      return (
        <>
          <Link href={{
                      pathname: '/dashboard/payment-periods/timesheets',
                      query: { id, check_date: checkDateformatted },
                    }}>
            <Button>
              <ClipboardIcon className="mr-1 h-4 w-4"/> Timesheets
            </Button>
          </Link>
        </>
      )
    }
  }
]
