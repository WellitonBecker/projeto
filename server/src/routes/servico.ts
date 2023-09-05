import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function servicosRoute(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    await request.jwtVerify();
  });

  app.get("/servicos", async (request) => {
    const querySchema = z.object({
      empresa: z.string(),
      apenasAtivo: z.number().default(1),
    });

    const { empresa, apenasAtivo } = querySchema.parse(request.query);
    let servicos;

    servicos = await prisma.servico.findMany({
      where: {
        empcodigo: parseInt(empresa),
        serativo: apenasAtivo,
      },
      orderBy: {
        serdescricao: "asc",
      },
    });

    return servicos.map((servico) => {
      return {
        sequencia: servico.sersequencia.toString(),
        descricao: servico.serdescricao,
        duracao: servico.serduracao,
        valor: servico.servalor,
        ativo: servico.serativo,
      };
    });
  });

  app.post("/servico", async (request) => {
    const bodySchema = z.object({
      descricao: z.string(),
      valor: z.string(),
      duracao: z.string().optional().default("30"),
      empresa: z.string(),
    });
    const { descricao, valor, duracao, empresa } = bodySchema.parse(
      request.body
    );

    const servico = await prisma.servico.create({
      data: {
        serdescricao: descricao,
        servalor: parseFloat(valor),
        serduracao: parseInt(duracao),
        empcodigo: parseInt(empresa),
      },
    });
    return {
      empresa: servico.empcodigo.toString(),
      sequencia: servico.sersequencia.toString(),
      descricao: servico.serdescricao,
      valor: servico.servalor,
      duracao: servico.serduracao,
    };
  });

  app.delete("/servico", async (request, reply) => {
    const querySchema = z.object({
      sequencia: z.string(),
      empresa: z.string(),
    });
    const { sequencia, empresa } = querySchema.parse(request.query);

    await prisma.servico.delete({
      where: {
        empcodigo_sersequencia: {
          empcodigo: parseInt(empresa),
          sersequencia: parseInt(sequencia),
        },
      },
    });
  });
}
