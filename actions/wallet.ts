"use server";

import prisma from "@/db";
import { handleTransactionStatus } from "./transaction";

export const getWalletById = async (id: number) => {
  try {
    const wallet = await prisma.wallet.findUnique({
      where: { id },
      include: {
        transaction: true,
      },
    });
    if (wallet) {
      const walletsWithUpdatedTransactions = await handleTransactionStatus([
        wallet,
      ]);

      return walletsWithUpdatedTransactions[0];
    }
    return null;
  } catch (error) {
    console.error("Error create wallet==>", error);
    return null;
  }
};
export const getWallets = async () => {
  try {
    const wallets = await prisma.wallet.findMany({
      include: {
        transaction: true,
      },
    });
    if (wallets) {
      const walletsWithUpdatedTransactions = await handleTransactionStatus(
        wallets
      );

      return walletsWithUpdatedTransactions;
    }
    return null;
  } catch (error) {
    console.error("Error create wallet==>", error);
    return null;
  }
};
export const createWallet = async (values: {
  name: string;
  balance: string;
}) => {
  try {
    const { name, balance } = values;

    const newWallet = await prisma.wallet.create({
      data: {
        name,
        balance: parseFloat(balance),
      },
    });

    if (!newWallet) {
      return {
        error: "Oups! something went wrong! Try to submit the form again...",
      };
    }
    return {
      succes: "Good news! A new wallet has been created successfully.",
    };
  } catch (error) {
    console.error("Error create wallet==>", error);
    return {
      error: "Oups! something went wrong! Try to submit the form again...",
    };
  }
};
export const editWallet = async (values: {
  id: number;
  name: string;
  balance: string;
}) => {
  try {
    const { id, name, balance } = values;

    const newWallet = await prisma.wallet.update({
      where: { id },
      data: {
        name,
        balance: parseFloat(balance),
      },
    });

    if (!newWallet) {
      return {
        error: "Oups! something went wrong! Try to submit the form again...",
      };
    }
    return {
      succes: "Good news! The wallet has been updated successfully.",
    };
  } catch (error) {
    console.error("Error update wallet==>", error);
    return {
      error: "Oups! something went wrong! Try to submit the form again...",
    };
  }
};

export const deleteWallet = async (id: number) => {
  try {
    await prisma.wallet.delete({
      where: { id },
    });
    return {
      success: "Good news! Wallet has been deleted successfully.",
    };
  } catch (error) {
    console.error("Error delete wallet==>", error);
    return {
      error:
        "Oups! something went wrong while deleting wallet! Try to submit the form again...",
    };
  }
};
