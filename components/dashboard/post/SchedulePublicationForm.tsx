"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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
import { postSchema, schedulePostSchema } from "@/types/zodSchemas/postSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

import React, { SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { CampaignProps, PostProps } from "@/types/types";
import { Post } from "@prisma/client";
import {
  createOrEditPost,
  deletePost,
  schedulePublicationPost,
} from "@/actions/post";
import AlertDeleteAction from "@/components/AlertDeleteAction";

const SchedulePublicationForm = ({
  setOpen,
  setRefresh,
  data,
  campaignId,
}: {
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
  setOpen?: React.Dispatch<SetStateAction<boolean>>;
  data?: PostProps;
  campaignId: number;
}) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof schedulePostSchema>>({
    resolver: zodResolver(schedulePostSchema),
    defaultValues: {
      id: data?.id,
      publicationDate: data?.publicationDate ?? undefined,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof schedulePostSchema>> = async (
    values: z.infer<typeof schedulePostSchema>
  ) => {
    try {
      const response = await schedulePublicationPost(values);

      if (response.success) {
        toast({
          variant: "default",
          description: response.success,
        });
        setRefresh(true);
        if (setOpen) setOpen(false);
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
          className="flex flex-col gap-4 w-full"
        >
          <FormField
            name="id"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="hidden"
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
            name="publicationDate"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">
                  Publication date{" "}
                  <FormMessage className="italic text-xs font-semibold" />
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={clsx(
                        "w-full justify-start text-left font-normal",
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
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <Button
            className="self-end"
            variant={"default"}
            disabled={!form.formState.isDirty}
          >
            Schedule
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SchedulePublicationForm;
