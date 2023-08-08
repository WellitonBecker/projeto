-- CreateTable
CREATE TABLE "agendamento" (
    "agecodigo" BIGSERIAL NOT NULL,
    "agesituacao" SMALLINT NOT NULL DEFAULT 1,
    "agevalor" DECIMAL(10,2) NOT NULL,
    "usucodigofun" BIGINT NOT NULL,
    "empcodigo" BIGINT NOT NULL,
    "sersequencia" SMALLINT NOT NULL,
    "usucodigocli" BIGINT NOT NULL,

    CONSTRAINT "pk_agendamento" PRIMARY KEY ("agecodigo")
);

-- CreateTable
CREATE TABLE "empresa" (
    "empcodigo" BIGSERIAL NOT NULL,
    "empnome" VARCHAR(100) NOT NULL,
    "empemail" VARCHAR(200) NOT NULL,
    "emptelefone" VARCHAR(15) NOT NULL,
    "empendereco" VARCHAR(100) NOT NULL,

    CONSTRAINT "pk_empresa" PRIMARY KEY ("empcodigo")
);

-- CreateTable
CREATE TABLE "funcionarioempresa" (
    "usucodigo" BIGINT NOT NULL,
    "empcodigo" BIGINT NOT NULL,
    "fueativo" SMALLINT NOT NULL DEFAULT 1,
    "fuetipo" SMALLINT NOT NULL,
    "fuesalario" DECIMAL(10,2),

    CONSTRAINT "pk_funcionario_empresa" PRIMARY KEY ("usucodigo","empcodigo")
);

-- CreateTable
CREATE TABLE "funcionarioservico" (
    "usucodigo" BIGINT NOT NULL,
    "empcodigo" BIGINT NOT NULL,
    "sersequencia" SMALLINT NOT NULL,
    "fusativo" SMALLINT NOT NULL,

    CONSTRAINT "pk_funcionarioservico" PRIMARY KEY ("usucodigo","empcodigo","sersequencia")
);

-- CreateTable
CREATE TABLE "horariosempresa" (
    "hoediasemana" SMALLINT NOT NULL,
    "empcodigo" BIGINT NOT NULL,
    "hoehorarioinicio" TIME(6) NOT NULL,
    "hoehorariotermino" TIME(6) NOT NULL,

    CONSTRAINT "pk_horarios_empresa" PRIMARY KEY ("hoediasemana","empcodigo")
);

-- CreateTable
CREATE TABLE "movimentacao" (
    "empcodigo" BIGINT NOT NULL,
    "movsequencia" BIGSERIAL NOT NULL,
    "movdescricao" VARCHAR(100) NOT NULL,
    "movtipo" SMALLINT NOT NULL,
    "movvalor" DECIMAL(10,2) NOT NULL,
    "movdatahoracadastro" VARCHAR NOT NULL,
    "movmovimento" SMALLINT NOT NULL,
    "movmesano" SMALLINT NOT NULL,
    "movquantidadeproduto" INTEGER NOT NULL,
    "usucodigofun" BIGINT,
    "procodigo" SMALLINT,
    "agecodigo" BIGINT,

    CONSTRAINT "pk_movimentacao" PRIMARY KEY ("empcodigo","movsequencia")
);

-- CreateTable
CREATE TABLE "produto" (
    "procodigo" SMALLSERIAL NOT NULL,
    "empcodigo" BIGINT NOT NULL,
    "prodescricao" VARCHAR(100) NOT NULL,
    "proquantidadeatual" INTEGER NOT NULL,

    CONSTRAINT "pk_produto" PRIMARY KEY ("procodigo","empcodigo")
);

-- CreateTable
CREATE TABLE "restricoesagenda" (
    "reacodigo" BIGINT NOT NULL,
    "reahorarioinicio" TIME(6) NOT NULL,
    "reahorariotermino" TIME(6) NOT NULL,
    "reaativo" SMALLINT NOT NULL DEFAULT 1,
    "reatipo" SMALLINT NOT NULL,
    "readata" DATE NOT NULL,
    "empcodigo" BIGINT NOT NULL,
    "usucodigo" BIGINT NOT NULL,

    CONSTRAINT "pk_restricoesagenda" PRIMARY KEY ("reacodigo")
);

