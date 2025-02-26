/*
  Warnings:

  - You are about to drop the column `refereeEmail` on the `referral` table. All the data in the column will be lost.
  - You are about to drop the column `refereeName` on the `referral` table. All the data in the column will be lost.
  - You are about to drop the column `referrerEmail` on the `referral` table. All the data in the column will be lost.
  - You are about to drop the column `referrerName` on the `referral` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Referral` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[friendEmail]` on the table `Referral` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Referral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `friendEmail` to the `Referral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `friendName` to the `Referral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Referral` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `referral` DROP COLUMN `refereeEmail`,
    DROP COLUMN `refereeName`,
    DROP COLUMN `referrerEmail`,
    DROP COLUMN `referrerName`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `friendEmail` VARCHAR(191) NOT NULL,
    ADD COLUMN `friendName` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Referral_email_key` ON `Referral`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Referral_friendEmail_key` ON `Referral`(`friendEmail`);
