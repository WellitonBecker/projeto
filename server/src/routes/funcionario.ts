import { number, z } from "zod";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";

export async function funcionarioRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    await request.jwtVerify();
  });

  app.get("/funcionarios", async (request) => {
    const querySchema = z.object({
      empresa: z.string(),
      apenasAtivo: z.boolean().default(true),
    });

    const { empresa, apenasAtivo } = querySchema.parse(request.query);
    const funcionarios = await prisma.funcionarioempresa.findMany({
      where: {
        empcodigo: parseInt(empresa),
        // fueativo: +apenasAtivo,
      },
      include: {
        usuario: {
          select: {
            usunome: true,
          },
        },
      },
      orderBy: {
        usuario: {
          usunome: "asc",
        },
      },
    });

    return funcionarios.map((funcionario) => {
      return {
        codigo: funcionario.usucodigo.toString(),
        nome: funcionario.usuario.usunome,
        salario: new Number(funcionario.fuesalario)
          .toFixed(2)
          .replace(".", ","),
        tipo: funcionario.fuetipo == 1 ? "Administrador" : "Funcionário",
        ativo: funcionario.fueativo ? "Sim" : "Não",
      };
    });
  });

  app.post("/funcionario", async (request) => {
    const bodySchema = z.object({
      funcionario: z.string(),
      salario: z.string().optional(),
      tipo: z.number(),
      empresa: z.string(),
      servicos: z.array(z.number()).optional().default([]),
    });
    const { funcionario, salario, tipo, empresa, servicos } = bodySchema.parse(
      request.body
    );

    const funcioario = await prisma.funcionarioempresa.create({
      data: {
        usucodigo: parseInt(funcionario),
        fuesalario: !!salario ? parseFloat(salario) : null,
        fuetipo: tipo,
        empcodigo: parseInt(empresa),
      },
    });

    servicos.length > 0 &&
      servicos.map(async (servico) => {
        await prisma.funcionarioservico.create({
          data: {
            sersequencia: servico,
            empcodigo: parseInt(empresa),
            usucodigo: parseInt(funcionario),
            fusativo: 1,
          },
        });
      });

    return {
      empresa: funcioario.empcodigo.toString(),
      funcioario: funcioario.usucodigo.toString(),
      tipo: funcioario.fuetipo == 1 ? "Administrador" : "Funcionário",
      salario: funcioario.fuesalario,
    };
  });

  app.delete("/funcionario", async (request, reply) => {
    const querySchema = z.object({
      funcionario: z.string(),
      empresa: z.string(),
    });
    const { funcionario, empresa } = querySchema.parse(request.query);

    await prisma.funcionarioempresa.delete({
      where: {
        usucodigo_empcodigo: {
          empcodigo: parseInt(empresa),
          usucodigo: parseInt(funcionario),
        },
      },
    });
  });

  app.patch("/funcionario", async (request) => {
    const bodySchema = z.object({
      funcionario: z.string(),
      salario: z.string().optional(),
      tipo: z.number().min(1).max(3).optional().default(2),
      empresa: z.string(),
      ativo: z.number().min(0).max(1).optional().default(1),
      servicos: z.array(z.number()).optional().default([]),
    });
    const { funcionario, salario, tipo, empresa, servicos, ativo } =
      bodySchema.parse(request.body);

    const response = await prisma.funcionarioempresa.update({
      data: {
        fueativo: ativo,
        fuetipo: tipo,
        fuesalario: salario,
      },
      where: {
        usucodigo_empcodigo: {
          empcodigo: parseInt(empresa),
          usucodigo: parseInt(funcionario),
        },
      },
    });

    return {
      empresa: response.empcodigo.toString(),
      funcioario: response.usucodigo.toString(),
      tipo: response.fuetipo == 1 ? "Administrador" : "Funcionário",
      salario: response.fuesalario,
    };
  });

  app.get("/funcionario/busca", async (request) => {
    const querySchema = z.object({
      empresa: z.string(),
      funcionario: z.string(),
    });

    const { empresa, funcionario } = querySchema.parse(request.query);
    const responseFuncionario = await prisma.funcionarioempresa.findUnique({
      where: {
        usucodigo_empcodigo: {
          empcodigo: parseInt(empresa),
          usucodigo: parseInt(funcionario),
        },
      },
      include: {
        usuario: {
          select: {
            usunome: true,
          },
        },
        funcionarioservico: {
          include: {
            servico: {
              select: {
                sersequencia: true,
              },
            },
          },
        },
      },
    });

    if (responseFuncionario != undefined) {
      return {
        codigo: responseFuncionario.usucodigo.toString(),
        nome: responseFuncionario.usuario.usunome,
        salario: new Number(responseFuncionario.fuesalario)
          .toFixed(2)
          .replace(".", ","),
        tipo:
          responseFuncionario.fuetipo == 1 ? "Administrador" : "Funcionário",
        ativo: responseFuncionario.fueativo ? "Sim" : "Não",
        servicos: responseFuncionario.funcionarioservico.map(
          (funcioarioServico) => {
            return funcioarioServico.servico.sersequencia;
          }
        ),
      };
    }
  });
}
