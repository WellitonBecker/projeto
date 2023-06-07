import { MutableRefObject } from 'react'

interface props {
  menuRef: MutableRefObject<null>
}

export default function UserMenu({ menuRef }: props) {
  return (
    <div
      ref={menuRef}
      className="absolute right-0 z-10 w-32 rounded-lg border border-gray-100  bg-white font-alt shadow-lg"
    >
      <a
        href="/meu-perfil"
        className="block rounded-t-lg px-4 py-2 text-gray-700 hover:bg-gray-50"
      >
        Meu Perfil
      </a>
      <hr className="text-gray-100" />
      <a
        href="/sair"
        className="block rounded-b-lg px-4 py-2 text-red-500 hover:bg-gray-50"
      >
        Sair
      </a>
    </div>
  )
}
