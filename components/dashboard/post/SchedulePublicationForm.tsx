"use client";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

import React, { SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, CalendarX } from "lucide-react";
import dayjs from "dayjs";
import { PostProps } from "@/types/types";

import { schedulePublicationPost } from "@/actions/post";

import { setHours, setMinutes } from "date-fns";
import { useRefreshStore } from "@/stores/refresh";
import ResetScheduleButton from "./ResetScheduleButton";

const SchedulePublicationForm = ({
  setOpen,
  data,
}: {
  setOpen?: React.Dispatch<SetStateAction<boolean>>;
  data?: PostProps;
}) => {
  const { refresh, setRefresh } = useRefreshStore();
  const [timeValue, setTimeValue] = useState<string>("00:00");

  const { toast } = useToast();

  console.log("refresh==> store==>", refresh);
  const handleResponseToast = (
    response:
      | {
          error: string;
          success?: undefined;
        }
      | {
          success: string;
          error?: undefined;
        }
  ) => {
    if (response.success) {
      toast({
        variant: "default",
        description: response.success,
      });
      console.log("ici");
      setRefresh(true);
      if (setOpen) setOpen(false);
    }
    if (response.error) {
      toast({
        variant: "destructive",
        description: response.error,
      });
    }
  };
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
      const { id, publicationDate } = values;
      const [hours, minutes] = timeValue
        .split(":")
        .map((str) => parseInt(str, 10));

      const formattedPublicationDate = setHours(
        setMinutes(publicationDate, minutes),
        hours
      );

      const response = await schedulePublicationPost(
        id,
        formattedPublicationDate
      );

      handleResponseToast(response);
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        description: error.message,
      });
    }
  };
  return (
    <div className="flex flex-col gap-4">
      {data?.publicationDate && (
        <ResetScheduleButton
          data={data}
          handleResponseToast={handleResponseToast}
        />
      )}

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
                  <PopoverContent className="w-auto p-8">
                    <label className="text-blue-500 italic">
                      Set {!form.formState.isDirty && " date first and then "}{" "}
                      the time:{" "}
                      <input
                        className={clsx(
                          "px-2 rounded-sm border border-slate-300",
                          {
                            "bg-slate-300": !form.formState.isDirty,
                          }
                        )}
                        type="time"
                        value={timeValue}
                        onChangeCapture={(e) =>
                          setTimeValue(e.currentTarget.value)
                        }
                        disabled={!form.formState.isDirty}
                      />
                    </label>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      disabled={(date) =>
                        date <= new Date(new Date().valueOf() - 86400000)
                      }
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
