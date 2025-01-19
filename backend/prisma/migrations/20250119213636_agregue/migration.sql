/*
  Warnings:

  - Added the required column `apellido` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `celular` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `apellido` VARCHAR(191) NOT NULL,
    ADD COLUMN `celular` INTEGER NOT NULL;
