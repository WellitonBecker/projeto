import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function servicosRoute(app: FastifyInstance) {
  // app.addHook('preHandler', async (request) => {
  //   await request.jwtVerify()
  // })

  app.get('/servicos', async (request) => {
    const apenasAtivo = true
    const empresa = /* request.empresa.codigo */ 1
    let servicos

    if (apenasAtivo) {
      servicos = await prisma.servico.findMany({
        where: {
          empcodigo: empresa,
          serativo: 1,
        },
        orderBy: {
          serdescricao: 'asc',
        },
      })
    } else {
      servicos = await prisma.servico.findMany({
        where: {
          empcodigo: empresa,
        },
        orderBy: {
          serdescricao: 'asc',
        },
      })
    }

    return servicos.map((servico) => {
      return {
        sequencia: servico.sersequencia.toString(),
        descricao: servico.serdescricao,
        duracao: servico.serduracao,
        valor: servico.servalor,
        ativo: servico.serativo,
      }
    })
  })

  app.post('/servico', async (request) => {
    const bodySchema = z.object({
      descricao: z.string(),
      valor: z.number(),
      duracao: z.string().optional(),
    })
    const empresa = /* request.empresa.codigo */ 1

    const { descricao, valor, duracao } = bodySchema.parse(request.body)

    const servico = await prisma.servico.create({
      data: {
        serdescricao: descricao,
        servalor: valor,
        serduracao: duracao,
        empcodigo: empresa,
      },
    })
    return {
      empresa: servico.empcodigo.toString(),
      sequencia: servico.sersequencia.toString(),
      descricao: servico.serdescricao,
      valor: servico.servalor,
      duracao: servico.serduracao,
    }
  })
}
