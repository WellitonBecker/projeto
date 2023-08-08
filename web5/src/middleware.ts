import { NextRequest, NextResponse } from 'next/server'

const signInUrl = 'https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:3000/api/auth/callback&prompt=consent&response_type=token&client_id=1054944506097-m2qg8evnp40lnbgr8tnibcasf7k62tmd.apps.googleusercontent.com&scope=https://www.googleapis.com/auth/userinfo.profile&access_type=online'
// const signInUrl = 'https://accounts.google.com/o/oauth2/v2/auth?response_type=token&client_id=1054944506097-m2qg8evnp40lnbgr8tnibcasf7k62tmd.apps.googleusercontent.com&redirect_uri=http://localhost:3000&scope=https://www.googleapis.com/auth/userinfo.profile'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const isUrlLogin = request.nextUrl.href === 'http://localhost:3000/api/auth/callback'
  
  // console.log(isUrlLogin)
  if (!token) {
    return NextResponse.redirect(signInUrl, {
      headers: {
        // 'Set-Cookie': `redirectTo=http://localhost:3000; Path=/; HttpOnly max-age=20;`,
        'Set-Cookie': `Path=/; HttpOnly max-age=20;`,
      },
    })
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/agendamentos/:path*',
}
