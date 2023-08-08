import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  const redirectTo = request.cookies.get('redirectTo')?.value

  // const registerResponse = await api.post('/register', {
  //   code,
  // })

  const { token } = {token:'asc'}
  const cookieExpiredInSeconds = 60 * 60 * 24 * 30
  const redirectUrl = redirectTo ?? new URL('/', request.url)
  
  return NextResponse.redirect(origin, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiredInSeconds};`,
    },
  })
}
