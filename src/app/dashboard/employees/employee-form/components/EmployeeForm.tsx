"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { createEmployee, getEmployeeById, updateEmployee } from "@/app/actions/employees/employeesActions";
import { PaymentType } from "../interfaces/PaymentType";

const FormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  payment_type_id: z.string().min(1, {
    message: "Payment type is required.",
  }),
  pay_rate: z.string().min(1, {
    message: "Pay rate is required.",
  })
}).refine((data) => !(Number(data.pay_rate) < 480 && data.payment_type_id == "2"), {
  message: "All employees in the state of Florida must be paid min $480 per check",
  path: ["pay_rate"],
});

export default function EmployeeForm({paymentTypes}: any) {


    const router = useRouter();

  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [selectedPaymentType, setSelectedPaymentType] = useState<PaymentType | null>(null)



  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      payment_type_id: "",
      pay_rate: "",
    },
  });


  useEffect(() => {
  
    if (id) {
      getEmployeeByIdF(id);
    }
  }, [id]);

  const getEmployeeByIdF = async (id: any) => {
    let data =  await getEmployeeById(id)
    console.log(data)

    setSelectedPaymentType({
        id: data.payment_type.id,
        name: data.payment_type.name
    })

    form.reset({
      name: data.name, 
      payment_type_id: String(data.payment_type.id),
      pay_rate: String(data.pay_rate)
    });
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data)
    setIsSaving(true);

    let res: any = null;

    let dataObj = {
        ...data,
        customer_id: 1
    }
    if(id){
      res = await updateEmployee(+id!,dataObj);
    }else{
      res = await createEmployee(dataObj);
    }

    if(res?.hasError){
      toast({
        variant: 'destructive',
        title: "Message",
        description: (
          <p>Cannot {id ? "update" : "create"} employee</p>
        ),
      });
      setIsSaving(false);
      return; 
    }

    toast({
      title: "Message",
      description: (
        <p>{id ? "Customer updated successfully" : "Employee created successfully"}</p>
      ),
    });

    setIsSaving(false);
    router.push('/dashboard/employees');
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
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="payment_type_id"
        render={({ field }) => (
            <FormItem className="flex flex-col">
                <FormLabel>Employee</FormLabel>
                  <Select 
                    value={field.value?.toString()}
                  onValueChange={(value) => {
                    field.onChange(value);
                    let paymentType = paymentTypes?.find((paymentType: any) => paymentType.id == value);
                    setSelectedPaymentType({
                      id: paymentType.id,
                      name: paymentType.name,
                    })
                    field.onChange(value);
                  }}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an payment type">
                          {selectedPaymentType?.name} {' '}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                        
                    <SelectContent>
                      {
                        paymentTypes?.map((paymentType: any) => (
                          <SelectItem key={paymentType.id} value={paymentType.id.toString()}>{paymentType.name}</SelectItem>
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
        name="pay_rate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pay Rate</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
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
          {id ? "Update Employee" : "Save Employee"}
        </Button>
      )}
    </form>
  </Form>
  )
}

