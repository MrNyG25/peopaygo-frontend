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
import { EmployeeData } from "./interfaces/EmployeeData";
import { SaveEmployeeResponse } from "./interfaces/SaveEmployeeResponse";
import { PlusIcon } from "@radix-ui/react-icons";

const FormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  payment_type_id: z.number({
    message: "Payment type must be a valid ID.",
  }),
  pay_rate: z.number({
    message: "Pay rate must be a number.",
  }),
});

export default function Page() {
  const router = useRouter();

  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      payment_type_id: 1,
      pay_rate: 0,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: EmployeeData): Promise<SaveEmployeeResponse> => {
      if (id) {
        return axios.put(`http://127.0.0.1:8000/api/employees/${id}`, data);
      } else {
        return axios.post('http://127.0.0.1:8000/api/employees', data);
      }
    },
    onSuccess: (data) => {
      toast({
        title: "Message",
        description: (
          <p>{id ? "Employee updated successfully" : "Employee created successfully"}</p>
        ),
      });
      router.push('/dashboard/employees');
    },
    onError: (error) => {
      toast({
        title: "Message",
        description: (
          <p>{id ? "Cannot update employee" : "Cannot create employee"}</p>
        ),
      });
    }
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:8000/api/employees/${id}`)
        .then((response) => {
          form.reset({
            name: response.data.data.name,
            payment_type_id: response.data.data.payment_type_id,
            pay_rate: response.data.data.pay_rate,
          });
        })
        .catch((error) => {
          console.error("Error fetching employee data:", error);
        });
    }
  }, [id, form.reset]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    mutation.mutate({ ...data });
  };

  return (
    <div className="w-full h-full flex justify-center mt-32">
      <Form {...form}>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)();
          }} 
          className="w-2/3 space-y-6">
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
              <FormItem>
                <FormLabel>Payment Type ID</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
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
          {mutation.isPending ? (
            <ButtonLoading />
          ) : (
            <Button type="submit">
              <PlusIcon className="mr-1 h-4 w-4" />
              {id ? "Update Employee" : "Save Employee"}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
