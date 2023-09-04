/*
  Warnings:

  - The `serduracao` column on the `servico` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "produto" ADD COLUMN     "proativo" SMALLINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "servico" DROP COLUMN "serduracao",
ADD COLUMN     "serduracao" INTEGER NOT NULL DEFAULT 30;
