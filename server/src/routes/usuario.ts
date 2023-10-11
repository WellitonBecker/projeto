import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { request } from "http";
import { usuario } from "@prisma/client";
import { error } from "console";

export async function usuarioRoute(app: FastifyInstance) {
  app.get("/usuario/login", async (request) => {
    const querySchema = z.object({
      email: z.string(),
      password: z.string(),
    });

    const { email, password } = querySchema.parse(request.query);
    const usuario = await prisma.usuario.findFirst({
      where: {
        usuemail: email,
        ususenha: password,
      },
    });
    if (usuario == null) {
      return "nonexistent";
    } else {
      const token = app.jwt.sign(
        { name: usuario.usunome },
        {
          sub: usuario.usucodigo.toString(),
          expiresIn: "30 days",
        }
      );

      return {
        token,
      };
    }
  });

  app.get("/usuario/all", async (request) => {
    const usuarios = await prisma.usuario.findMany({
      orderBy: {
        usunome: "asc"
      },
    });

    return usuarios.map((usuario) => {
      return { nome: usuario.usunome, telefone: usuario.usutelefone };
    });
  });

  app.post("/usuario/register", async (request, response) => {
    const bodySchema = z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
      password: z.string(),
    });

    const { firstName, lastName, email, password } = bodySchema.parse(
      request.body
    );

    try {
      const usuario = await prisma.usuario.create({
        data: {
          usunome: `${firstName} ${lastName}`,
          usuemail: email,
          ususenha: password,
        },
      });
      if (usuario != null) {
        const token = app.jwt.sign(
          { name: usuario.usunome },
          {
            sub: usuario.usucodigo.toString(),
            expiresIn: "30 days",
          }
        );

        return {
          token,
        };
      }
    } catch (error) {
      console.log(error);
      return response.status(500).send(error);
    }
  });

  app.get("/usuario/search", async (request, response) => {
    const querySchema = z.object({
      nome: z.string(),
    });

    const { nome } = querySchema.parse(request.query);
    try {
      const usuarios = await prisma.usuario.findMany({
        where: {
          usunome: {
            search: nome,
          },
        },
        orderBy: {
          usunome: "asc",
        },
      });
      return usuarios.map((usuario) => {
        return {
          codigo: usuario.usucodigo.toString(),
          nome: usuario.usunome,
        };
      });
    } catch (error) {
      return response.status(500).send(error);
    }
  });
}
