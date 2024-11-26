import React, { useState } from "react";
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

import { Pencil, Plus } from "lucide-react";
import clsx from "clsx";
import { Campaign } from "@prisma/client";
import CreateCampaignForm from "./CreateCampaignForm";

const CreateOrEditCampaignModal = ({ campaign }: { campaign?: Campaign }) => {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="spendwise"
          size={"icon"}
          className={clsx(
            "bg-blue-200 w-10 h-10 p-2 flex items-center justify-center rounded-full cursor-pointer hover:bg-blue-400 duration-500 group",
            {}
          )}
        >
          {campaign ? <Pencil size={20} /> : <Plus size={20} />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {" "}
            {campaign ? "Edit campaign" : "New campaign"}
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          <div>
            <CreateCampaignForm setOpen={setOpen} campaign={campaign} />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateOrEditCampaignModal;
