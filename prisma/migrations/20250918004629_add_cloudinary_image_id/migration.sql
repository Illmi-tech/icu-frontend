/*
  Warnings:

  - Added the required column `pdf_id` to the `reports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `blogs` ADD COLUMN `image_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `careers` ADD COLUMN `image_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `press_releases` ADD COLUMN `image_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `reports` ADD COLUMN `image_id` VARCHAR(191) NULL,
    ADD COLUMN `pdf_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `scholarships` ADD COLUMN `image_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `volunteer_jobs` ADD COLUMN `image_id` VARCHAR(191) NULL;
