import React from 'react'
import { NavLink } from 'react-router-dom'
import { PlusCircle, ListOrdered, ShoppingBag } from 'lucide-react'


const SideBar = () => {
  const links = [
    { to: '/add', icon: PlusCircle, label: 'Add Products' },
    { to: '/list', icon: ListOrdered, label: 'List Products' },
    { to: '/orders', icon: ShoppingBag, label: 'Orders' },
  ]

  return (
    <aside className='w-[18%] min-h-screen border-r border-ink-100 bg-white'>
      <div className='flex flex-col gap-2 pt-6 pl-[12%] pr-2 text-[15px]'>
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-brand-50 text-brand-700 font-medium'
                  : 'text-ink-600 hover:bg-brand-50 hover:text-brand-600'
              }`
            }
          >
            <Icon className='w-5 h-5' />
            <p className='hidden md:block'>{label}</p>
          </NavLink>
        ))}
      </div>
    </aside>
  )
}

export default SideBar
