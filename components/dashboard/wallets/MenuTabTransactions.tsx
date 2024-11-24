import clsx from "clsx";
import { BadgeEuro, HandCoins } from "lucide-react";
import React, { SetStateAction } from "react";

const MenuTabTransactions = ({
  dataWallet,
  showExpenses,
  setShowExpenses,
  setDataForTable,
  setDataLabel,
}: {
  showExpenses: boolean;
  dataWallet?: WalletProps;
  setShowExpenses: React.Dispatch<SetStateAction<boolean>>;
  setDataForTable: React.Dispatch<
    SetStateAction<TransactionProps[] | undefined>
  >;
  setDataLabel: React.Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="flex items-center gap-6 mb-4 mx-auto text-center">
      <div
        onClick={() => {
          setShowExpenses(true);
          setDataLabel("expense");
          setDataForTable(
            dataWallet?.transaction.filter((data) => data.type === "EXPENSE")
          );
        }}
        className={clsx(
          "flex items-center gap-4 border-b-2 text-xl pb-3 hover:text-red-700 duration-500 font-semibold cursor-pointer",
          {
            "text-red-700  border-red-700": showExpenses,
            "text-muted-foreground border-transparent": !showExpenses,
          }
        )}
      >
        <BadgeEuro /> Expenses
      </div>

      <div
        onClick={() => {
          setShowExpenses(false);
          setDataLabel("income");
          setDataForTable(
            dataWallet?.transaction.filter((data) => data.type === "INCOME")
          );
        }}
        className={clsx(
          "flex items-center gap-4 border-b-2 text-xl pb-3 hover:text-blue-700 duration-500 font-semibold cursor-pointer",
          {
            "text-blue-700 border-blue-700": !showExpenses,
            "text-muted-foreground border-transparent": showExpenses,
          }
        )}
      >
        <HandCoins /> Incomes
      </div>
    </div>
  );
};

export default MenuTabTransactions;
