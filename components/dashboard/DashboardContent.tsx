"use client";
import React, { useEffect, useState } from "react";

import CardItemWalletList from "./CardItemWalletList";

import dynamic from "next/dynamic";
import { getWallets } from "@/actions/wallet";

import { SkeletonCard } from "../skeletons/SkeletonCard";

const CreateOrEditWalletModal = dynamic(
  () => import("@/components/dashboard/wallets/CreateOrEditWalletModal")
);

const DashboardContent = () => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [dataWallets, setDataWallets] = useState<WalletProps[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wallets = await getWallets();
        console.log("wallets==>", wallets);

        if (wallets) setDataWallets(wallets);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [refresh]);
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl text-blue-500 mb-4">My Wallets</h2>
      <div className="flex flex-col items-center">
        <span className="mb-2">add a wallet</span>
        <CreateOrEditWalletModal setRefresh={setRefresh} />
      </div>
      <div className="flex justify-center items-center gap-6 my-10">
        {dataWallets ? (
          dataWallets.map((wallet) => {
            return <CardItemWalletList key={wallet.id} wallet={wallet} />;
          })
        ) : (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
