"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
 
interface Props{
  showDialogP: boolean;
}
export function CustomDialog() {

  
  const [isOpen, setIsOpen] = useState(false)

 /*  useEffect(() => {

    setShowDialog(showDialogP)
    
  }, []) */
  
  
  
  
  return (
    <>
   {/*  <Button onClick={() => setIsOpen(!isOpen)} variant="outline">Share</Button> */}

    <Dialog >
      <DialogTrigger  asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent  className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
         ff
        </div>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  )
}