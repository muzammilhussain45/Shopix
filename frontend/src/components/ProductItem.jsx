import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({ id, image, name, price, bestSeller }) => {
    const { currency } = useContext(ShopContext);
    return (
        <Link to={`/product/${id}`} className='group block text-ink-700 cursor-pointer'>
            <div className="relative overflow-hidden rounded-2xl bg-ink-50 border border-ink-200 shadow-soft transition-all duration-300 group-hover:border-brand-300 group-hover:shadow-card group-hover:-translate-y-0.5">
                <img src={image[0]} className="w-full aspect-square object-cover group-hover:scale-[1.04] group-hover:opacity-95 transition-all duration-500" alt={name} />
                {bestSeller && (
                    <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold rounded-full bg-accent-400 text-ink-900 shadow-soft">
                        ★ BESTSELLER
                    </span>
                )}
            </div>
            <p className="pt-3 pb-1 text-sm text-ink-800 group-hover:text-brand-600 transition-colors">{name}</p>
            <p className="text-sm font-semibold text-ink-900">{currency}{price}</p>
        </Link>
    )
}

export default ProductItem
