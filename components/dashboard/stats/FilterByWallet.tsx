import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { SetStateAction } from "react";

const FilterByWallet = ({
  wallets,
  setWalletData,
}: {
  wallets: WalletProps[] | null;
  setWalletData: React.Dispatch<SetStateAction<WalletProps | null | undefined>>;
}) => {
  return (
    <div className="mb-10 self-start rounded-md shadow-md">
      <Select
        onValueChange={(value) => {
          const selectedWallet = wallets?.find(
            (elt) => elt.id === parseFloat(value)
          );
          if (selectedWallet) setWalletData(selectedWallet);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a wallet" id="wallet" />
        </SelectTrigger>

        <SelectContent>
          {wallets &&
            wallets.map((wallet) => {
              return (
                <SelectItem key={wallet.id} value={wallet.id.toString()}>
                  {wallet.name}
                </SelectItem>
              );
            })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterByWallet;
