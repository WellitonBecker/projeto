-- AlterTable
CREATE SEQUENCE restricoesagenda_reacodigo_seq;
ALTER TABLE "restricoesagenda" ALTER COLUMN "reacodigo" SET DEFAULT nextval('restricoesagenda_reacodigo_seq');
ALTER SEQUENCE restricoesagenda_reacodigo_seq OWNED BY "restricoesagenda"."reacodigo";
