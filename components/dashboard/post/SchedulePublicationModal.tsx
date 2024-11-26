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

import clsx from "clsx";

import { PostProps } from "@/types/types";

import SchedulePublicationForm from "./SchedulePublicationForm";

const SchedulePublicationModal = ({ data }: { data?: PostProps }) => {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {data?.scheduledPublicationDate ? (
          <Button
            className={clsx(
              "mb-4 bg-blue-200 text-blue-500 hover:bg-blue-500 hover:text-blue-200 text-xs px-2 py-1",
              {}
            )}
          >
            change schedule{" "}
          </Button>
        ) : (
          <Button
            className={clsx(
              "mb-4 bg-blue-200 text-blue-500 hover:bg-blue-500 hover:text-blue-200 text-xs px-2 py-1",
              {}
            )}
          >
            schedule now !
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {" "}
            {data?.scheduledPublicationDate
              ? "Change date"
              : "Schedule publication"}
          </AlertDialogTitle>
          <AlertDialogDescription className="flex"></AlertDialogDescription>
          <div>
            <SchedulePublicationForm setOpen={setOpen} data={data} />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SchedulePublicationModal;
