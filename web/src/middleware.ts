import { NextRequest, NextResponse } from 'next/server'

const urlBase = String(process.env.NEXT_URL_BASE);

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(urlBase, {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly max-age=20;`,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/agendamentos/:path*',
}
