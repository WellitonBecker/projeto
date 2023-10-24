-- CreateTable
CREATE TABLE "feedback" (
    "agecodigo" BIGINT NOT NULL,
    "feedescricao" TEXT NOT NULL,
    "feenota" SMALLINT NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("agecodigo")
);

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_agecodigo_fkey" FOREIGN KEY ("agecodigo") REFERENCES "agendamento"("agecodigo") ON DELETE RESTRICT ON UPDATE CASCADE;
