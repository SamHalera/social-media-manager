/*
  Warnings:

  - You are about to drop the column `expenseStatus` on the `Income` table. All the data in the column will be lost.
  - Changed the type of `expenseStatus` on the `Expense` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `incomeStatus` to the `Income` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ExpenseIncomeStatus" AS ENUM ('MADE', 'FUTURE');

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "expenseStatus",
ADD COLUMN     "expenseStatus" "ExpenseIncomeStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Income" DROP COLUMN "expenseStatus",
ADD COLUMN     "incomeStatus" "ExpenseIncomeStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Wallet" ADD COLUMN     "name" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ExpenseStatus";
