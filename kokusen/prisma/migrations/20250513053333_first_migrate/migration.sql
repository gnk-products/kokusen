-- CreateTable
CREATE TABLE `Country` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(10) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `name_ja` VARCHAR(100) NOT NULL,
    `bbox` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    INDEX `Country_created_at_idx`(`created_at`),
    INDEX `Country_deleted_at_idx`(`deleted_at`),
    UNIQUE INDEX `Country_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MapImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `country_id` INTEGER NOT NULL,
    `map_image_id` VARCHAR(20) NOT NULL,
    `is_pano` BOOLEAN NOT NULL,
    `lat` DOUBLE NOT NULL,
    `long` DOUBLE NOT NULL,
    `compass_angle` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    INDEX `MapImage_created_at_idx`(`created_at`),
    INDEX `MapImage_deleted_at_idx`(`deleted_at`),
    UNIQUE INDEX `MapImage_map_image_id_key`(`map_image_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Match` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(50) NOT NULL,
    `order` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    INDEX `Match_created_at_idx`(`created_at`),
    INDEX `Match_deleted_at_idx`(`deleted_at`),
    UNIQUE INDEX `Match_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MatchCountry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `match_id` INTEGER NOT NULL,
    `country_code` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `MatchCountry_match_id_country_code_key`(`match_id`, `country_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MatchSeed` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(50) NOT NULL,
    `match_id` INTEGER NOT NULL,
    `map_image_id` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,
    `created_by` VARCHAR(50) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    INDEX `MatchSeed_slug_idx`(`slug`),
    INDEX `MatchSeed_created_by_idx`(`created_by`),
    INDEX `MatchSeed_created_at_idx`(`created_at`),
    INDEX `MatchSeed_deleted_at_idx`(`deleted_at`),
    UNIQUE INDEX `MatchSeed_slug_match_id_map_image_id_key`(`slug`, `match_id`, `map_image_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MatchAnswer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `match_seed_id` INTEGER NOT NULL,
    `user_id` VARCHAR(50) NOT NULL,
    `user_answer_id` INTEGER NOT NULL,
    `answer_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `MatchAnswer_user_id_idx`(`user_id`),
    INDEX `MatchAnswer_created_at_idx`(`created_at`),
    UNIQUE INDEX `MatchAnswer_match_seed_id_user_id_key`(`match_seed_id`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MapImage` ADD CONSTRAINT `MapImage_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchCountry` ADD CONSTRAINT `MatchCountry_match_id_fkey` FOREIGN KEY (`match_id`) REFERENCES `Match`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchCountry` ADD CONSTRAINT `MatchCountry_country_code_fkey` FOREIGN KEY (`country_code`) REFERENCES `Country`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchSeed` ADD CONSTRAINT `MatchSeed_match_id_fkey` FOREIGN KEY (`match_id`) REFERENCES `Match`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchSeed` ADD CONSTRAINT `MatchSeed_map_image_id_fkey` FOREIGN KEY (`map_image_id`) REFERENCES `MapImage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchAnswer` ADD CONSTRAINT `MatchAnswer_match_seed_id_fkey` FOREIGN KEY (`match_seed_id`) REFERENCES `MatchSeed`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchAnswer` ADD CONSTRAINT `MatchAnswer_user_answer_id_fkey` FOREIGN KEY (`user_answer_id`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchAnswer` ADD CONSTRAINT `MatchAnswer_answer_id_fkey` FOREIGN KEY (`answer_id`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
