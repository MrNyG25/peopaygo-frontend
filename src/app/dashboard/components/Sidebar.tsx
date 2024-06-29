

"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AvatarIcon, PersonIcon } from '@radix-ui/react-icons'
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
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Browse
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Radio
            </Button>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Library
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Playlists
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Songs
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Made for You
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Artists
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Albums
            </Button>
          </div>
        </div>
        <div className="py-2">
          <h2 className="relative px-6 text-lg font-semibold tracking-tight">
            Playlists
          </h2>
        </div>
      </div>
    </div>
  )
}
