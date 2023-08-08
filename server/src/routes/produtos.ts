import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function produtosRoute(app: FastifyInstance) {
  // app.addHook('preHandler', async (request) => {
  //   await request.jwtVerify()
  // })

  app.get('/produtos', async (request) => {
    const apenasAtivo = true
    const empresa = /* request.empresa.codigo */ 1
    let produtos

    if (apenasAtivo) {
      produtos = await prisma.produto.findMany({
        where: {
          empcodigo: empresa,
          proativo: 1,
        },
        orderBy: {
          prodescricao: 'asc',
        },
      })
    } else {
      produtos = await prisma.produto.findMany({
        where: {
          empcodigo: empresa,
        },
        orderBy: {
          prodescricao: 'asc',
        },
      })
    }

    return produtos.map((produto) => {
      return {
        sequencia: produto.procodigo.toString(),
        descricao: produto.prodescricao,
        quantidade_atual: produto.proquantidadeatual,
        ativo: produto.proativo,
      }
    })
  })

  app.post('/produto', async (request) => {
    const bodySchema = z.object({
      descricao: z.string(),
      quantidade: z.number(),
    })
    const empresa = /* request.empresa.codigo */ 1

    const { descricao, quantidade } = bodySchema.parse(request.body)

    const produto = await prisma.produto.create({
      data: {
        prodescricao: descricao,
        proquantidadeatual: quantidade,
        empcodigo: empresa,
      },
    })
    return {
      empresa: produto.empcodigo.toString(),
      sequencia: produto.procodigo.toString(),
      descricao: produto.prodescricao,
      ativo: produto.proativo,
      quantidade_atual: produto.proquantidadeatual,
    }
  })
}
