"use server";

import prisma from "@/db";
import {
  PaymentMethod,
  TransactionStatus,
  TransactionType,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createOrEditTransaction = async (
  values: TransactionFormValuesProps
) => {
  try {
    const { id, walletId, label, type, date, amount, paymentMethod } = values;

    let transactionStatus = "PAST";
    if (date > new Date()) transactionStatus = "UPCOMING";

    if (id === 0) {
      console.log("create");
      const newTransaction = await prisma.transaction.create({
        data: {
          label,
          date,
          type: type as keyof typeof TransactionType,
          amount: parseFloat(amount),
          transactionStatus:
            transactionStatus as keyof typeof TransactionStatus,
          paymentMethod: paymentMethod as keyof typeof PaymentMethod,
          wallet: {
            connect: { id: walletId },
          },
        },
      });
      if (!newTransaction) {
        return {
          error: "Oups! something went wrong! Try to submit the form again...",
        };
      }
    } else if (id > 0) {
      const updatedTransaction = await prisma.transaction.update({
        where: { id },
        data: {
          label,
          date,
          type: type as keyof typeof TransactionType,
          amount: parseFloat(amount),
          transactionStatus:
            transactionStatus as keyof typeof TransactionStatus,
          paymentMethod: paymentMethod as keyof typeof PaymentMethod,
          wallet: {
            connect: { id: walletId },
          },
        },
      });

      if (!updatedTransaction) {
        return {
          error: "Oups! something went wrong! Try to submit the form again...",
        };
      }
    }
    revalidatePath(`/dashboard/wallets/${walletId}`);
    return {
      success: "Good news! Transaction created or update!",
    };
  } catch (error) {
    console.error(error);
    return {
      error:
        "Oups something went wrong while creating a new Transaction. Try again...",
    };
  }
};

export const deleteTransaction = async (id: number) => {
  try {
    const deleted = await prisma.transaction.delete({
      where: { id },
    });
    return {
      success: "Good news! Transaction has been deleted!",
    };
  } catch (error) {
    console.error(error);
    return {
      error:
        "Oups something went wrong while deleting a transaction. Try again...",
    };
  }
};

export const handleTransactionStatus = async (wallets: WalletProps[]) => {
  wallets.forEach((wallet) => {
    wallet.transaction.forEach(async (elt) => {
      if (elt.transactionStatus === "UPCOMING" && elt.date <= new Date()) {
        await prisma.transaction.update({
          where: { id: elt.id },
          data: {
            transactionStatus: "PAST",
          },
        });
      } else if (elt.transactionStatus === "PAST" && elt.date > new Date()) {
        await prisma.transaction.update({
          where: { id: elt.id },
          data: {
            transactionStatus: "UPCOMING",
          },
        });
      }
    });
  });

  return wallets;
};
