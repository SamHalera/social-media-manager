/*
  Warnings:

  - You are about to drop the column `publicationDate` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "publicationDate",
ADD COLUMN     "scheduledPublicationDate" TIMESTAMP(3);