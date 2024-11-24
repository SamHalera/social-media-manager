"use client";
import { createOrEditTransaction } from "@/actions/transaction";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { transactionFormSchema } from "@/types/zodSchemas/transactionSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

import React, { SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";
import dayjs from "dayjs";

const CreateOrEditForm = ({
  setOpen,
  setRefresh,
  data,
  walletId,
}: {
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  data?: TransactionProps;
  walletId: number;
}) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      id: data?.id ?? 0,
      label: data?.label ?? "",
      type: data ? data.type : "EXPENSE",
      date: data?.date ?? new Date(),
      amount: data?.amount.toString() ?? "0",
      transactionStatus: data?.transactionStatus ?? "",
      paymentMethod: data?.paymentMethod ?? "",
      walletId,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof transactionFormSchema>> = async (
    values: z.infer<typeof transactionFormSchema>
  ) => {
    try {
      const response = await createOrEditTransaction(values);

      if (response.success) {
        toast({
          variant: "default",
          description: response.success,
        });
        setRefresh(true);
        setOpen(false);
      }
      if (response.error) {
        toast({
          variant: "destructive",
          description: response.error,
        });
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        description: error.message,
      });
    }
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            name="id"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">
                  Transaction ID{" "}
                  <FormMessage className="italic text-xs font-semibold" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    disabled={true}
                    className={clsx("bg-slate-200", {
                      "border-red-400": form.formState.errors.id,
                    })}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="label"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">
                  Transaction label{" "}
                  <FormMessage className="italic text-xs font-semibold" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Give a label for your transaction"
                    className={clsx({
                      "border-red-400": form.formState.errors.label,
                    })}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="type"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">
                  Transaction type{" "}
                  <FormMessage className="italic text-xs font-semibold" />
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a transaction type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="EXPENSE">expense</SelectItem>
                    <SelectItem value="INCOME">income</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            name="transactionStatus"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">
                  Transaction status{" "}
                  <FormMessage className="italic text-xs font-semibold" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    disabled={true}
                    className={clsx("bg-slate-200", {
                      "border-red-400": form.formState.errors.id,
                    })}
                    value={field.value.toLowerCase()}
                  />
                </FormControl>
                {/* <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a transaction status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="PAST">Past</SelectItem>
                    <SelectItem value="UPCOMING">Upcoming</SelectItem>
                  </SelectContent>
                </Select> */}
              </FormItem>
            )}
          />
          <FormField
            name="paymentMethod"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">
                  Payment Method{" "}
                  <FormMessage className="italic text-xs font-semibold" />
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a payment method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="CARD">card</SelectItem>
                    <SelectItem value="CASH">cash</SelectItem>
                    <SelectItem value="CHEQUE">cheque</SelectItem>
                    <SelectItem value="TRANSFERT_PAYMENT">
                      transfert payment
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            name="date"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">
                  Transaction date{" "}
                  <FormMessage className="italic text-xs font-semibold" />
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={clsx(
                        "w-[280px] justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        dayjs(field.value).format("DD/MM/YYYY")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      disabled={(date) => date < new Date("1970-01-01")}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <FormField
            name="amount"
            control={form.control}
            render={({ field }) => {
              console.log("field==>", field.value);
              return (
                <FormItem>
                  <FormLabel className="flex gap-2">
                    Transaction amount{" "}
                    <FormMessage className="italic text-xs font-semibold" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Give an amount"
                      className={clsx({
                        "border-red-400": form.formState.errors.amount,
                      })}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <Button
            className="self-end"
            variant={"default"}
            disabled={!form.formState.isDirty}
          >
            {data ? "Edit" : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateOrEditForm;
