"use client";
import { createWallet, editWallet } from "@/actions/wallet";

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
import { useToast } from "@/hooks/use-toast";
import { createWalletSchema } from "@/types/zodSchemas/walletSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

import React, { SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const CreateWalletForm = ({
  setOpen,
  setRefresh,
  wallet,
}: {
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  wallet?: WalletProps;
}) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof createWalletSchema>>({
    resolver: zodResolver(createWalletSchema),
    defaultValues: {
      id: wallet ? wallet.id : 0,
      name: wallet ? wallet.name : "",
      balance: wallet ? wallet.balance.toString() : "0",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof createWalletSchema>> = async (
    values: z.infer<typeof createWalletSchema>
  ) => {
    try {
      let response:
        | { error: string; succes?: undefined }
        | { succes: string; error?: undefined } = {
        succes: "success",
        error: undefined,
      };
      if (wallet) {
        response = await editWallet(values);
      } else {
        response = await createWallet(values);
      }
      if (response.succes) {
        toast({
          variant: "default",
          description: response.succes,
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
                  Wallet ID{" "}
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
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">
                  Wallet name{" "}
                  <FormMessage className="italic text-xs font-semibold" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Give a name for your wallet"
                    className={clsx({
                      "border-red-400": form.formState.errors.name,
                    })}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="balance"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">
                  Wallet balance{" "}
                  <FormMessage className="italic text-xs font-semibold" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="string"
                    placeholder="Give an amount or put 0"
                    className={clsx({
                      "border-red-400": form.formState.errors.balance,
                    })}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            className="self-end"
            variant={"default"}
            disabled={!form.formState.isDirty}
          >
            {wallet ? "Edit" : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateWalletForm;
