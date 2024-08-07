"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

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
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { ButtonLoading } from "@/components/ButtonLoading";
import { LoginData } from "./interfaces/LoginData";
import { LoginResponse } from "./interfaces/LoginResponse";
import { setCookie } from 'cookies-next';

const FormSchema = z.object({
  email: z.string().email({
    message: "Email must be a valid.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function page() {

  const router = useRouter();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (data: LoginData): Promise<LoginResponse> => {
      return axios.post('http://127.0.0.1:8000/api/login', data)
    },
    onSuccess: (data) => {
      setCookie(
        'userData', 
        JSON.stringify(data!.data)
      );
      router.push('/dashboard');
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: "Message",
        description: (
          <p>Email or password invalid</p>
        ),
      });
    }
  })



  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "beatty.alexis@example.com",
      password: "password123"
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const {email, password} = data;
    mutation.mutate({email, password})
  }


  return (
    <div className="w-full h-full flex justify-center mt-80">
      <div className="flex flex-col justify-center items-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
        <Form  {...form}>
          <form 
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit(onSubmit)()
            }} 
            className="w-2/3 space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            {
              mutation.isPending 
                ? <ButtonLoading /> 
                : <Button type="submit">Login</Button>
            }
          </form>
        </Form>
      </div>
    </div>
  );
}
