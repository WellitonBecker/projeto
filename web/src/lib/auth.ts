import { cookies } from 'next/headers'
import decode from 'jwt-decode'

interface User {
  sub: string
  name: string
  avatarUrl: string
}

interface Empresa {
  sub: string
  nomeEmpresa: string
}

export function getUser(): User {
  const token = cookies().get('token')?.value

  if (!token) {
    throw new Error('Unauthenticaded.')
  }

  const user: User = decode(token)

  return user
}

export function getEmpresa():Empresa {
  const token = cookies().get('empresa')?.value

  if (!token) {
    throw new Error('Unauthenticaded.')
  }

  const empresa: Empresa = decode(token)
  return empresa
}
