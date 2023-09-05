import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { request } from "http";
import { z } from "zod";

export async function agendamentosRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    await request.jwtVerify();
  });

  app.get("/agendamentos/usuario", async (request) => {
    const agendamentos = await prisma.agendamento.findMany({
      where: {
        usucodigocli: parseInt(request.user.sub),
      },
      include: {
        funcionarioservico: {
          include: {
            funcionarioempresa: {
              include: {
                empresa: {
                  select: {
                    empnome: true,
                    empendereco: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        // agedatahora: "asc",
      },
    });

    return agendamentos.map((agendamento) => {
      const empresa = agendamento.funcionarioservico.funcionarioempresa.empresa;
      return {
        nomeEmpresa: empresa.empnome,
        enderecoEmpresa: empresa.empendereco,
        valor: agendamento.agevalor,
        situacao: agendamento.agesituacao,
        dataHora: agendamento.agedatahora.toLocaleDateString(),
      };
    });
  });

  app.post("/agendamento", async (request) => {
    const bodySchema = z.object({
      funcionario: z.string(),
      servico: z.string(),
      usuario: z.string(),
      empresa: z.string(),
      dataHora: z.date(),
    });

    const { funcionario, servico, usuario, empresa, dataHora } =
      bodySchema.parse(request.body);

    const servicoOriginal = await prisma.servico.findUnique({
      where: {
        empcodigo_sersequencia: {
          empcodigo: parseInt(empresa),
          sersequencia: parseInt(servico),
        },
      },
    });

    const agendamento = await prisma.agendamento.create({
      data: {
        empcodigo: parseInt(empresa),
        sersequencia: parseInt(servico),
        usucodigocli: parseInt(usuario),
        usucodigofun: parseInt(funcionario),
        agevalor: servicoOriginal?.servalor || 0.0,
        agedatahora: dataHora,
      },
    });

    return {
      empresa: agendamento.empcodigo.toString(),
      usuario: agendamento.usucodigocli.toString(),
      funcionario: agendamento.usucodigofun.toString(),
      valor: agendamento.agevalor,
      dataHora: agendamento.agedatahora,
    };
  });
}
