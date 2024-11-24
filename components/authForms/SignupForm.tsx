"use client";
import { signupFormSchema } from "@/types/zodSchemas/authSchemas";
import React from "react";
import { signIn } from "next-auth/react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import logoGoogle from "@/public/images/google_logo.svg";
import { registerUser } from "@/actions/user";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    console.log(values);
    try {
      const response = await registerUser(values);
      if (response?.success) {
        const signInData = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });
        if (signInData?.error) {
          toast({
            variant: "destructive",
            title: "Bad news!",
            description: response.error,
          });
        } else {
          toast({
            variant: "default",
            title: "Welcome!",
            description: response.success,
          });
          router.push("/");
        }
      }
      if (response?.error) {
        toast({
          variant: "destructive",
          title: "Bad news!",
          description: response.error,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="p-8 ">
      <h1>Sign Up</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-center mx-auto flex-col gap-8 w-2/3"
        >
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Firstname</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Your firstname"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Lastname</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Your lastname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="meail here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button className="self-center">Sign up</Button>
          <Button
            type="button"
            className="w-fit my-1 self-center"
            onClick={() => {
              signIn("google", { callbackUrl: "/" });
            }}
            size="lg"
            variant="outline"
          >
            <img
              src={logoGoogle.src}
              alt="Google logo"
              // className="mr-2"
              height={30}
              width={30}
            />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
