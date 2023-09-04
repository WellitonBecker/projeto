import { ReactNode } from 'react'

export default function MainContent({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white p-6">{children}</div>
  )
}
