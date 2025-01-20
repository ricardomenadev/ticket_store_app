/*
  Warnings:

  - You are about to drop the `entrada` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `evento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pedido` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pedidoentrada` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pedidoproducto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `producto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rol` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `entrada` DROP FOREIGN KEY `Entrada_evento_id_fkey`;

-- DropForeignKey
ALTER TABLE `entrada` DROP FOREIGN KEY `Entrada_usuario_id_fkey`;

-- DropForeignKey
ALTER TABLE `pedido` DROP FOREIGN KEY `Pedido_usuario_id_fkey`;

-- DropForeignKey
ALTER TABLE `pedidoentrada` DROP FOREIGN KEY `PedidoEntrada_entrada_id_fkey`;

-- DropForeignKey
ALTER TABLE `pedidoentrada` DROP FOREIGN KEY `PedidoEntrada_pedido_id_fkey`;

-- DropForeignKey
ALTER TABLE `pedidoproducto` DROP FOREIGN KEY `PedidoProducto_pedido_id_fkey`;

-- DropForeignKey
ALTER TABLE `pedidoproducto` DROP FOREIGN KEY `PedidoProducto_producto_id_fkey`;

-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `Usuario_rol_id_fkey`;

-- DropTable
DROP TABLE `entrada`;

-- DropTable
DROP TABLE `evento`;

-- DropTable
DROP TABLE `pedido`;

-- DropTable
DROP TABLE `pedidoentrada`;

-- DropTable
DROP TABLE `pedidoproducto`;

-- DropTable
DROP TABLE `producto`;

-- DropTable
DROP TABLE `rol`;

-- DropTable
DROP TABLE `usuario`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `roleId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` ENUM('SUPER_ADMIN', 'ADMIN', 'STAFF', 'CUSTOMER') NOT NULL,

    UNIQUE INDEX `Role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `date` DATETIME(3) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `capacity` INTEGER NOT NULL,
    `status` ENUM('SCHEDULED', 'IN_PROGRESS', 'FINISHED', 'CANCELLED') NOT NULL DEFAULT 'SCHEDULED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `qrCode` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `status` ENUM('VALID', 'USED', 'CANCELLED') NOT NULL DEFAULT 'VALID',
    `eventId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Ticket_qrCode_key`(`qrCode`),
    UNIQUE INDEX `Ticket_number_key`(`number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `price` DOUBLE NOT NULL,
    `stock` INTEGER NOT NULL DEFAULT 0,
    `image` VARCHAR(191) NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `total` DOUBLE NOT NULL,
    `status` ENUM('PENDING', 'PAID', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `mpPaymentId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderProduct` (
    `orderId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unitPrice` DOUBLE NOT NULL,

    PRIMARY KEY (`orderId`, `productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderTicket` (
    `orderId` INTEGER NOT NULL,
    `ticketId` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,

    PRIMARY KEY (`orderId`, `ticketId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderProduct` ADD CONSTRAINT `OrderProduct_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderProduct` ADD CONSTRAINT `OrderProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderTicket` ADD CONSTRAINT `OrderTicket_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderTicket` ADD CONSTRAINT `OrderTicket_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
