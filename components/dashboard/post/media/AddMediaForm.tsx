import { Form } from "@/components/ui/form";
import { PostProps } from "@/types/types";

import { Media } from "@prisma/client";
import React, { SetStateAction, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import AddMediaRow from "./AddMediaRow";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { handleUploadMediaForPost } from "@/actions/post";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader";
import { Eye, GalleryThumbnails } from "lucide-react";
import { useRefreshStore } from "@/stores/refresh";
import CarouselMedia from "./CarouselMedia";

export type UploadMediaFormType = {
  mediaPosts: Media[];
};
const AddMediaForm = ({
  post,
  isCarouselView,
  setIsCarouselView,
}: {
  post: PostProps;
  isCarouselView: boolean;
  setIsCarouselView: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log("isCarouselView==>", isCarouselView);
  const { toast } = useToast();
  const { refresh, setRefresh } = useRefreshStore();
  console.log("posts.media==>", post.media);
  const form = useForm<UploadMediaFormType>({
    values: {
      mediaPosts: post.media ?? [],
    },
  });

  const { fields, append, remove } = useFieldArray<
    UploadMediaFormType,
    "mediaPosts",
    "mediaId"
  >({
    name: "mediaPosts",
    control: form.control,
  });

  const onSubmit: SubmitHandler<UploadMediaFormType> = async (values) => {
    setIsLoading(true);
    const { mediaPosts } = values;

    const response = await handleUploadMediaForPost(mediaPosts, post);
    if (response?.success) {
      toast({
        title: "Good news!",
        description: response.success,
        variant: "default",
        style: {
          backgroundColor: "#FEC140",
          color: "black",
        },
      });
      setRefresh(true);
    }
    if (response?.error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: response.error,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 items-center justify-center mb-8">
        <h1 className=" text-blue-600 text-3xl ">Add media to your post</h1>
        <div
          onClick={() => {
            setIsCarouselView(!isCarouselView);
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <GalleryThumbnails size={30} /> preview caroussel
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 relative w-full"
        >
          {isLoading ? (
            <Loader />
          ) : (
            <div className="flex gap-3 flex-wrap w-full justify-center">
              {fields.map((field, index) => {
                return (
                  <AddMediaRow
                    key={field.source}
                    field={field}
                    remove={remove}
                    index={index}
                  />
                );
              })}
            </div>
          )}

          <CldUploadWidget
            onSuccess={(result: any) => {
              console.log("result==>", result);
              const mediaField = {
                id: 0,
                source: result?.info?.secure_url,
                publicId: result?.info?.public_id,
                postId: post.id,
              };
              append(mediaField);
            }}
            uploadPreset={`${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`}
          >
            {({ open }) => {
              return (
                <Button
                  onClick={(e) => {
                    open();
                    e.preventDefault();
                  }}
                  className=" cursor-pointer my-4 fixed bottom-0 left-72"
                >
                  Upload image
                </Button>
              );
            }}
          </CldUploadWidget>

          <Button
            className=" cursor-pointer my-4 fixed bottom-0 right-28"
            variant={"default"}
            disabled={!form.formState.isDirty}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddMediaForm;
