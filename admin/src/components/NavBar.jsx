import React from 'react'
import { LogOut } from 'lucide-react'


const NavBar = ({ setToken }) => {
  return (
    <div className='flex items-center justify-between py-4 px-[4%] border-b border-ink-100 bg-white'>
      <p className="text-xl font-semibold text-ink-900">Shop<span className="text-brand-600">ix</span> <span className="text-sm font-normal text-ink-400">Admin</span></p>
      <button onClick={() => setToken("")} className='flex items-center gap-2 bg-ink-100 text-ink-700 px-4 py-2 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-brand-50 hover:text-brand-600 transition-colors'>
        <LogOut className="w-4 h-4" /> Logout
      </button>
    </div>
  )
}

export default NavBar
