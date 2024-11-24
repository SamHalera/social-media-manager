import React, { SetStateAction, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";

import CreateOrEditModal from "../transaction/CreateOrEditModal";
import AlertDeleteAction from "@/components/AlertDeleteAction";
import { useToast } from "@/hooks/use-toast";
import { deleteTransaction } from "@/actions/transaction";
import FiltersTransactions from "../../filters/FiltersTransactions";
import clsx from "clsx";
import SearchBarTransactions from "./SearchBarTransactions";
import { useFiltersStore } from "@/stores/filters";
import { isAfter, isBefore } from "date-fns";
import { filterAndSortDataForTable } from "@/lib/walletHelpelrs";

const TableDataFromWallet = ({
  label,
  dataForTable,
  setRefresh,
}: {
  label: string;
  dataForTable?: TransactionProps[];
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [searchedValue, setSearchedValue] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const { toast } = useToast();
  const { showPast, showUpcoming, method, date } = useFiltersStore();

  let totalAmountTransactions = 0;
  const sortedAndFilteredData = filterAndSortDataForTable(
    dataForTable ?? [],
    showPast,
    showUpcoming,
    method,
    date,
    searchedValue
  );
  sortedAndFilteredData?.forEach(
    (data) => (totalAmountTransactions += data.amount)
  );

  const handleDeleteTransaction = async (id: number) => {
    try {
      const response = await deleteTransaction(id);
      if (response.success) {
        setRefresh(true);
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
          "Oups! something went wrong while deleting transaction! Try to submit the form again...",
      });
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="sticky top-2 flex justify-around items-center gap-4 z-10 bg-slate-100 py-6 px-8 rounded-md">
        <SearchBarTransactions
          setSearchedValue={setSearchedValue}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />

        <FiltersTransactions />
      </div>
      <Table>
        <TableCaption>A list of your recent {label}s.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead className="w-80">Label</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-center flex flex-col items-center justify-center">
              Amount{" "}
              <span className="font-semibold">
                ({totalAmountTransactions}€)
              </span>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAndFilteredData.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {dayjs(item.date).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>{item.label}</TableCell>
                <TableCell className="">
                  <span
                    className={clsx("text-xs  px-3 py-1 rounded-full", {
                      "bg-indigo-300": item.transactionStatus === "PAST",
                      "bg-indigo-700 text-white":
                        item.transactionStatus === "UPCOMING",
                    })}
                  >
                    {item.transactionStatus.toLowerCase()}
                  </span>
                </TableCell>
                <TableCell>{item.paymentMethod}</TableCell>
                <TableCell
                  className={clsx("text-right", {
                    "text-red-500": item.type === "EXPENSE",
                    "text-blue-500": item.type === "INCOME",
                  })}
                >
                  {item.type === "EXPENSE" ? "-" : "+"}
                  {item.amount.toFixed(2)}€
                </TableCell>
                <TableCell className="text-right flex justify-end gap-4">
                  <CreateOrEditModal
                    setRefresh={setRefresh}
                    data={item}
                    walletId={item.walletId}
                    dataLabel={label}
                  />
                  {/* <div className=" cursor-pointer h-10 w-10 bg-red-200 text-red-700 hover:bg-red-700 hover:text-red-200 p-3 duration-500 flex justify-center items-center rounded-full"> */}
                  <AlertDeleteAction
                    id={item.id}
                    deleteToContinue={handleDeleteTransaction}
                    pathToRedirect={`/dashboard/wallets/${item.walletId}`}
                  />
                  {/* </div> */}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableDataFromWallet;
