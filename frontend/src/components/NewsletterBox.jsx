import React from 'react'
import { Mail } from 'lucide-react'

const NewsletterBox = () => {

    const onSubmitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <div className='my-16 bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl px-6 py-12 text-center text-white shadow-card'>
            <div className="flex justify-center mb-4">
                <span className="w-12 h-12 flex items-center justify-center rounded-full bg-white/15">
                    <Mail className="w-6 h-6" />
                </span>
            </div>
            <p className='text-2xl font-medium'>Subscribe to our newsletter</p>
            <p className='text-brand-100 mt-2 text-sm'>Get the latest updates and exclusive offers delivered to your inbox.</p>

            <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-2 mx-auto mt-6 bg-white rounded-full p-1.5'>
                <input type="email" placeholder='Enter your email' className='w-full flex-1 outline-none text-ink-700 text-sm px-4 py-2' required />
                <button className='bg-brand-700 text-white text-sm px-6 py-2.5 rounded-full hover:bg-brand-800 transition-colors' type='submit'>Subscribe</button>
            </form>
        </div>
    )
}

export default NewsletterBox
