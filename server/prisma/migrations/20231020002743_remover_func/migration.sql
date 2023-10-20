/*
  Warnings:

  - You are about to drop the column `usucodigo` on the `restricoesagenda` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "restricoesagenda" DROP CONSTRAINT "funcionarioempresa_restricoesagenda_fk";

-- AlterTable
ALTER TABLE "restricoesagenda" DROP COLUMN "usucodigo";
