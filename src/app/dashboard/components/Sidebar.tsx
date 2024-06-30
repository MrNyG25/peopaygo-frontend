

"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AvatarIcon, ExitIcon, FileIcon, PersonIcon } from '@radix-ui/react-icons'
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { getUserDataClient } from "@/utils/getUserDataClient";
  
export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter();

  const userData = getUserDataClient();

  const handleLogout = () => {
    deleteCookie(
      'userData' 
    );
    router.push('/login');
  }


  let ROLE =  userData?.role_name;

  if(!userData){
    return <p>Loading...</p>
  }

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
                  variant={pathname == "/dashboard/customers" ? "secondary" : "ghost"}
                  size="sm"
                  className={`w-full justify-start`}
              >
                <AvatarIcon className="mr-2 h-4 w-4"/>
                  Customers
              </Button>
            </Link>
            {
               ROLE == "customer" ?
                <>
                <Link href="/dashboard/employees">
                  <Button
                      variant={pathname == "/dashboard/employees" ? "secondary" : "ghost"}
                      size="sm"
                      className="w-full justify-start"
                  >
                    <PersonIcon className="mr-2 h-4 w-4"/>
                      Employees
                  </Button>
                </Link>
                <Link href="/dashboard/timesheets">
                  <Button 
                    variant={pathname == "/dashboard/timesheets" ? "secondary" : "ghost"}
                    size="sm" 
                    className="w-full justify-start"
                  >
                    <FileIcon className="mr-2 h-4 w-4"/>
                    Timesheets
                  </Button>
                </Link>
                </>
             : null
            }
            

  

            <Button onClick={handleLogout} variant="ghost" size="sm" className="w-full justify-start">
              <ExitIcon className="mr-2 h-4 w-4"/>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
