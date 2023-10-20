import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export default async function restricaoagendaRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    await request.jwtVerify();
  });

  app.post("/restricaoagenda", async (request) => {
    const bodySchema = z.object({
      data: z.string(),
      inicio: z.string(),
      termino: z.string(),
      empresa: z.string(),
    });
    const { data, inicio, termino, empresa } = bodySchema.parse(request.body);

    const restricao = await prisma.restricoesagenda.create({
      data: {
        readata: data,
        reahorarioinicio: inicio,
        reahorariotermino: termino,
        reatipo: 1,
        empcodigo: parseInt(empresa),
      },
    });
    return {
      empresa: restricao.empcodigo.toString(),
      codigo: restricao.reacodigo.toString(),
      data: restricao.readata,
      inicio: restricao.reahorarioinicio,
      termino: restricao.reahorariotermino,
    };
  });

  app.get("/restricaoagenda", async (request) => {
    const querySchema = z.object({
      empresa: z.string(),
      apenasAtivo: z.number().default(1),
    });

    const { empresa, apenasAtivo } = querySchema.parse(request.query);
    const restricoes = await prisma.restricoesagenda.findMany({
      where: {
        empcodigo: parseInt(empresa),
        reaativo: apenasAtivo,
      },
      orderBy: {
        readata: "asc",
      },
    });

    return restricoes.map((restricao) => {
      return {
        empresa: restricao.empcodigo.toString(),
        codigo: restricao.reacodigo.toString(),
        data: restricao.readata,
        inicio: restricao.reahorarioinicio,
        termino: restricao.reahorariotermino,
      };
    });
  });

  app.patch("/restricaoagenda", async (request) => {
    const bodySchema = z.object({
      data: z.string(),
      inicio: z.string(),
      termino: z.string().optional().default("30"),
      codigo: z.string(),
    });
    const { data, inicio, termino, codigo } = bodySchema.parse(request.body);

    const restricao = await prisma.restricoesagenda.update({
      data: {
        readata: data,
        reahorarioinicio: inicio,
        reahorariotermino: termino,
      },
      where: {
        reacodigo: parseInt(codigo),
      },
    });
    return {
      empresa: restricao.empcodigo.toString(),
      codigo: restricao.reacodigo.toString(),
      data: restricao.readata,
      inicio: restricao.reahorarioinicio,
      termino: restricao.reahorariotermino,
    };
  });

  app.delete("/restricaoagenda", async (request, reply) => {
    const querySchema = z.object({
      codigo: z.string(),
    });
    const { codigo } = querySchema.parse(request.query);

    await prisma.restricoesagenda.delete({
      where: {
        reacodigo: parseInt(codigo),
      },
    });
  });

  app.get("/restricaoagenda/busca", async (request) => {
    const querySchema = z.object({
      codigo: z.string(),
    });

    const { codigo } = querySchema.parse(request.query);
    const restricao = await prisma.restricoesagenda.findUnique({
      where: {
        reacodigo: parseInt(codigo),
      },
    });

    if (restricao != undefined) {
      return {
        empresa: restricao.empcodigo.toString(),
        codigo: restricao.reacodigo.toString(),
        data: restricao.readata,
        inicio: restricao.reahorarioinicio,
        termino: restricao.reahorariotermino,
      };
    }
  });
}
