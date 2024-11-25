"use client";
import React from "react";
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
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { ArchiveX, Trash2 } from "lucide-react";

import { useRouter } from "next/navigation";
import { CampaignProps } from "@/types/types";

const AlertDeleteOrArchiveCampaign = ({
  actionToContinue,
  item,
  pathToRedirect,
}: {
  actionToContinue: (item: CampaignProps) => Promise<void>;
  item: CampaignProps;
  pathToRedirect: string;
}) => {
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className=" bg-red-200 w-10 h-10 p-2 flex items-center justify-center rounded-full cursor-pointer hover:bg-red-400 duration-500 group"
        >
          {item.post.some((elt) => elt.status === "PUBLISHED") ? (
            <ArchiveX className="text-red-400 group-hover:text-red-200 duration-500" />
          ) : (
            <Trash2 className="text-red-400 group-hover:text-red-200 duration-500" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your data
            from our servers.
          </AlertDialogDescription>
          <div></div>
        </AlertDialogHeader>
        <AlertDialogFooter className="">
          <AlertDialogCancel className="bg-slate-400">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await actionToContinue(item);

              router.push(pathToRedirect);
            }}
            className="bg-red-200 rounded-sm px-4 text-red-500 text-sm hover:text-red-200 hover:bg-red-500 duration-500"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDeleteOrArchiveCampaign;
