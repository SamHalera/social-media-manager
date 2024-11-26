import React, { SetStateAction, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { Pencil } from "lucide-react";
import clsx from "clsx";
import CreateOrEditForm from "./CreateOrEditForm";
import { PostProps } from "@/types/types";

const CreateOrEditModal = ({
  data,
  campaignId,
}: {
  data?: PostProps;

  campaignId: number;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {data ? (
          <div className=" cursor-pointer h-10 w-10 bg-blue-200 text-blue-700 hover:bg-blue-700 hover:text-blue-200 p-3 duration-500 flex justify-center items-center rounded-full">
            <Pencil />
          </div>
        ) : (
          <Button
            className={clsx(
              "mb-4 bg-blue-200 text-blue-500 hover:bg-blue-500 hover:text-blue-200",
              {}
            )}
          >
            New post
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {" "}
            {data ? `Edit post` : `New post`}
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          <div>
            <CreateOrEditForm
              setOpen={setOpen}
              data={data}
              campaignId={campaignId}
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateOrEditModal;
