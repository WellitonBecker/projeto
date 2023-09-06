import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";

interface Horarios {
  hora: string;
}

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
                usucodigo: true,
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

  app.get("/novoagendamento/horarios", async (request, response) => {
    const querySchema = z.object({
      empresa: z.string(),
      funcionario: z.string(),
      data: z.string(),
    });

    try {
      const { empresa, funcionario, data } = querySchema.parse(request.query);
      const dataSplit = data.split('/')
      const dataFormatada = `${dataSplit[2]}-${dataSplit[1]}-${dataSplit[0]}`
      try {
        const sql = `
        with horarios as (
          SELECT generate_series(
              '2023-09-05 08:00:00'::timestamp, -- Data e hora inicial
              '2023-09-05 18:00:00'::timestamp, -- Data e hora final
              '30 minutes'::interval             -- Intervalo de 30 minutos
          )::TIME hora
          )
          
          select hora::text
            from horarios
           where not exists(
                select 1
                  from agendamento
                where (agendamento.agedatahora::time - '03:00')::time = horarios.hora
                  and agendamento.agesituacao = 1
                  and agendamento.empcodigo = ${parseInt(empresa)}
                  and agendamento.usucodigofun = ${parseInt(funcionario)}
                  and agendamento.agedatahora::date = '${dataFormatada}'
                  )
             and horarios.hora not in ('12:00', '12:30')
             and case when current_date = '${dataFormatada}'
                      then (current_time::time - '03:00')::time < horarios.hora
                      else true
                 end
        `;
        const result = await prisma.$queryRaw<Horarios[]>(Prisma.raw(sql));

        const horarios = new Array();
        result.forEach((horario) => {
          horarios.push(horario.hora.substring(0, 5));
        });

        return horarios;
      } catch (error) {
        return response.status(500).send(error);
      } finally {
        await prisma.$disconnect();
      }
    } catch (error) {
      return response.status(500).send(error);
    }
  });
}
