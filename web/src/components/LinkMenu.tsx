import Link from 'next/link'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  href: string
}

export default function LinkMenu({ children, href }: Props) {
  const pathname = 'Teste2'

  const selectd = pathname === href
  return (
    <Link legacyBehavior href={href}>
      <a
        className={
          selectd
            ? 'my-2 flex w-full items-center justify-start border-l-4 border-purple-500 p-2 pl-6 text-gray-100 transition-colors duration-200 '
            : 'my-2 flex w-full items-center justify-start border-l-4 border-transparent p-2 pl-6 text-gray-50 transition-colors duration-200 hover:text-gray-100'
        }
      >
        {children}
      </a>
    </Link>
  )
}
