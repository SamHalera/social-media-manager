import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coins } from "lucide-react";
import { deleteWallet } from "@/actions/wallet";
import { toast } from "@/hooks/use-toast";
import AlertDeleteAction from "@/components/AlertDeleteAction";
import CreateOrEditWalletModal from "./CreateOrEditWalletModal";
import { computeWalletBalances } from "@/lib/walletHelpelrs";
import dayjs from "dayjs";

const CardSingleWallet = ({ wallet }: { wallet: WalletProps }) => {
  const balances = computeWalletBalances(wallet);
  const { walletBalance } = balances;
  const [refresh, setRefresh] = useState<boolean>(false);

  const handleDeleteWallet = async (id: number) => {
    try {
      const response = await deleteWallet(id);
      if (response.success) {
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
          "Oups! something went wrong while deleting wallet! Try to submit the form again...",
      });
    }
  };
  console.info("refresh==>", refresh);
  return (
    <Card className="lg:sticky lg:top-20 shadow-sm border border-slate-100 flex flex-col items-center w-72 mb-10">
      <div className="flex justify-around w-full pt-4">
        <CreateOrEditWalletModal setRefresh={setRefresh} wallet={wallet} />
        <AlertDeleteAction
          deleteToContinue={handleDeleteWallet}
          id={wallet.id}
          pathToRedirect="/dashboard"
        />
      </div>
      <CardHeader className="flex felx-col">
        <CardTitle className="text-center">
          <span className="text-blue-700 font-semibold text-xl mb-10">
            {wallet.name}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-6 justify-around">
        <CardDescription>
          <div className="flex flex-col gap-3 items-center font-semibold ">
            <div className="flex items-center gap-2 text-blue-300 text-xl">
              <Coins size={30} /> Balance:
            </div>
            <div className="text-indigo-700 text-xl flex flex-col gap-2 items-center">
              {walletBalance.toFixed(2)}€
              <span className="italic text-sm">
                at the {dayjs(new Date()).format("DD/MM/YYYY")}
              </span>
            </div>
          </div>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default CardSingleWallet;
