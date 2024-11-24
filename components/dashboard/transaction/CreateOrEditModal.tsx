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

const CreateOrEditModal = ({
  setRefresh,
  data,
  dataLabel,
  walletId,
}: {
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
  data?: TransactionProps;
  dataLabel: string;
  walletId: number;
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
            className={clsx("mb-4", {
              "bg-red-200 text-red-500 hover:bg-red-500 hover:text-red-200":
                dataLabel === "expense",
              "bg-blue-200 text-blue-500 hover:bg-blue-500 hover:text-blue-200":
                dataLabel === "income",
            })}
          >
            New {dataLabel}
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {" "}
            {dataLabel ? `Edit ${dataLabel}` : `New ${dataLabel}`}
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          <div>
            <CreateOrEditForm
              setRefresh={setRefresh}
              setOpen={setOpen}
              data={data}
              walletId={walletId}
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
