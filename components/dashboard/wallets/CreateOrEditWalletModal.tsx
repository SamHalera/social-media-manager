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
import CreateWalletForm from "./CreateWalletForm";
import { Pencil, Plus } from "lucide-react";
import clsx from "clsx";

const CreateOrEditWalletModal = ({
  setRefresh,
  wallet,
}: {
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
  wallet?: WalletProps;
}) => {
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
          {wallet ? <Pencil size={20} /> : <Plus size={20} />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {" "}
            {wallet ? "Edit wallet" : "New Wallet"}
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          <div>
            <CreateWalletForm
              setRefresh={setRefresh}
              setOpen={setOpen}
              wallet={wallet}
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

export default CreateOrEditWalletModal;
