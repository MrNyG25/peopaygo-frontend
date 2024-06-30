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
import { Pencil1Icon, TimerIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { CustomDialog } from '@/components/CustomDialog'

export type Timesheet = {
  id: number
  employee: string
  amount: number
  note: string
  total: number
  timesheet_status: string
}

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
                    pathname: '/dashboard/timesheets/timesheet-form',
                    query: { id },
                  }}>
                <DropdownMenuItem>
                  <Pencil1Icon className="mr-1 h-4 w-4"/> Edit
                </DropdownMenuItem>
            </Link>
            
            <Link href={{
                    pathname: '/dashboard/timesheets/timesheet-form',
                    query: { id },
                  }}>
                <DropdownMenuItem>
                  <TimerIcon className="mr-1 h-4 w-4"/> Amount Edit
                </DropdownMenuItem>
            </Link>
              
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
