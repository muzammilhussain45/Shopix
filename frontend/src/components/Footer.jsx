import React from 'react'
import { Link } from 'react-router-dom'
import { Globe, Mail, Send } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="mt-24 bg-ink-900 text-ink-300">
      <div className='mx-auto max-w-7xl px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-[2.5fr_1fr_1fr] gap-12 text-sm'>
        <div>
          <p className="text-2xl font-semibold text-white mb-4">Shop<span className="text-accent-400">ix</span></p>
          <p className="text-ink-400 max-w-sm leading-relaxed">
            Your destination for thoughtfully curated fashion. Quality products, fast delivery, and a shopping experience you'll love.
          </p>
          <div className="flex gap-3 mt-6">
            <a href="#" aria-label="Website" className="p-2 rounded-full bg-ink-800 hover:bg-brand-600 transition-colors"><Globe className="w-4 h-4" /></a>
            <a href="#" aria-label="Email" className="p-2 rounded-full bg-ink-800 hover:bg-brand-600 transition-colors"><Mail className="w-4 h-4" /></a>
            <a href="#" aria-label="Newsletter" className="p-2 rounded-full bg-ink-800 hover:bg-accent-400 hover:text-ink-900 transition-colors"><Send className="w-4 h-4" /></a>
          </div>
        </div>

        <div>
          <p className='text-base font-semibold text-white mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-ink-400'>
            <li className="hover:text-brand-400 cursor-pointer"><Link to="/">Home</Link></li>
            <li className="hover:text-brand-400 cursor-pointer"><Link to="/about">About us</Link></li>
            <li className="hover:text-brand-400 cursor-pointer">Delivery</li>
            <li className="hover:text-brand-400 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className='text-base font-semibold text-white mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-ink-400'>
            <li>+1-234-567-8900</li>
            <li>support@shopix.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-800">
        <p className='py-5 text-sm text-center text-ink-500'>© 2026 Shopix. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
