import { ReactNode } from 'react'

export default function MainContent({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-full flex-grow bg-white p-6">{children}</div>
  )
}
