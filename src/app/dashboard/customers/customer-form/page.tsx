"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSearchParams } from 'next/navigation'

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
import { useRouter } from "next/navigation";
import { createCustomer, getCustomerById } from "@/app/actions/customers/customerActions";
import { useEffect, useState } from "react";

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
  const { toast } = useToast();
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [isSaving, setIsSaving] = useState<boolean>(false)



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
      getCustomerByIdFn(id);
    }
  }, [id]);

  const getCustomerByIdFn = async (id: any) => {
    let data =  await getCustomerById(id)
    form.reset({
      name: data.name, 
      email: data.user.email, 
    });
  }


  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSaving(true);

    let res = await createCustomer(data);

    if(res?.hasError){
      toast({
        variant: 'destructive',
        title: "Message",
        description: (
          <p>Cannot {id ? "update" : "create"} customer</p>
        ),
      });
      setIsSaving(false);
      return; 
    }

    toast({
      title: "Message",
      description: (
        <p>{id ? "Customer updated successfully" : "Customer created successfully"}</p>
      ),
    });

    setIsSaving(false);
    router.push('/dashboard/customers');
  };

  return (
    <div className="w-full h-full flex-col justify-center my-10">
      <h1 className='w-2/3 mb-6 text-3xl font-bold mx-auto'>Employee form</h1>
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
                  <Input type="text" placeholder="Pepe" {...field} />
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
                  <Input placeholder="test@mail.com" {...field} />
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
          {isSaving ? <ButtonLoading /> : (
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
