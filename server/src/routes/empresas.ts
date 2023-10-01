import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { request } from "http";

export enum Empresa {
  // eslint-disable-next-line no-unused-vars
  TIPO_ADMIN = 1,
  // eslint-disable-next-line no-unused-vars
  TIPO_NORMAL = 2,
}

export async function empresasRoute(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    await request.jwtVerify();
  });

  app.get("/empresas/admin", async (request) => {
    const empresas = await prisma.empresa.findMany({
      where: {
        funcionarioempresa: {
          some: {
            usucodigo: parseInt(request.user.sub),
            fuetipo: Empresa.TIPO_ADMIN,
            fueativo: 1,
          },
        },
      },
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

  app.get("/empresa/token", async (request) => {
    const querySchema = z.object({
      codigo: z.string(),
    });
    const { codigo } = querySchema.parse(request.query);

    const empresa = await prisma.empresa.findUnique({
      where: {
        empcodigo: parseInt(codigo),
      },
    });

    if (!empresa) {
      return "error";
    }

    const tokenEmpresa = app.jwt.sign(
      { nomeEmpresa: empresa.empnome },
      {
        sub: empresa.empcodigo.toString(),
        expiresIn: "30 days",
      }
    );
    return {
      tokenEmpresa,
    };
  });

  app.post("/empresa", async (request) => {
    const bodySchema = z.object({
      nome: z.string(),
      email: z.string(),
      telefone: z.string(),
      endereco: z.string(),
    });

    const { nome, email, telefone, endereco } = bodySchema.parse(request.body);

    const empresa = await prisma.empresa.create({
      data: {
        empnome: nome,
        empemail: email,
        emptelefone: telefone,
        empendereco: endereco,
        funcionarioempresa: {
          create: {
            usucodigo: parseInt(request.user.sub),
            fuetipo: 1,
          },
        },
      },
    });
    const token = app.jwt.sign(
      { nomeEmpresa: empresa.empnome },
      {
        sub: empresa.empcodigo.toString(),
        expiresIn: "30 days",
      }
    );
    return {
      codigo: empresa.empcodigo.toString(),
      nome: empresa.empnome,
      email: empresa.empemail,
      endereco: empresa.empendereco,
      telefone: empresa.emptelefone,
    };
  });
}
