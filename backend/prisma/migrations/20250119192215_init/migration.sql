-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `contraseña` VARCHAR(191) NOT NULL,
    `rol_id` INTEGER NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rol` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Evento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `ubicacion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Entrada` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo_qr` VARCHAR(191) NOT NULL,
    `evento_id` INTEGER NOT NULL,
    `usuario_id` INTEGER NOT NULL,

    UNIQUE INDEX `Entrada_codigo_qr_key`(`codigo_qr`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `precio` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `total` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PedidoProducto` (
    `pedido_id` INTEGER NOT NULL,
    `producto_id` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,

    PRIMARY KEY (`pedido_id`, `producto_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PedidoEntrada` (
    `pedido_id` INTEGER NOT NULL,
    `entrada_id` INTEGER NOT NULL,

    PRIMARY KEY (`pedido_id`, `entrada_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_rol_id_fkey` FOREIGN KEY (`rol_id`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entrada` ADD CONSTRAINT `Entrada_evento_id_fkey` FOREIGN KEY (`evento_id`) REFERENCES `Evento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entrada` ADD CONSTRAINT `Entrada_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidoProducto` ADD CONSTRAINT `PedidoProducto_pedido_id_fkey` FOREIGN KEY (`pedido_id`) REFERENCES `Pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidoProducto` ADD CONSTRAINT `PedidoProducto_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidoEntrada` ADD CONSTRAINT `PedidoEntrada_pedido_id_fkey` FOREIGN KEY (`pedido_id`) REFERENCES `Pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidoEntrada` ADD CONSTRAINT `PedidoEntrada_entrada_id_fkey` FOREIGN KEY (`entrada_id`) REFERENCES `Entrada`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
