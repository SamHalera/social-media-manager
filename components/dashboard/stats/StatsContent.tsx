"use client";
import React, { useState } from "react";
import ChartExpenseIncome from "./ChartExpenseIncome";

import ChartTransacionsByMethod from "./ChartTransacionsByMethod";
import FilterData from "./FilterByWallet";
import ChartExpenseIncomeByMonth from "./ChartExpenseIncomeByMonth";

const StatsContent = ({ wallets }: { wallets?: WalletProps[] | null }) => {
  const [walletData, setWalletData] = useState<
    WalletProps | null | undefined
  >();

  return (
    <div>
      {wallets ? (
        <>
          <div className="flex">
            <FilterData wallets={wallets} setWalletData={setWalletData} />
          </div>
          <h1 className="text-xl text-blue-700 font-semibold text-center mb-4">
            {walletData?.name}
          </h1>

          <div className="flex flex-col items-center flex-nowrap gap-8">
            <div className="flex gap-8">
              <ChartExpenseIncome walletData={walletData} />
              <ChartExpenseIncomeByMonth walletData={walletData} />
            </div>
            <ChartTransacionsByMethod walletData={walletData} />
          </div>
        </>
      ) : (
        <div>No values yes</div>
      )}
    </div>
  );
};

export default StatsContent;
