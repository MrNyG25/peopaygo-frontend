"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createTimesheet, getTimesheetById, updateTimesheet } from "@/app/actions/timesheets/timesheetsActions";
import { Employee } from "../interfaces/EmployeesResponse";


// Define the form validation schema using Zod
const FormSchema = z.object({
    employee_id: z.string({
        message: "Employee ID must be a valid number.",
    }),
    payment_type: z.string(),
    amount: z.string({
        message: "Amount must be a valid number.",
    }),
    note: z.string().optional(),
}).refine((data) => !(Number(data.amount) < 12 && data.payment_type == "hour"), {
  message: "All employees in the state of Florida must be paid min $12",
  path: ["amount"],
});


export default function TimesheetForm({employees}: any){
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        employee_id: undefined,
        payment_type: "",
        amount: "",
        note: "",
      },
    });

    useEffect(() => {
      if (id) {
        getCustomerByIdFn(id);
      }
    }, [id]);
  
    const getCustomerByIdFn = async (id: any) => {
      let data =  await getTimesheetById(id)
      setSelectedEmployee({
        id: data.employee.id,
        name: data.employee.name,
      })
      form.reset({
        payment_type: data.employee.payment_type.name, 
        amount: data.amount || '', 
        note: data.note || '',
      
      });
    }

    const paymentType = useWatch({
        control: form.control,
        name: "payment_type",
    });
    
  
    useEffect(() => {
      const subscription = form.watch((value, { name }) => {
        if(name == "employee_id"){
          let employee = employees?.find((employee: any) => employee.id == value.employee_id);
          setSelectedEmployee({
            id: employee.id,
            name: employee.name,
          })

          let {amount} = form.getValues()
          let amountNew = amount || '';
          if(employee.payment_type.name == "salary"){
            amountNew = '';
          }

          form.reset({
            ...value,
            payment_type: employee.payment_type.name,
            amount: amountNew
          })
        }
      })
      return () => subscription.unsubscribe()
    }, [form.watch])
    
  

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log(data)
      setIsSaving(true)

      let res: any = null;

      if(id){
        res = await updateTimesheet(+id!,data);
      }else{
        res = await createTimesheet(data);
      }

      if(res?.hasError){
        toast({
          variant: 'destructive',
          title: "Message",
          description: (
            <p>Cannot {id ? "update" : "create"} timesheet</p>
          ),
        });
        setIsSaving(false);
        return; 
      }

      toast({
        title: "Message",
        description: (
          <p>{id ? "Timesheet updated successfully" : "Timesheet created successfully"}</p>
        ),
      });
  
      setIsSaving(false);
      router.push('/dashboard/timesheets');
    };

  return (
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
                  <Select 
                   value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    let employee = employees?.find((employee: any) => employee.id == value);
                    setSelectedEmployee({
                      id: employee.id,
                      name: employee.name,
                    })
                    field.onChange(value);
                  }}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an Employee">
                          {selectedEmployee?.name} {' '}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        employees?.map((employee: any) => (
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
                  <Input disabled={true}  {...field} />
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
                  <Input  disabled={paymentType == "salary"} type="number" {...field} />
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
              {id ? "Update Timesheet" : "Save Timesheet"}
            </Button>
          )}
        </form>
      </Form>
  )
}
