import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDown, ArrowUp, BadgeEuro, Coins, HandCoins } from "lucide-react";
import Link from "next/link";
import { computeWalletBalances } from "@/lib/walletHelpelrs";

const CardItemWalletList = ({ wallet }: { wallet: WalletProps }) => {
  const balances = computeWalletBalances(wallet);
  const {
    walletBalance,
    incomesPastBalance,
    incomesUpcomingBalance,
    expensesPastBalance,
    expensesUpcomingBalance,
  } = balances;
  return (
    <div>
      <Link href={`/dashboard/wallets/${wallet.id}`} className="group">
        <Card className=" shadow-sm border border-slate-100 group-hover:bg-blue-50 duration-500">
          <CardHeader>
            <CardTitle className="text-center mb-4">
              <span className="">{wallet.name}</span>
            </CardTitle>
            <CardDescription>
              <div className="flex gap-3 items-center text-blue-700 font-semibold text-xl">
                <Coins size={30} /> Balance :{" "}
                <span>{walletBalance.toFixed(2)}€</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-6 justify-around">
            <div className="flex flex-col gap-2 items-center">
              <div className="relative w-10 h-10 bg-blue-200 mb-2 flex items-center justify-center rounded-full p-2">
                <ArrowUp className="absolute text-blue-200 -top-4" />
                <HandCoins className=" text-blue-700" size={30} />
              </div>
              <span className="text-blue-500">Incomes</span>
              <div className="font-semibold text-slate-700 flex flex-col">
                <div className="flex justify-between">
                  <span className="italic text-sm">Past:</span>
                  <span className="text-blue-500">
                    {incomesPastBalance.toFixed(2)}€
                  </span>
                </div>
                <div className="flex gap-2 justify-between">
                  <span className="italic text-sm">Upcoming:</span>{" "}
                  <span className="text-blue-500">
                    {incomesUpcomingBalance.toFixed(2)}€
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <div className="relative w-10 h-10 bg-red-200 mb-2 flex items-center justify-center rounded-full p-2">
                <ArrowDown className="absolute text-red-200 -bottom-4" />
                <BadgeEuro className=" text-red-700" size={30} />
              </div>
              <span className="text-blue-500">Expenses</span>
              <span className="font-semibold text-slate-700">
                <div className="flex justify-between">
                  <span className="italic text-sm">Past:</span>
                  <span className="text-blue-500">
                    {expensesPastBalance.toFixed(2)}€
                  </span>
                </div>
                <div className="flex gap-2 justify-between">
                  <span className="italic text-sm">Upcoming:</span>{" "}
                  <span className="text-blue-500">
                    {expensesUpcomingBalance.toFixed(2)}€
                  </span>
                </div>
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default CardItemWalletList;
