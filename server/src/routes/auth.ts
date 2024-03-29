import { FastifyInstance } from 'fastify'
import axios from 'axios'
import { z } from 'zod'

export default function authRoutes(app: FastifyInstance) {
  app.post('/register', async (request) => {
    const bodySchema = z.object({
      code: z.string(),
    })

    const { code } = bodySchema.parse(request.body)

    const accessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    )

    const { access_token } = accessTokenResponse.data

    const userResponse = await axios.post('https://github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    const user = userResponse.data

    return {
      access_token,
    }
  })
}
