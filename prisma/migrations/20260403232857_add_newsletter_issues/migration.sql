-- CreateTable
CREATE TABLE `newsletter_issues` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `image_path` VARCHAR(191) NULL,
    `image_id` VARCHAR(191) NULL,
    `pdf_path` VARCHAR(191) NOT NULL,
    `pdf_id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `admin_id` INTEGER NOT NULL,

    UNIQUE INDEX `newsletter_issues_slug_key`(`slug`),
    INDEX `newsletter_issues_admin_id_fkey`(`admin_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `newsletter_issues` ADD CONSTRAINT `newsletter_issues_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `admins`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
