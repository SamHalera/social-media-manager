import { z } from "zod";

export const transactionFormSchema = z.object({
  id: z.number(),
  walletId: z.number(),
  label: z
    .string()
    .min(1, { message: "Label for your transaction is required" }),
  type: z.string().min(1, { message: "Type for your transaction is required" }),
  date: z.date({ required_error: "Date field is required" }),

  // amount: z
  //   .string()
  //   .transform((val) => parseFloat(val))
  //   .refine((val) => !isNaN(val), { message: "Invalid number" }),
  amount: z
    .string()
    .min(1, { message: "Balance is required" })
    .refine((val) => val.search(/\D/) === -1, {
      message: "Only positive numbers",
    }),
  transactionStatus: z.string(),
  paymentMethod: z
    .string()
    .min(1, { message: "A payment method for your transaction is required" }),
});
