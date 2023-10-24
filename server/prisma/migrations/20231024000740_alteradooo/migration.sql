/*
  Warnings:

  - You are about to drop the `movimentacao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "movimentacao" DROP CONSTRAINT "agendamento_movimentacao_fk";

-- DropForeignKey
ALTER TABLE "movimentacao" DROP CONSTRAINT "empresa_despesaempresa_fk";

-- DropForeignKey
ALTER TABLE "movimentacao" DROP CONSTRAINT "funcionarioempresa_despesaempresa_fk";

-- DropForeignKey
ALTER TABLE "movimentacao" DROP CONSTRAINT "produto_movimentacao_fk";

-- AlterTable
ALTER TABLE "agendamento" ALTER COLUMN "agedatahora" DROP DEFAULT;

-- AlterTable
ALTER TABLE "restricoesagenda" ALTER COLUMN "reatipo" SET DEFAULT 1;

-- DropTable
DROP TABLE "movimentacao";
