import 'dotenv/config'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import fastify from 'fastify'

const app = fastify()

app.register(multipart)

app.register(cors, {
  // origin: ['http://localhost:3333', 'http://wlbproject.com']
  origin: true, // Todas as URL poderão acessar o back-end
  // origin: ['http://localhost:3333'],
})

app.register(jwt, {
  secret: 'projeto_tcc',
})

// app.register(memoriesRoutes)
// app.register(authRoutes)
// app.register(uploadRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 HTTP server running on http://localhost:3333')
  })
