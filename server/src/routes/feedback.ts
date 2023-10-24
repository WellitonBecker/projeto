import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function feedbackRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    await request.jwtVerify();
  });

  app.post("/feedback", async (request, response) => {
    const bodySchema = z.object({
      agendamento: z.string(),
      descricao: z.string().optional().default(""),
      nota: z.number(),
    });

    const { agendamento, descricao, nota } = bodySchema.parse(request.body);

    const feedbackCreated = await prisma.feedback.findUnique({
      where: {
        agecodigo: parseInt(agendamento),
      },
    });
    if (feedbackCreated) {
      await prisma.feedback.update({
        data: {
          feedescricao: descricao,
          feenota: nota,
        },
        where: {
          agecodigo: parseInt(agendamento),
        },
      });
    } else {
      await prisma.feedback.create({
        data: {
          feedescricao: descricao,
          feenota: nota,
          agecodigo: parseInt(agendamento),
        },
      });
    }

    return response.status(200).send();
  });

  app.get("/feedback/:agendamento", async (request, response) => {
    const paramsSchema = z.object({
      agendamento: z.string(),
    });
    console.log(request.params);
    const { agendamento } = paramsSchema.parse(request.params);

    const feedback = await prisma.feedback.findUnique({
      where: {
        agecodigo: parseInt(agendamento),
      },
    });
    return response.status(200).send({
      agendamento: feedback?.agecodigo.toString(),
      descricao: feedback?.feedescricao,
      nota: feedback?.feenota,
    });
  });
}
