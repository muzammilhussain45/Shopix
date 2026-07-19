import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
    const { getCartAmount, currency, delivery_fee } = useContext(ShopContext);
    const total = getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee;

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={"CART"} text2={"TOTAL"} />
            </div>

            <div className='flex flex-col gap-3 mt-2 text-sm'>
                <div className='flex justify-between text-ink-600'>
                    <p>Subtotal</p>
                    <p className="text-ink-900">{currency}{getCartAmount()}.00</p>
                </div>
                <hr className="border-ink-100" />
                <div className='flex justify-between text-ink-600'>
                    <p>Shipping Fee</p>
                    <p className="text-ink-900">{currency}{delivery_fee}.00</p>
                </div>
                <hr className="border-ink-100" />

                <div className='flex justify-between font-semibold text-lg'>
                    <b>Total</b>
                    <b className="text-brand-600">{currency}{total}.00</b>
                </div>
            </div>

        </div>
    )
}

export default CartTotal