-- CreateTable
CREATE TABLE "servico" (
    "empcodigo" BIGINT NOT NULL,
    "sersequencia" SMALLSERIAL NOT NULL,
    "serdescricao" VARCHAR(100) NOT NULL,
    "serativo" SMALLINT NOT NULL DEFAULT 1,
    "servalor" DECIMAL(10,2) NOT NULL,
    "serduracao" TIME(6) NOT NULL DEFAULT '00:30:00'::time without time zone,

    CONSTRAINT "pk_servico" PRIMARY KEY ("empcodigo","sersequencia")
);

-- CreateTable
CREATE TABLE "usuario" (
    "usucodigo" BIGSERIAL NOT NULL,
    "usunome" VARCHAR(100) NOT NULL,
    "usuemail" VARCHAR(100),
    "usutelefone" VARCHAR(15),
    "usugoogleid" VARCHAR,
    "ususenha" VARCHAR,
    "usuendereco" VARCHAR(100),
    "usutipo" SMALLINT NOT NULL DEFAULT 2,

    CONSTRAINT "pk_usuario" PRIMARY KEY ("usucodigo")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_idx_email" ON "usuario"("usuemail");

-- CreateIndex
CREATE INDEX "usuario_idx_nome" ON "usuario"("usunome");

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "funcionarioservico_agendamento_fk" FOREIGN KEY ("empcodigo", "sersequencia", "usucodigofun") REFERENCES "funcionarioservico"("empcodigo", "sersequencia", "usucodigo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "usuario_agendamento_fk" FOREIGN KEY ("usucodigocli") REFERENCES "usuario"("usucodigo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "funcionarioempresa" ADD CONSTRAINT "empresa_funcionarioempresa_fk" FOREIGN KEY ("empcodigo") REFERENCES "empresa"("empcodigo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "funcionarioempresa" ADD CONSTRAINT "usuario_funcionarioempresa_fk" FOREIGN KEY ("usucodigo") REFERENCES "usuario"("usucodigo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "funcionarioservico" ADD CONSTRAINT "funcionarioempresa_funcionarioservico_fk" FOREIGN KEY ("empcodigo", "usucodigo") REFERENCES "funcionarioempresa"("empcodigo", "usucodigo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "funcionarioservico" ADD CONSTRAINT "servico_funcionarioservico_fk" FOREIGN KEY ("empcodigo", "sersequencia") REFERENCES "servico"("empcodigo", "sersequencia") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "horariosempresa" ADD CONSTRAINT "empresa_horariosempresa_fk" FOREIGN KEY ("empcodigo") REFERENCES "empresa"("empcodigo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movimentacao" ADD CONSTRAINT "agendamento_movimentacao_fk" FOREIGN KEY ("agecodigo") REFERENCES "agendamento"("agecodigo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movimentacao" ADD CONSTRAINT "empresa_despesaempresa_fk" FOREIGN KEY ("empcodigo") REFERENCES "empresa"("empcodigo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movimentacao" ADD CONSTRAINT "funcionarioempresa_despesaempresa_fk" FOREIGN KEY ("usucodigofun", "empcodigo") REFERENCES "funcionarioempresa"("usucodigo", "empcodigo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movimentacao" ADD CONSTRAINT "produto_movimentacao_fk" FOREIGN KEY ("procodigo", "empcodigo") REFERENCES "produto"("procodigo", "empcodigo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produto" ADD CONSTRAINT "empresa_produto_fk" FOREIGN KEY ("empcodigo") REFERENCES "empresa"("empcodigo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "restricoesagenda" ADD CONSTRAINT "empresa_restricoesagenda_fk" FOREIGN KEY ("empcodigo") REFERENCES "empresa"("empcodigo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "restricoesagenda" ADD CONSTRAINT "funcionarioempresa_restricoesagenda_fk" FOREIGN KEY ("usucodigo", "empcodigo") REFERENCES "funcionarioempresa"("usucodigo", "empcodigo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "servico" ADD CONSTRAINT "empresa_servico_fk" FOREIGN KEY ("empcodigo") REFERENCES "empresa"("empcodigo") ON DELETE NO ACTION ON UPDATE NO ACTION;
