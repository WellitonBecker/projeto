'use client'
// import { getUser } from '@/lib/auth'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import UserMenu from './UserMenu'

interface props {
  name: string;
  avatarUrl: string;
}

export function Profile({ name, avatarUrl }: props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleClickOutside = (event: any) => {
    if (menuRef.current) {
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative">
      <div className="rounded-3xl border border-gray-400 bg-gray-100 p-1 pl-2 pr-2 hover:shadow-sm hover:shadow-gray-100">
        <button
          className="flex items-center justify-center text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={handleToggleMenu}
        >
          {/* <Image
            src={avatarUrl}
            width={40}
            height={40}
            alt=""
            className="h-8 w-8 rounded-full border-transparent"
          /> */}
          <div className="ml-2 flex items-end font-alt text-sm leading-snug text-gray-900">
            <p className="max-w-[140px]">{name}</p>
            <ChevronDown className="ml-[1px] h-4 w-4" />
          </div>
        </button>
      </div>

      {isMenuOpen && <UserMenu menuRef={menuRef} />}
      {/* <UserMenu menuRef={menuRef} /> */}
    </div>
  )
}
