

"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AvatarIcon, FileIcon, PersonIcon } from '@radix-ui/react-icons'
import { usePathname } from 'next/navigation'

  
export function Sidebar() {
  const pathname = usePathname()

  
  return (
    <div className={"pb-12"}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Menu
          </h2>
          <div className="space-y-1">
            <Link href="/dashboard/customers">
              <Button
                  variant="secondary"
                  size="sm"
                  className={`w-full justify-start`}
              >
                <AvatarIcon className="mr-2 h-4 w-4"/>
                  Customers
              </Button>
            </Link>
            <Link href="/dashboard/employees">
              <Button
                  variant="secondary"
                  size="sm"
                  className="w-full justify-start"
              >
                <PersonIcon className="mr-2 h-4 w-4"/>
                  Employees
              </Button>
            </Link>
            <Link href="/dashboard/timesheets">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <FileIcon className="mr-2 h-4 w-4"/>
                Timesheets
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Radio
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
