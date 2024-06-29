"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { useMutation, useQuery } from "@tanstack/react-query";

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
import { ButtonLoading } from "@/components/ui/ButtonLoading";
import { CustomerData } from "./interfaces/CustomerData";
import { SaveCustomerResponse } from "./interfaces/SaveCustomerResponse";
import { PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  name: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Email must be a valid.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  password_confirmation: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ["password_confirmation"],
});

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const { toast } = useToast();


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    },
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:8000/api/customers/${id}`).then((response) => {
        form.reset({
          name: response.data.data.name,
          email: response.data.data.user.email,
          password: "", // reset passwords for security
          password_confirmation: ""
        });
      });
    }
  }, [id]);

  const mutation = useMutation({
    mutationFn: (data: CustomerData): Promise<SaveCustomerResponse> => {
      if (id) {
        return axios.put(`http://127.0.0.1:8000/api/customers/${id}`, data);
      }
      return axios.post('http://127.0.0.1:8000/api/customers', data);
    },
    onSuccess: (data) => {
      toast({
        title: "Message",
        description: (
          <p>{id ? "Customer updated successfully" : "Customer created successfully"}</p>
        ),
      });
      router.push('/dashboard/customers');
    },
    onError: (error) => {
      toast({
        title: "Message",
        description: (
          <p>Cannot {id ? "update" : "create"} customer</p>
        ),
      });
    }
  });


  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    mutation.mutate({...data});
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password confirmation</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {mutation.isPending ? <ButtonLoading /> : (
            <Button type="submit">
              <PlusIcon className="mr-1 h-4 w-4" />
              {id ? "Update customer" : "Save customer"}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
