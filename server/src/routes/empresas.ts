import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export enum Empresa {
  // eslint-disable-next-line no-unused-vars
  TIPO_ADMIN = 1,
  // eslint-disable-next-line no-unused-vars
  TIPO_NORMAL = 2,
}

export async function empresasRoute(app: FastifyInstance) {
  // app.addHook('preHandler', async (request) => {
  //   await request.jwtVerify()
  // })

  app.get('/empresas/admin', async (request) => {
    const empresas = await prisma.empresa.findMany({
      where: {
        funcionarioempresa: {
          every: {
            // usucodigo: request.user.sub,
            usucodigo: 1,
            fueativo: Empresa.TIPO_ADMIN,
          },
        },
      },
      orderBy: {
        empnome: 'asc',
      },
    })

    return empresas.map((empresa) => {
      return {
        codigo: empresa.empcodigo.toString(),
        nome: empresa.empnome,
        endereco: empresa.empendereco,
        contato: empresa.emptelefone,
        email: empresa.empemail,
      }
    })
  })

  app.post('/empresa', async (request) => {
    const bodySchema = z.object({
      nome: z.string(),
      email: z.string(),
      telefone: z.string(),
      endereco: z.string(),
    })

    const { nome, email, telefone, endereco } = bodySchema.parse(request.body)

    const empresa = await prisma.empresa.create({
      data: {
        empnome: nome,
        empemail: email,
        emptelefone: telefone,
        empendereco: endereco,
        funcionarioempresa: {
          create: {
            // usucodigo: request.user.sub,
            usucodigo: 1,
            fuetipo: 1,
          },
        },
      },
    })
    return {
      codigo: empresa.empcodigo.toString(),
      nome: empresa.empnome,
      email: empresa.empemail,
      endereco: empresa.empendereco,
      telefone: empresa.emptelefone,
    }
  })
}
