import { getWalletById } from "@/actions/wallet";
import WalletContentComponent from "@/components/dashboard/wallets/WalletContentComponent";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const wallet = await getWalletById(parseFloat(id));

  if (!wallet) return notFound();
  console.log("revalidate");
  return (
    <div className="w-full">
      <WalletContentComponent walletId={parseFloat(id)} />
    </div>
  );
};

export default page;
