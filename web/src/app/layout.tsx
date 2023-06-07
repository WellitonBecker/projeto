import './globals.css'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'

import { ReactNode } from 'react'
import LayoutApp from '@/components/layouts/LayoutApp'
import LayoutLogin from '@/components/layouts/LayoutLogin'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jumjeree',
})

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAutenticado = true

  return (
    <html lang="pt-br">
      <body className={`${roboto.variable} ${baiJamjuree.variable}`}>
        {isAutenticado ? <LayoutApp>{children}</LayoutApp> : <LayoutLogin />}
      </body>
    </html>
  )
}
