"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, CountdownTimerIcon } from "@radix-ui/react-icons";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ButtonLoading } from "@/components/ButtonLoading";
import { Timesheet } from "../interfaces/TimesheetsResponse";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { updateTimesheetAmount } from "@/app/actions/timesheets/timesheetsActions";
import { useRouter } from "next/navigation";

interface Props {
    timesheet: Timesheet;
}

// Define the form validation schema using Zod
const FormSchema = z.object({
  amount: z.string({
    message: "Amount must be integer",
  }).min(1, {
    message: "Amount is required.",
  }),
});

export function TimesheetAmountFormDialog({timesheet}) {

  const { toast } = useToast();
  const router = useRouter();

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        amount: ""
    },
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log({timesheet})
    console.log(data);
    setIsSaving(true);


    let res = await updateTimesheetAmount(timesheet.id, data);

    if (res?.hasError) {
      toast({
        variant: 'destructive',
        title: "Message",
        description: (
          <p>Cannot update amount</p>
        ),
      });
      setIsSaving(false);
      return;
    }

    toast({
      title: "Message",
      description: (
        <p>Timesheet updated successfully</p>
      ),
    });

    setIsSaving(false);
    setIsOpen(false)
    router.refresh()
  };
 
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button  className="ml-3" variant="outline">
            <CountdownTimerIcon className="mr-1 h-4 w-4" />
            Update hours 
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Amount update </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit(onSubmit)();
              }}
              className="w-2/3 space-y-6 mx-auto"
            >
             
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add amount hours</FormLabel>
                    <FormControl>
                        <Input 
                            type="number" 
                            placeholder="Note" 
                            {...field} 
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
             
              {isSaving ? (
                <ButtonLoading />
              ) : (
                <Button className="mx-auto" type="submit">
                  <PlusIcon className="mr-1 h-4 w-4" />
                  Save hours
                </Button>
              )}
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
