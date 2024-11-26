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
import { postSchema } from "@/types/zodSchemas/postSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

import React, { SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { CampaignProps, PostProps } from "@/types/types";
import { Post } from "@prisma/client";
import { createOrEditPost, deletePost } from "@/actions/post";
import AlertDeleteAction from "@/components/AlertDeleteAction";

const CreateOrEditForm = ({
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

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      id: data?.id ?? 0,
      name: data?.name ?? "",
      caption: data ? data.caption : "",

      imagesComment: data?.imagesComment ?? "",
      hashtag: data?.hashtag ?? "",
    },
  });

  const handleDeletePost = async (item: PostProps) => {
    try {
      const response = await deletePost(item);
      if (response.success) {
        setRefresh(true);
        toast({
          variant: "default",
          description: response.success,
        });
      }
      if (response.error) {
        toast({
          variant: "destructive",
          description: response.error,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description:
          "Oups! something went wrong while deleting transaction! Try to submit the form again...",
      });
    }
  };
  const onSubmit: SubmitHandler<z.infer<typeof postSchema>> = async (
    values: z.infer<typeof postSchema>
  ) => {
    try {
      const response = await createOrEditPost(values, campaignId);

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
          className="flex flex-col gap-4"
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
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">
                  Post name (only for admin purposes){" "}
                  <FormMessage className="italic text-xs font-semibold" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Give a name for your post"
                    className={clsx({
                      "border-red-400": form.formState.errors.name,
                    })}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="hashtag"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">
                  Post Hastags{" "}
                  <FormMessage className="italic text-xs font-semibold" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Define some hashtags for your post"
                    className={clsx({
                      "border-red-400": form.formState.errors.name,
                    })}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* <FormField
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
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          /> */}
          <FormField
            name="caption"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="flex gap-2">
                    Post caption (the text of your post){" "}
                    <FormMessage className="italic text-xs font-semibold" />
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Write a catchy caption"
                      className={clsx({
                        "border-red-400": form.formState.errors.caption,
                      })}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            name="imagesComment"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="flex gap-2">
                    Images comments{" "}
                    <FormMessage className="italic text-xs font-semibold" />
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Any comments concerning your media ?"
                      className={clsx({
                        "border-red-400": form.formState.errors.imagesComment,
                      })}
                    />
                    {/* <Textarea
                      {...field}
                      placeholder="Write a catchy caption"
                      className={clsx({
                        "border-red-400": form.formState.errors.imagesComment,
                      })}
                    /> */}
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <div className="flex justify-between items-center">
            <div>
              {data && (
                <AlertDeleteAction
                  item={data}
                  deleteToContinue={handleDeletePost}
                  pathToRedirect={`/dashboard/campaign/${data.campaignId}`}
                />
              )}
            </div>

            <Button
              className="self-end"
              variant={"default"}
              disabled={!form.formState.isDirty}
            >
              {data ? "Edit" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateOrEditForm;
