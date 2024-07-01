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
import { PlusIcon, FileTextIcon } from "@radix-ui/react-icons";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ButtonLoading } from "@/components/ButtonLoading";
import { createPaymentPeriod } from "@/app/actions/payment-periods/payment-periods";
import { useRouter } from "next/navigation";
import { set } from "date-fns";

interface Props {
  timesheetsIds: Number[];
}

// Define the form validation schema using Zod
const FormSchema = z.object({
  start_at: z.string({ message: "Start date and time are required." }).min(1, {
    message: "Start date must be filled.",
  }),
  end_at: z.string({ message: "End date and time are required." }).min(1, {
    message: "End date must be filled.",
  }),
  check_date: z.string({ message: "Check date is required." }).min(1, {
    message: "Check date must be filled.",
  }),
  note: z.string({ message: "Note is required." }).min(1, {
    message: "Note must be at least 1 characters.",
  }),
});

export function PaymentFormPeriodDialog({timesheetsIds}: Props) {

  const { toast } = useToast();
  const router = useRouter();

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      start_at: "",
      end_at: "",
      check_date: "",
      note: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    let dataObj = {
      ...data,
      timesheet_ids: timesheetsIds
    }
    console.log(dataObj);
    setIsSaving(true);


    let res = await createPaymentPeriod(dataObj);

    if (res?.hasError) {
      toast({
        variant: 'destructive',
        title: "Message",
        description: (
          <p>Cannot create checke</p>
        ),
      });
      setIsSaving(false);
      return;
    }

    toast({
      title: "Message",
      description: (
        <p>Checke created successfully</p>
      ),
    });

    setIsOpen(false)
    router.refresh()
    setIsSaving(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="ml-3" variant="outline">
            {" "}
            <FileTextIcon className="mr-1 h-4 w-4" />
            Generate checke
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create checke</DialogTitle>
            <DialogDescription>
              All timesheets will be send to pay provider
            </DialogDescription>
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
                name="start_at"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start At</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Start At"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_at"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End At</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="End At"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="check_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Check Date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Note" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isSaving ? (
                <ButtonLoading />
              ) : (
                <Button type="submit">
                  <PlusIcon className="mr-1 h-4 w-4" />
                  Save check
                </Button>
              )}
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
