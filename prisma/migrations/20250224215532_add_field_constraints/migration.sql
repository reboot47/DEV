/*
  Warnings:

  - You are about to alter the column `phone` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `gender` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - Added the required column `updatedAt` to the `VerificationCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `phone` VARCHAR(20) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `birthDate` DATE NOT NULL,
    MODIFY `gender` VARCHAR(10) NOT NULL,
    MODIFY `name` VARCHAR(50) NOT NULL,
    MODIFY `profileImage` TEXT NULL;

-- AlterTable
ALTER TABLE `VerificationCode` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE INDEX `User_phone_idx` ON `User`(`phone`);
