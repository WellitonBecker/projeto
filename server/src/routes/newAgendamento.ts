import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { request } from "http";
import { z } from "zod";

export async function newAgendamentoRoutes(app: FastifyInstance) {
  app.get("/novoagendamento/empresas", async (request) => {
    const empresas = await prisma.empresa.findMany({
      orderBy: {
        empnome: "asc",
      },
    });

    return empresas.map((empresa) => {
      return {
        codigo: empresa.empcodigo.toString(),
        nome: empresa.empnome,
        endereco: empresa.empendereco,
        telefone: empresa.emptelefone,
        email: empresa.empemail,
      };
    });
  });

  app.get("/novoagendamento/servicos/:id", async (request) => {
    const paramsSchema = z.object({
      id: z.string(),
    });
    const { id } = paramsSchema.parse(request.params);
    const servicos = await prisma.servico.findMany({
      where: {
        empcodigo: parseInt(id),
      },
      orderBy: {
        serdescricao: "asc",
      },
    });
    return servicos.map((servico) => {
      return {
        sequencia: servico.sersequencia.toString(),
        descricao: servico.serdescricao,
        valor: servico.servalor,
        ativo: Boolean(servico.serativo),
      };
    });
  });

  app.get("/novoagendamento/profissionais", async (request) => {
    const querySchema = z.object({
      empresa: z.string(),
      servico: z.string(),
    });
    const { empresa, servico } = querySchema.parse(request.query);
    const profissionais = await prisma.funcionarioservico.findMany({
      where: {
        sersequencia: parseInt(servico),
        empcodigo: parseInt(empresa),
      },
      include: {
        funcionarioempresa: {
          include: {
            usuario: {
              select: {
                usucodigo:true,
                usunome: true,
              },
            },
          },
        },
      },
      orderBy: {
        funcionarioempresa: {
          usuario: {
            usunome: "asc",
          },
        },
      },
    });
    return profissionais.map((profissional) => {
      return {
        codigo: profissional.funcionarioempresa.usuario.usucodigo.toString(),
        nome: profissional.funcionarioempresa.usuario.usunome,
        ativo: Boolean(profissional.fusativo),
      };
    });
  });
}
