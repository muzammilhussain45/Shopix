import React from 'react'
import { RefreshCw, ShieldCheck, Headphones } from 'lucide-react'

const policyItems = [
  {
    icon: RefreshCw,
    title: 'Easy Exchange Policy',
    desc: 'We offer a hassle-free exchange policy',
  },
  {
    icon: ShieldCheck,
    title: '7 Days Return',
    desc: 'We offer a 7-day return policy for your convenience',
  },
  {
    icon: Headphones,
    title: '24/7 Customer Support',
    desc: 'Our dedicated support team is available around the clock',
  },
]

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-8 sm:gap-4 text-center py-16 text-sm text-ink-700'>
      {policyItems.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="flex flex-col items-center px-4">
          <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-accent-100 text-accent-600">
            <Icon className="w-6 h-6" />
          </div>
          <p className='font-semibold text-ink-900'>{title}</p>
          <p className='text-ink-400 mt-1 max-w-[220px]'>{desc}</p>
        </div>
      ))}
    </div>
  )
}

export default OurPolicy
