import { Prisma } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

interface Horarios {
  horario: string;
  codigofuncionario: string;
  funcionario: string;
}

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
                  },
                },
                usuario: {
                  select: {
                    usunome: true,
                  },
                },
              },
            },
            servico: {
              select: {
                serdescricao: true,
              },
            },
          },
        },
        feedback: {
          select: {
            agecodigo: true,
            feedescricao: true,
            feenota: true,
          },
        },
      },
      orderBy: {
        agedatahora: "desc",
      },
    });

    return agendamentos.map((agendamento) => {
      return {
        codigo: agendamento.agecodigo.toString(),
        nomeEmpresa:
          agendamento.funcionarioservico.funcionarioempresa.empresa.empnome,
        servico: agendamento.funcionarioservico.servico.serdescricao,
        funcionario:
          agendamento.funcionarioservico.funcionarioempresa.usuario.usunome,
        valor: agendamento.agevalor,
        situacao: agendamento.agesituacao,
        dataHora: agendamento.agedatahora.toLocaleString(),
        feedback: agendamento.feedback.map((feedbak) => {
          return {
            agendamento: feedbak.agecodigo.toString(),
            descricao: feedbak.feedescricao,
            nota: feedbak.feenota,
          };
        }),
      };
    });
  });

  app.post("/agendamento", async (request, response) => {
    try {
      const bodySchema = z.object({
        funcionario: z.string(),
        servico: z.string(),
        usuario: z.string(),
        empresa: z.string(),
        dataHora: z.coerce.date(),
        listaEspera: z.boolean().default(false),
      });

      const { funcionario, servico, usuario, empresa, dataHora, listaEspera } =
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
          agesituacao: !listaEspera ? 1 : 4,
        },
      });

      return {
        empresa: agendamento.empcodigo.toString(),
        usuario: agendamento.usucodigocli.toString(),
        funcionario: agendamento.usucodigofun.toString(),
        situacao: agendamento.agesituacao,
        valor: agendamento.agevalor,
        dataHora: agendamento.agedatahora,
      };
    } catch (error) {
      console.log(error);
      return response.status(500).send(error);
    }
  });

  app.get("/agendamentos/empresa", async (request) => {
    let agendamentos = [];

    const querySchema = z.object({
      empresa: z.string(),
    });

    const { empresa } = querySchema.parse(request.query);
    const funcionarioEmpresa = await prisma.funcionarioempresa.findUnique({
      where: {
        usucodigo_empcodigo: {
          empcodigo: parseInt(empresa),
          usucodigo: parseInt(request.user.sub),
        },
      },
    });

    if (funcionarioEmpresa?.fuetipo == 1) {
      agendamentos = await prisma.agendamento.findMany({
        where: {
          empcodigo: parseInt(empresa),
          agesituacao: {
            in: [1, 2],
          },
        },
        include: {
          funcionarioservico: {
            include: {
              funcionarioempresa: {
                include: {
                  usuario: {
                    select: {
                      usunome: true,
                      usucodigo: true,
                    },
                  },
                },
              },
              servico: {
                select: {
                  serdescricao: true,
                },
              },
            },
          },
          usuario: {
            select: {
              usunome: true,
            },
          },
        },
        orderBy: {
          // agedatahora: "asc",
        },
      });
    } else {
      agendamentos = await prisma.agendamento.findMany({
        where: {
          empcodigo: parseInt(empresa),
          usucodigofun: parseInt(request.user.sub),
        },
        include: {
          funcionarioservico: {
            include: {
              funcionarioempresa: {
                include: {
                  usuario: {
                    select: {
                      usunome: true,
                      usucodigo: true,
                    },
                  },
                },
              },
              servico: {
                select: {
                  serdescricao: true,
                },
              },
            },
          },
          usuario: {
            select: {
              usunome: true,
            },
          },
        },
        orderBy: {
          // agedatahora: "asc",
        },
      });
    }
    return agendamentos.map((agendamento) => {
      return {
        cliente: agendamento.usuario.usunome,
        servico: agendamento.funcionarioservico.servico.serdescricao,
        funcionario:
          agendamento.funcionarioservico.funcionarioempresa.usuario.usunome,
        codigoFuncionario:
          agendamento.funcionarioservico.funcionarioempresa.usuario.usucodigo.toString(),
        valor: agendamento.agevalor,
        situacao: agendamento.agesituacao,
        dataHora: agendamento.agedatahora,
        codigo: agendamento.agecodigo.toString(),
      };
    });
  });

  app.get(
    "/agendamentos/empresa/apenasdisponiveis",
    async (request, response) => {
      const querySchema = z.object({
        empresa: z.string(),
      });
      const { empresa } = querySchema.parse(request.query);
      try {
        const sql = `
        with horarios as (
          SELECT generate_series(
                '2023-10-01 08:00:00'::timestamp, -- Data e hora inicial
                '2023-11-30 18:00:00'::timestamp, -- Data e hora final
                '30 minutes'::interval             -- Intervalo de 30 minutos
            ) horario
          )
  
          select concat((horario::date)::text,'T', (horario::time + '03:00')::text,'.000Z')::text horario,
                 funcionarioempresa.usucodigo::text as codigofuncionario,
                 usuario.usunome as funcionario
            from horarios
            join funcionarioempresa
              on funcionarioempresa.empcodigo = ${parseInt(empresa)}
             and funcionarioempresa.fueativo = 1
            join usuario
              on usuario.usucodigo = funcionarioempresa.usucodigo
           where not exists(
                select 1
                  from agendamento
                 where concat(agendamento.agedatahora::date,' ', (agendamento.agedatahora::time - '03:00'))::timestamp = horarios.horario
                   and agendamento.agesituacao in (1,2)
                   and agendamento.empcodigo = funcionarioempresa.empcodigo
                   and agendamento.usucodigofun = funcionarioempresa.usucodigo
                )
           and not exists (
                select 1
                  from restricoesagenda
                 where restricoesagenda.empcodigo = funcionarioempresa.empcodigo
                   and restricoesagenda.readata::date = horarios.horario::date
                   and horarios.horario::time between concat(restricoesagenda.reahorarioinicio, '00')::time and concat(restricoesagenda.reahorariotermino, '00')::time
           )     
           and horarios.horario >= current_timestamp    
           and horarios.horario::time between '08:00' and '18:00'
           and horarios.horario::time not in ('12:00', '12:30')
      `;
        const result = await prisma.$queryRaw<Horarios[]>(Prisma.raw(sql));

        const horarios = new Array();
        result.forEach((horario) => {
          horarios.push({
            dataHora: horario.horario,
            situacao: "0",
            funcionario: horario.funcionario,
            codigoFuncionario: horario.codigofuncionario,
          });
        });
        return horarios;
      } catch (error) {
        return response.status(500).send(error);
      } finally {
        await prisma.$disconnect();
      }
    }
  );

  app.patch("/agendamento", async (request, response) => {
    let dadosRequest = request.query;
    const querySchema = z.object({
      codigo: z.string(),
      situacao: z.string(),
    });

    if (dadosRequest && Object.keys(dadosRequest).length === 0) {
      dadosRequest = request.body;
    }
    console.log(dadosRequest);

    const { codigo, situacao } = querySchema.parse(dadosRequest);

    const agendamento = await prisma.agendamento.update({
      where: {
        agecodigo: parseInt(codigo),
      },
      data: {
        agesituacao: parseInt(situacao),
      },
    });

    if (agendamento) {
      return {
        empresa: agendamento.empcodigo.toString(),
        usuario: agendamento.usucodigocli.toString(),
        funcionario: agendamento.usucodigofun.toString(),
        situacao: agendamento.agesituacao,
        valor: agendamento.agevalor,
        dataHora: agendamento.agedatahora,
      };
    } else {
      return response
        .status(HttpStatusCode.BadRequest)
        .send("Agendamento não encontrado");
    }
  });
}
