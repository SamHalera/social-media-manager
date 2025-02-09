"use client";

import { createOrEditCampaign } from "@/actions/campaign";
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
import { createCampaignSchema } from "@/types/zodSchemas/campaignSchemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { Campaign } from "@prisma/client";
import clsx from "clsx";

import React, { SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const CreateCampaignForm = ({
  setOpen,
  setRefresh,
  campaign,
}: {
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  campaign?: Campaign;
}) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof createCampaignSchema>>({
    resolver: zodResolver(createCampaignSchema),
    defaultValues: {
      id: campaign ? campaign.id : 0,
      name: campaign ? campaign.name : "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof createCampaignSchema>> = async (
    values: z.infer<typeof createCampaignSchema>
  ) => {
    try {
      let response:
        | { error: string; succes?: undefined }
        | { succes: string; error?: undefined } = {
        succes: "success",
        error: undefined,
      };

      response = await createOrEditCampaign(values);
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
                  Campaign ID{" "}
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
                  Campaign name{" "}
                  <FormMessage className="italic text-xs font-semibold" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Give a name for your campaign"
                    className={clsx({
                      "border-red-400": form.formState.errors.name,
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
            {campaign ? "Edit" : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCampaignForm;
