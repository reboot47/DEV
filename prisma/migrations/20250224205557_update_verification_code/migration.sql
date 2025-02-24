/*
  Warnings:

  - You are about to drop the column `verified` on the `VerificationCode` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `VerificationCode_phone_idx` ON `VerificationCode`;

-- AlterTable
ALTER TABLE `VerificationCode` DROP COLUMN `verified`;
