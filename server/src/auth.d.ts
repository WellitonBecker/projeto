import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
      name: string
      avatarUrl: string
    }
    empresa: {
      codigo: number
      nome: string
      avatarUrl: string
    }
  }
}
