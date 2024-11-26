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
import dayjs from "dayjs";
import SchedulePublicationForm from "./SchedulePublicationForm";

const SchedulePublicationModal = ({
  setRefresh,
  data,
  campaignId,
}: {
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
  data?: PostProps;

  campaignId: number;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {data ? (
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
            {data?.publicationDate ? "Change date" : "Schedule publication"}
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          <div>
            <SchedulePublicationForm
              setRefresh={setRefresh}
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

export default SchedulePublicationModal;
