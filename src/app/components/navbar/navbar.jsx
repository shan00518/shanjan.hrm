'use client'

import { Bell } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { IoIosSearch } from 'react-icons/io'

const Navbar = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include', 
      })

      if (res.ok) {
        router.push('/logout') 
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('An error occurred during logout:', error)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-30 w-full pl-4 md:pl-72 lg:pl-60 bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 lg:px-10">
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md transition-all">
          <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-sm"
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          
          <button
            onClick={handleLogout}
            className="text-blue-600 font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar
