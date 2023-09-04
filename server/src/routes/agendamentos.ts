import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

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
}
