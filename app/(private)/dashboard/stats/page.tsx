import { getWallets } from "@/actions/wallet";
import StatsContent from "@/components/dashboard/stats/StatsContent";
import React from "react";

const page = async () => {
  const wallets = await getWallets();
  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl text-center text-blue-600 font-semibold">
        STATISTICS
      </h1>
      <h2 className="text-center text-blue-400 font-semibold">
        (Amounts are expressed in {process.env.NEXT_PUBLIC_CURRENCY})
      </h2>
      <StatsContent wallets={wallets} />
    </div>
  );
};

export default page;
