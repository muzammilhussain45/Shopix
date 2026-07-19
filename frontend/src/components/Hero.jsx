import React from 'react'
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 rounded-3xl overflow-hidden shadow-card">

      {/* Hero left side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center px-8 py-14 sm:py-20">
        <div className="text-white max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 md:w-11 h-[2px] bg-accent-400"></span>
            <p className='font-medium text-sm md:text-base tracking-wide text-accent-300'>OUR BEST SELLERS</p>
          </div>

          <h1 className='prata-regular text-4xl sm:py-3 lg:text-6xl leading-relaxed text-white'>Latest Arrivals</h1>
          <p className="mt-4 text-brand-100 text-sm md:text-base">Fresh styles curated for the season. Discover pieces designed to make you stand out.</p>

          <Link
            to="/collection"
            className="btn-accent mt-8"
          >
            SHOP NOW
            <span className="w-8 md:w-11 h-[2px] bg-ink-900/30"></span>
          </Link>
        </div>
      </div>

      {/* Hero right side */}
      <div className="w-full sm:w-1/2 relative">
        <img src={assets.hero_img} alt="hero" className='w-full h-full object-cover' />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-800/40 to-transparent sm:hidden"></div>
      </div>

    </div>
  )
}

export default Hero;
