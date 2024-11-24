import * as z from "zod";

export const signinFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" }),
});

export const signupFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" }),
  firstname: z
    .string({ required_error: "firstname is required" })
    .min(2, { message: "firstname is required" }),
  lastname: z
    .string({ required_error: "lastname is required" })
    .min(2, { message: "lastname is required" }),
});
