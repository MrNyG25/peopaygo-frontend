"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ButtonLoading } from "@/components/ButtonLoading";
import { PlusIcon } from "@radix-ui/react-icons";
import { TimesheetData } from "./interfaces/TimesheetData";
import { SaveTimesheetResponse } from "./interfaces/SaveTimesheetResponse";
import { useEmployees, useSaveTimesheet, useTimesheet } from "./timesheet-form.queries";
import { Combobox } from "@/components/Combobox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define the form validation schema using Zod
const FormSchema = z.object({
  employee_id: z.number({
    message: "Employee ID must be a valid number.",
  }),
  payment_type: z.string(),
  amount: z.number({
    message: "Amount must be a valid number.",
  }),
  note: z.string().optional(),
});

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const id = searchParams.get('id')


  const { mutate, isPending } = useSaveTimesheet(+id!);
  const { timesheet, isSuccess } = useTimesheet(+id!);
  const { employees , isSuccessEmployees} = useEmployees();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      employee_id: undefined,
      payment_type: "",
      amount: 0,
      note: "",
    },
  });
  

  useEffect(() => {
    if(isSuccess){
        console.log(timesheet)
        form.reset({
            employee_id: timesheet?.employee_id,
            amount: timesheet?.amount || 0,
            note: timesheet?.note || '',
        });
    }
  }, [timesheet]);

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if(name == "employee_id"){
        let employee = employees?.find(employee => employee.id == value.employee_id);
        console.log(employee)
        console.log(value, name, type)
      }
    })
    return () => subscription.unsubscribe()
  }, [form.watch])
  

  // Handle form submission
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data)
    mutate({ ...data });
  };

  return (
    <div className="w-full h-full flex-col justify-center py-10">
      <h1 className='w-2/3 mb-6 text-3xl font-bold mx-auto'>Timesheet form</h1>
      <Form {...form}>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)();
          }} 
          className="w-2/3 space-y-6 mx-auto">
          <FormField
            control={form.control}
            name="employee_id"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Employee</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an employee" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                       isSuccessEmployees && employees?.map(employee => (
                          <SelectItem key={employee.id} value={employee.id.toString()}>{employee.name}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="payment_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment type</FormLabel>
                <FormControl>
                  <Input disabled={true}  {...field}  value={"hours"}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
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
          {isPending ? (
            <ButtonLoading />
          ) : (
            <Button type="submit">
              <PlusIcon className="mr-1 h-4 w-4" />
              {id ? "Update Timesheet" : "Save Timesheet"}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
