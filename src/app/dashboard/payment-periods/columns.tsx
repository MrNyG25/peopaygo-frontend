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
  },
  {
    accessorKey: 'end_at',
    header: 'End At',
  },
  {
    accessorKey: 'check_date',
    header: 'Check date',
  },
  {
    accessorKey: 'created_at',
    header: 'Created at',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      
      const paymentPeriod = row.original
      const paymentPeriodCheckDate = row.original.check_date
      const id = row.original?.id
      return (
        <>
          <Link href={{
                      pathname: '/dashboard/payment-periods/timesheets',
                      query: { id, check_date:  paymentPeriodCheckDate},
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
