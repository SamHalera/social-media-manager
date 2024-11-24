/*
  Warnings:

  - You are about to drop the `Expense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Income` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('MADE', 'FUTURE');

-- CreateEnum
CREATE TYPE "TransactionLabel" AS ENUM ('EXPENSE', 'INCOME');

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_walletId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_walletId_fkey";

-- DropTable
DROP TABLE "Expense";

-- DropTable
DROP TABLE "Income";

-- DropEnum
DROP TYPE "ExpenseIncomeStatus";

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "transactionStatus" "TransactionStatus" NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "walletId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
