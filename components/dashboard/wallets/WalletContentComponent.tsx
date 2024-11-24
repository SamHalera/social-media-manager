"use client";
import React, { useEffect, useState } from "react";
import TableDataFromWallet from "./TableDataFromWallet";
import CardSingleWallet from "./CardSingleWallet";

import CreateOrEditModal from "../transaction/CreateOrEditModal";
import { getWalletById } from "@/actions/wallet";
import MenuTabTransactions from "./MenuTabTransactions";

import { SkeletonWalletContent } from "@/components/skeletons/SkeletonWalletContent";
import { computeWalletBalances } from "@/lib/walletHelpelrs";

const WalletContentComponent = ({ walletId }: { walletId: number }) => {
  const [dataWallet, setDataWallet] = useState<WalletProps>();
  const [showExpenses, setShowExpenses] = useState<boolean>(true);
  const [dataLabel, setDataLabel] = useState<string>("expense");
  const [dataForTable, setDataForTable] = useState<TransactionProps[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wallet = await getWalletById(walletId);

        if (wallet) {
          setDataWallet(wallet);
          setDataForTable(
            wallet.transaction.filter(
              (data) => data.type === dataLabel.toUpperCase()
            )
          );
        }
        setRefresh(false);

        setDataLabel(dataLabel);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [refresh]);

  return (
    <div className="w-full flex flex-col  lg:flex-row justify-around">
      {isLoading ? (
        <SkeletonWalletContent />
      ) : (
        <>
          {dataWallet && (
            <div className="mt-8 pr-4 lg:border-r lg:border-blue-200 mx-auto">
              <CardSingleWallet wallet={dataWallet} />
            </div>
          )}

          <div className="flex flex-col flex-1 relative">
            <MenuTabTransactions
              dataWallet={dataWallet}
              showExpenses={showExpenses}
              setShowExpenses={setShowExpenses}
              setDataForTable={setDataForTable}
              setDataLabel={setDataLabel}
            />
            <div className="p-10">
              <CreateOrEditModal
                setRefresh={setRefresh}
                dataLabel={dataLabel}
                walletId={walletId}
              />
              <TableDataFromWallet
                label={dataLabel}
                dataForTable={dataForTable}
                setRefresh={setRefresh}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WalletContentComponent;
