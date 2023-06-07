import Sidebar from '../Sidebar'
import Footer from '../Footer'
import Header from '../Header'
import { ReactNode } from 'react'
import MainContent from '../MainContent'

export default function LayoutApp({ children }: { children: ReactNode }) {
  return (
    <main className="relative h-screen overflow-hidden bg-gray-100 ">
      <div className="flex items-start justify-between">
        <Sidebar />
        <div className="w-full">
          <Header />
          <MainContent>{children}</MainContent>
          <Footer />
        </div>
      </div>
    </main>
  )
}
