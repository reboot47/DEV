-- AlterTable
ALTER TABLE `VerificationCode` ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX `VerificationCode_phone_idx` ON `VerificationCode`(`phone`);
